/* script.js — Theme manager, scroll narrative engine, and interactive features */
/* NOT for content loading (content-loader.js) or design tokens (styles/) */

/* ---------- Theme manager ---------- */
function syncThemeColorMeta() {
  var meta = document.getElementById('meta-theme-color');
  if (!meta) return;
  var dark = document.documentElement.getAttribute('data-theme') === 'dark';
  meta.setAttribute('content', dark ? '#111112' : '#F8F4ED');
}

function initTheme() {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  syncThemeColorMeta();

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeColorMeta();
  });

  // Follow system changes only when the user has not chosen a theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      syncThemeColorMeta();
    }
  });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
}

/* ---------- Hero title word stagger ---------- */
function initHeroTitle() {
  var title = document.querySelector('.hero__title');
  if (!title) return;
  var words = title.textContent.trim().split(/\s+/);
  title.innerHTML = words.map(function (w, i) {
    return '<span class="word" style="--word-i:' + i + '">' + w + '</span>';
  }).join(' ');
  title.classList.add('is-split');
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress-bar');
  var nav = document.getElementById('site-nav');
  if (!bar) return;
  var ticking = false;

  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = 'scaleX(' + p + ')';
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ---------- Hero mouse glow ---------- */
function initHeroHighlight() {
  var hero = document.getElementById('home');
  if (!hero) return;
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    hero.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
}

/* ---------- Reveal system ---------- */
function initScrollAnimations() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal], .timeline-entry').forEach(function (el) {
    observer.observe(el);
  });
}

