const video = document.getElementById('webcam');
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');

// Three.js variables
let scene, camera, renderer;
let sphere, wireframe;
let animationId;

// Hand tracking interaction variables
let targetSphereScale = 1.0;
let currentSphereScale = 1.0;
let lastColorChangeTime = 0;
let isLeftIndexTouchingSphere = false;
const smoothingFactor = 0.1; // Lower = smoother but slower response
const colorChangeDelay = 500; // ms between color changes to prevent rapid flashing

// Hand rotation variables
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let lastHandRotation = null;
const rotationSmoothingFactor = 0.05; // Smoother rotation response

// Set video and canvas to full window size
function resize() {
  video.width = window.innerWidth;
  video.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Start webcam
async function setupWebcam() {
  try {
    console.log('[调试] 正在请求摄像头权限...');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    console.log('[调试] 摄像头权限获取成功');
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        console.log('[调试] 视频元数据加载完成');
        resolve();
      };
    });
  } catch (err) {
    console.error('[错误] 获取摄像头失败:', err, JSON.stringify(err));
    alert(
      '无法访问摄像头：' + (err && err.message ? err.message : JSON.stringify(err)) +
      '\n请检查权限设置，或是否通过 http://localhost 访问页面。'
    );
    // 检查 mediaDevices 是否可用
    if (!navigator.mediaDevices) {
      alert('navigator.mediaDevices 不可用，说明浏览器不支持或未启用相关功能');
    }
    throw err;
  }
}

// Draw hand landmarks
function drawLandmarks(landmarks) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!landmarks || landmarks.length === 0) {
    // 没有检测到手
    // console.log('[调试] 未检测到手');
    return;
  }
  console.log(`[调试] 检测到 ${landmarks.length} 只手`);
  landmarks.forEach((hand, idx) => {
    if (hand.landmarks && hand.landmarks.length > 0) {
      console.log(`[调试] 第${idx+1}只手部分坐标:`, hand.landmarks.slice(0,3));
    }
    // Draw points
    for (const point of hand.landmarks) {
      ctx.beginPath();
      ctx.arc(point.x * canvas.width, point.y * canvas.height, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#00FF00';
      ctx.fill();
    }
    // Draw connections
    for (const connection of HAND_CONNECTIONS) {
      const [startIdx, endIdx] = connection;
      const start = hand.landmarks[startIdx];
      const end = hand.landmarks[endIdx];
      ctx.beginPath();
      ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
      ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });
}

// HAND_CONNECTIONS from MediaPipe Hands
const HAND_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],      // Thumb
  [0,5],[5,6],[6,7],[7,8],     // Index
  [5,9],[9,10],[10,11],[11,12],// Middle
  [9,13],[13,14],[14,15],[15,16],// Ring
  [13,17],[17,18],[18,19],[19,20],// Pinky
  [0,17]                       // Palm base
];

// Initialize Three.js scene
function initThreeJS() {
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera (perspective)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer with transparent background and enable physically correct lighting
  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true // 添加抗锯齿效果
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  renderer.physicallyCorrectLights = true; // 使用物理正确的光照
  renderer.domElement.classList.add('three-js');
  document.body.appendChild(renderer.domElement);
  
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // 添加方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Create sphere geometry with higher detail
  const geometry = new THREE.SphereGeometry(1.5, 40, 40);
  
  // Create advanced translucent material for the sphere
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x00ff7f, // Vibrant neon green
    transparent: true,
    opacity: 0.6,
    roughness: 0.2, // 较低的粗糙度，更光滑
    metalness: 0.1, // 轻微金属感
    clearcoat: 0.5, // 添加清漆层
    clearcoatRoughness: 0.1,
    transmission: 5, // 透光率
    ior: 1.5, // 折射率
    reflectivity: 0.5, // 反射率
    side: THREE.DoubleSide // 双面渲染
  });
  
  // Create wireframe material
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  
  // Create sphere mesh
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  
  // Create wireframe mesh
  wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  scene.add(wireframe);
  
  // Start animation loop
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Animation loop for Three.js
function animate() {
  animationId = requestAnimationFrame(animate);
  
  // Apply smooth rotation from hand gesture
  if (lastHandRotation) {
    // Apply smooth rotation transition
    currentRotationX += (targetRotationX - currentRotationX) * rotationSmoothingFactor;
    currentRotationY += (targetRotationY - currentRotationY) * rotationSmoothingFactor;
    
    // Set sphere rotation
    sphere.rotation.x = currentRotationX;
    sphere.rotation.y = currentRotationY;
  } else {
    // Default auto-rotation when no hand gesture
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.01;
  }
  
  // Apply smooth scaling to sphere
  currentSphereScale += (targetSphereScale - currentSphereScale) * smoothingFactor;
  sphere.scale.set(currentSphereScale, currentSphereScale, currentSphereScale);
  wireframe.scale.set(currentSphereScale, currentSphereScale, currentSphereScale);
  
  // Match wireframe rotation to sphere
  wireframe.rotation.copy(sphere.rotation);
  
  // Render scene
  renderer.render(scene, camera);
}

