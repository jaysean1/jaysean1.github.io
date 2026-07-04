#!/usr/bin/env bash
# Build Loadshift timeline composite PNGs (2160×1216) using Chrome headless.
# Composites: 1) NHVR route insight maps  2) Loadshift Canada demo
#             3) AI proxy calling          4) Carrier onboarding hub
set -euo pipefail

ROOT="/Users/jayseanqian/Desktop/on_board"
SITE="$ROOT/jaysean1.github.io"
TOOLS="$SITE/tools/timeline-composite"
OUT="$SITE/public/timeline/Loadshift"
ASSETS="$TOOLS/assets"
PORT=8001
BASE="http://127.0.0.1:${PORT}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
NHVR="$ROOT/prd/basic_user_experience/pickup_and_gps_tracking/nhvr_route_insight_images/mockups"
PSTN="$ROOT/prd/basic_user_experience/calling/pstn/PSTN_Calling_images/2026-04-24-14-51-13.png"
DEMO="$BASE/prd/loadshift_canada/product_demo/pages"

mkdir -p "$ASSETS" "$OUT"

if ! curl -sf "$BASE/mock_up/design-system/css/base.css" >/dev/null 2>&1; then
  echo "Starting HTTP server on :${PORT}..."
  (cd "$ROOT" && python3 -m http.server "$PORT" >/dev/null 2>&1 &)
  sleep 1.2
fi

capture_page() {
  local url="$1" out="$2" w="$3" h="$4" scale="${5:-1}"
  echo "  → $(basename "$out")"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="${w},${h}" --force-device-scale-factor="${scale}" \
    --virtual-time-budget=12000 \
    --run-all-compositor-stages-before-draw \
    --screenshot="$out" "$url" 2>/dev/null
}

echo "[1/4] Preparing source assets..."
# NHVR: crop the route-insight card (map) out of the tall mockups
python3 - "$NHVR" "$ASSETS" << 'PY'
import sys
from PIL import Image
nhvr, assets = sys.argv[1], sys.argv[2]
Image.open(f"{nhvr}/01-member-default.png").crop((35, 1078, 1245, 2012)).save(f"{assets}/nhvr-map-overview.png")
Image.open(f"{nhvr}/02-member-segment-detail.png").crop((35, 1068, 1245, 1928)).save(f"{assets}/nhvr-map-segments.png")
PY
# PSTN proxy calling: assets/ai-proxy-calling.png is captured separately via
# playwright-cli (open loaddetail-web-proxy.html -> click Contact Shipper ->
# click Call Shipper to open the proxy-call modal -> screenshot). It needs
# interaction, so the simple Chrome screenshot below is skipped to preserve it.
if [ ! -f "$ASSETS/ai-proxy-calling.png" ]; then
  cp "$PSTN" "$ASSETS/ai-proxy-calling.png"
fi
# Loadshift Canada demo (latest demo project)
capture_page "$DEMO/04-bid-transparent-quotes.html" "$ASSETS/canada-quotes.png" 1440 1274
# Digital pickup authorisation inside an iPhone frame (captured at 2x)
capture_page "$BASE/jaysean1.github.io/tools/timeline-composite/pages/pickup-phone-frame.html" "$ASSETS/canada-pickup.png" 976 864 2
# Carrier onboarding hub (recreated page, full height so all tasks show)
capture_page "$BASE/mock_up/carrier_onboarding/complete-your-account.html" "$ASSETS/carrier-onboarding.png" 1440 1015
# Quote submission requirements gate (recreated page).
# NOTE: this page embeds a live Google Maps iframe that needs real network time
# to load tiles; headless virtual-time renders a blank map. Capture it once via
# playwright-cli (open, wait ~10s, full-page screenshot) into assets/quote-gate.png
# and it is preserved here rather than overwritten.
if [ ! -f "$ASSETS/quote-gate.png" ]; then
  capture_page "$BASE/mock_up/carrier_onboarding/quote-requirements-gate.html" "$ASSETS/quote-gate.png" 1440 1180
fi

echo "[2/4] Rendering composite pages..."
CP="$BASE/jaysean1.github.io/tools/timeline-composite/pages"
capture_page "$CP/01-marketplace-route-insight.html" "$OUT/image.png" 2160 1216
capture_page "$CP/02-enterprise-dashboard.html" "$OUT/image copy.png" 2160 1216
capture_page "$CP/03-ai-proxy-calling.html" "$OUT/image copy 2.png" 2160 1216
capture_page "$CP/04-carrier-onboarding.html" "$OUT/image copy 3.png" 2160 1216

echo "[3/4] Verifying output..."
python3 << 'PY'
from PIL import Image
import numpy as np, glob, os
out = "/Users/jayseanqian/Desktop/on_board/jaysean1.github.io/public/timeline/Loadshift"
for f in sorted(glob.glob(out + "/*.png")):
    im = np.array(Image.open(f).convert('RGB'))
    print(os.path.basename(f), im.shape[1], 'x', im.shape[0], 'mean', round(im.mean(),1))
PY

echo "[4/4] Done."