/* ---------- Nav scroll spy ---------- */
function initScrollSpy() {
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav .nav-link'));
  if (!links.length) return;
  var map = {};
  links.forEach(function (link) {
    var id = (link.getAttribute('href') || '').replace('#', '');
    if (id) map[id] = link;
  });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && map[entry.target.id]) {
        links.forEach(function (l) { l.classList.remove('is-active'); });
        map[entry.target.id].classList.add('is-active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  Object.keys(map).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

/* ---------- Counter animation ---------- */
function initCounterAnimations() {
  document.querySelectorAll('[data-count]').forEach(function (element) {
    var target = parseInt(element.getAttribute('data-count'), 10);
    var duration = 1800;

    function run() {
      var start = performance.now();
      function tick(now) {
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        element.textContent = Math.floor(eased * target).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(element);
  });
}

/* ---------- Capability tabs ---------- */
function initCapabilityTabs() {
  var tabs = document.querySelectorAll('.capability-tab');
  var contents = document.querySelectorAll('.capability-content');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      contents.forEach(function (c) { c.classList.remove('active'); });
      tab.classList.add('active');

      if (window.innerWidth <= 900) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      var target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
}

/* ---------- Toast notifications ---------- */
function initToastNotifications() {
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('toast-close')) {
      var toast = event.target.closest('.toast');
      if (toast) removeToast(toast);
    }
  });
}

function showToast(title, description, actionText, actionCallback) {
  var container = document.getElementById('toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML =
    '<div class="toast-content">' +
      '<div class="toast-title">' + title + '</div>' +
      '<div class="toast-description">' + description + '</div>' +
    '</div>' +
    '<button class="toast-action">' + actionText + '</button>' +
    '<button class="toast-close" aria-label="Dismiss">&times;</button>';

  var actionButton = toast.querySelector('.toast-action');
  if (actionButton && actionCallback) actionButton.addEventListener('click', actionCallback);

  container.appendChild(toast);
  setTimeout(function () { toast.classList.add('show'); }, 60);
  setTimeout(function () { removeToast(toast); }, 8000);
}

function removeToast(toast) {
  toast.classList.remove('show');
  toast.addEventListener('transitionend', function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, { once: true });
}

function showPortfolioToast() {
  showToast(
    'Explore My Work!',
    'Check out my detailed portfolio on Notion for more project insights.',
    'View Portfolio',
    function () {
      window.open('https://www.notion.so/qiansui/Sui-Qian-Portfolio-c6be6c3fe60c420faf915f35f73bb408', '_blank');
    }
  );
}

/* ---------- Testimonials marquee ---------- */
function initTestimonialsCarousel() {
  var rows = document.querySelectorAll('.testimonials-row');

  rows.forEach(function (row, index) {
    row.style.animation = 'none';
    void row.offsetHeight;

    var originals = Array.prototype.slice.call(row.querySelectorAll('.testimonial-image:not(.clone-image)'));
    row.querySelectorAll('.clone-image').forEach(function (clone) { clone.remove(); });
    originals.forEach(function (image) {
      var clone = image.cloneNode(true);
      clone.classList.add('clone-image');
      clone.setAttribute('aria-hidden', 'true');
      row.appendChild(clone);
    });

    var name = index === 0 ? 'scroll-left' : 'scroll-right';
    var totalWidth = row.scrollWidth / 2;
    var speed = Math.max(totalWidth / 55, 24);
    row.style.animation = name + ' ' + speed + 's linear infinite';

    row.addEventListener('mouseenter', function () { row.style.animationPlayState = 'paused'; });
    row.addEventListener('mouseleave', function () { row.style.animationPlayState = 'running'; });
  });
}

/* ---------- Image modal ---------- */
function initImageModal() {
  var modal = document.getElementById('image-modal');
  var modalImg = document.getElementById('modal-img');
  var modalPrev = document.getElementById('modal-prev');
  var modalNext = document.getElementById('modal-next');
  var closeBtn = document.getElementById('modal-close');
  if (!modal || !modalImg || !modalPrev || !modalNext || !closeBtn) return;

  var currentImgs = [];
  var currentIdx = 0;

  document.querySelectorAll('.exp-card__gallery').forEach(function (gallery) {
    var imgs = Array.prototype.slice.call(gallery.querySelectorAll('img'));
    imgs.forEach(function (img, idx) {
      img.addEventListener('click', function () {
        currentImgs = imgs;
        currentIdx = idx;
        modalImg.src = imgs[currentIdx].src;
        modal.classList.remove('hidden');
        updateArrows();
      });
    });
  });

  function updateArrows() {
    var single = currentImgs.length <= 1;
    modalPrev.classList.toggle('hidden', single || currentIdx === 0);
    modalNext.classList.toggle('hidden', single || currentIdx === currentImgs.length - 1);
  }

  function show(idx) {
    currentIdx = idx;
    modalImg.src = currentImgs[currentIdx].src;
    updateArrows();
  }

  modalPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    if (currentIdx > 0) show(currentIdx - 1);
  });
  modalNext.addEventListener('click', function (e) {
    e.stopPropagation();
    if (currentIdx < currentImgs.length - 1) show(currentIdx + 1);
  });
  closeBtn.addEventListener('click', function () { modal.classList.add('hidden'); });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.add('hidden');
  });
  document.addEventListener('keydown', function (e) {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') modal.classList.add('hidden');
    if (e.key === 'ArrowLeft' && currentIdx > 0) show(currentIdx - 1);
    if (e.key === 'ArrowRight' && currentIdx < currentImgs.length - 1) show(currentIdx + 1);
  });
}

/* ---------- Init ---------- */
/* Shell features run immediately; content features run after JSON render */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMobileMenu();
  initHeroTitle();
  initScrollProgress();
  initHeroHighlight();
  initToastNotifications();
});

function initAllFeatures() {
  initScrollAnimations();
  initScrollSpy();
  initCapabilityTabs();
  initTestimonialsCarousel();
  initImageModal();
  initCounterAnimations();

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  setTimeout(showPortfolioToast, 2500);
}

window.addEventListener('resize', function () {
  clearTimeout(window.__marqueeResizeTimer);
  window.__marqueeResizeTimer = setTimeout(initTestimonialsCarousel, 300);
});