// Process hand interactions with the sphere
function processHandInteractions(hands) {
  if (!hands || !sphere) return;
  
  let rightHand = null;
  let leftHand = null;
  
  // Identify left and right hands
  hands.forEach(hand => {
    if (hand.handedness === 'Right') {
      rightHand = hand;
    } else if (hand.handedness === 'Left') {
      leftHand = hand;
    }
  });
  
  // Right hand: thumb-index pinch controls sphere size AND hand rotation controls sphere rotation
  if (rightHand) {
    const thumb = rightHand.landmarks[4]; // Thumb tip
    const index = rightHand.landmarks[8]; // Index finger tip
    const wrist = rightHand.landmarks[0]; // Wrist
    const middleMCP = rightHand.landmarks[9]; // Middle finger base
    
    // 1. Handle pinch for scaling
    const distance = calculateDistance3D(thumb, index);
    
    // Map distance to sphere scale (closer = smaller, further = larger)
    // Limit the range to prevent extreme scaling
    const minDist = 0.03; // Minimum meaningful distance
    const maxDist = 0.2;  // Maximum meaningful distance
    const minScale = 0.5;  // Minimum scale
    const maxScale = 2.0;  // Maximum scale
    
    if (distance < maxDist) {
      // Map distance to scale with clamping
      const normalizedDist = Math.max(minDist, Math.min(maxDist, distance));
      targetSphereScale = minScale + (normalizedDist - minDist) / (maxDist - minDist) * (maxScale - minScale);
    }
    
    // 2. Handle hand rotation to control sphere rotation
    // Create vectors for hand orientation
    const palmVector = {
      x: middleMCP.x - wrist.x,
      y: middleMCP.y - wrist.y,
      z: middleMCP.z - wrist.z
    };
    
    // Calculate hand rotation angles
    // Normalize to reasonable rotation ranges (0 to 2π)
    const rotX = Math.atan2(palmVector.y, palmVector.z) * 3; // Pitch (up/down)
    const rotY = Math.atan2(palmVector.x, palmVector.z) * 3; // Yaw (left/right)
    
    // Set target rotation for smooth transition
    targetRotationX = rotX;
    targetRotationY = rotY;
    lastHandRotation = Date.now();
    
    // Debug hand rotation
    // console.log(`Hand rotation: X=${rotX.toFixed(2)}, Y=${rotY.toFixed(2)}`);
  } else {
    // If no right hand detected for 2 seconds, revert to auto-rotation
    if (lastHandRotation && Date.now() - lastHandRotation > 2000) {
      lastHandRotation = null;
    }
  }
  
  // Left hand: index finger touching sphere changes color
  if (leftHand) {
    const indexTip = leftHand.landmarks[8]; // Index finger tip
    
    // Convert to 3D coordinates for sphere intersection test
    const indexPosition = new THREE.Vector3(
      (indexTip.x * 2 - 1) * 5, // Map from 0-1 to -5 to 5 (approximate scene scale)
      -(indexTip.y * 2 - 1) * 5, // Y is inverted in 3D space
      indexTip.z * 10 // Scale Z for better depth perception
    );
    
    // Simple distance check for intersection (sphere is at origin)
    const touchDistance = indexPosition.length();
    const isTouching = touchDistance < 1.5 * currentSphereScale; // Sphere radius is 1.5
    
    // Change color if touching and enough time has passed since last change
    const now = Date.now();
    if (isTouching && !isLeftIndexTouchingSphere && now - lastColorChangeTime > colorChangeDelay) {
      // Generate random neon color
      const neonColor = generateRandomNeonColor();
      sphere.material.color.set(neonColor);
      lastColorChangeTime = now;
    }
    
    // Update touch state
    isLeftIndexTouchingSphere = isTouching;
  }
}

// Calculate 3D distance between two points
function calculateDistance3D(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
}

// Generate a random vibrant neon color
function generateRandomNeonColor() {
  // Base neon colors with high saturation
  const neonColors = [
    0x00ff7f, // Neon green
    0xff00ff, // Neon pink
    0x00ffff, // Neon cyan
    0xff3399, // Neon rose
    0xffff00, // Neon yellow
    0xff9933, // Neon orange
    0x7f00ff, // Neon purple
    0x00ffaa, // Aqua neon
    0x66ffcc  // Mint neon
  ];
  
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Make webcam container draggable
function setupDraggable() {
  const container = document.getElementById('webcam-container');
  let isDragging = false;
  let offsetX, offsetY;
  
  // Handle drag start
  container.addEventListener('dragstart', (e) => {
    // Required for Firefox
    e.dataTransfer.setData('text/plain', '');
    
    // Calculate offset
    const rect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Add dragging class
    container.classList.add('dragging');
  });
  
  // Handle drag over
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Handle drop
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    
    // Calculate new position
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    // Apply new position
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.right = 'auto';
    
    // Remove dragging class
    container.classList.remove('dragging');
    
    return false;
  });
  
  // Handle drag end
  container.addEventListener('dragend', () => {
    container.classList.remove('dragging');
  });
}

// Main
setupWebcam().then(() => {
  video.play();
  // Mirror video
  video.style.transform = 'scaleX(-1)';
  
  // Initialize Three.js
  initThreeJS();
  
  // Setup draggable webcam container
  setupDraggable();

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
  });

  hands.onResults((results) => {
    // Mirror the landmarks horizontally
    if (results.multiHandLandmarks) {
      const mirrored = results.multiHandLandmarks.map((landmarks, idx) => ({
        landmarks: landmarks.map(pt => ({
          x: 1 - pt.x, // mirror horizontally
          y: pt.y,
          z: pt.z
        })),
        handedness: results.multiHandedness[idx].label
      }));
      
      // Process hand interactions
      processHandInteractions(mirrored);
      
      // Draw landmarks for visualization
      drawLandmarks(mirrored);
    } else {
      drawLandmarks(null);
    }
  });

  async function detect() {
    await hands.send({image: video});
    requestAnimationFrame(detect);
  }
  detect();
});
