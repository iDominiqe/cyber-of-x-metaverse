/**
 * ============================================================================
 * CYBER OF X — REAL-TIME 3D WEBGL & DISCORD WORMHOLE PORTAL ENGINE
 * ============================================================================
 * Change DISCORD_INVITE_URL below to your own Discord server invite link!
 */
const CONFIG = {
  DISCORD_INVITE_URL: 'https://discord.gg/f5wGW62Jsy',
  LERP_FACTOR: 0.065, // Lower = smoother inertia on 3D mouse parallax
  AUTO_LAUNCH_DELAY_MS: 4200 // Time before progress bar completes in portal
};

/* ============================================================================
 * 1. PROCEDURAL WEB AUDIO API CYBERPUNK SYNTHESIZER (Zero external audio files)
 * ============================================================================ */
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(980, now);
    osc.frequency.exponentialRampToValueAtTime(1480, now + 0.045);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.11);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.125);
  }

  playWarpPortal() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Sub-bass wormhole drop + rising cyber shimmer
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(130, now);
    bassOsc.frequency.exponentialRampToValueAtTime(42, now + 0.85);

    bassGain.gain.setValueAtTime(0.14, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    bassOsc.connect(bassGain);
    bassGain.connect(this.ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 0.92);

    // High harmonic arpeggio chime
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      const t = now + idx * 0.07;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.06, t + 0.28);

      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.32);

      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.34);
    });
  }
}

const sfx = new CyberAudioEngine();

/* ============================================================================
 * 2. MAIN THREE.JS 3D SCENE & HYPERSPACE WORMHOLE ENGINE
 * ============================================================================ */
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050509, 0.022);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.set(0, 0.4, 14);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const redLight = new THREE.PointLight(0xff1e56, 3.2, 45);
redLight.position.set(-6, 5, 8);
scene.add(redLight);

const magentaLight = new THREE.PointLight(0xe935c1, 2.8, 45);
magentaLight.position.set(6, -3, 8);
scene.add(magentaLight);

const discordLight = new THREE.PointLight(0x5865f2, 0, 60);
discordLight.position.set(0, 0, 6);
scene.add(discordLight);

// 3D Group for Central Cyber-Core & Gyroscopic Rings
const coreGroup = new THREE.Group();
coreGroup.position.set(0, 0.2, -2);
scene.add(coreGroup);

// Outer Gyro Ring
const outerRingGeo = new THREE.TorusGeometry(5.3, 0.035, 16, 120);
const outerRingMat = new THREE.MeshBasicMaterial({
  color: 0xff1e56,
  transparent: true,
  opacity: 0.45
});
const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
coreGroup.add(outerRing);

// Second Tilted Segmented Ring
const midRingGeo = new THREE.TorusGeometry(4.4, 0.025, 12, 90);
const midRingMat = new THREE.MeshBasicMaterial({
  color: 0xe935c1,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const midRing = new THREE.Mesh(midRingGeo, midRingMat);
midRing.rotation.x = Math.PI / 3;
coreGroup.add(midRing);

// 3D Procedural Cyber "X" Core (Visible strongly in Pure 3D / Wireframe mode & behind avatar)
const xCoreGroup = new THREE.Group();
const barGeo = new THREE.BoxGeometry(4.2, 0.55, 0.55);
const barMat = new THREE.MeshStandardMaterial({
  color: 0x151022,
  emissive: 0xff1e56,
  emissiveIntensity: 0.45,
  metalness: 0.85,
  roughness: 0.2
});
const bar1 = new THREE.Mesh(barGeo, barMat);
bar1.rotation.z = Math.PI / 4;
const bar2 = new THREE.Mesh(barGeo, barMat);
bar2.rotation.z = -Math.PI / 4;
xCoreGroup.add(bar1, bar2);

// Octahedron Energy Crystal in Center
const crystalGeo = new THREE.IcosahedronGeometry(1.35, 1);
const crystalMat = new THREE.MeshStandardMaterial({
  color: 0xff2a85,
  emissive: 0xff1e56,
  emissiveIntensity: 0.6,
  wireframe: true,
  transparent: true,
  opacity: 0.35
});
const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
xCoreGroup.add(crystalMesh);
xCoreGroup.position.z = -2.5;
coreGroup.add(xCoreGroup);

// Floating 3D Cyber Shards around the scene
const shardsGroup = new THREE.Group();
scene.add(shardsGroup);
const shardGeo = new THREE.OctahedronGeometry(0.28, 0);
const shardMat = new THREE.MeshStandardMaterial({
  color: 0xff1e56,
  emissive: 0xc9184a,
  emissiveIntensity: 0.7,
  metalness: 0.8,
  roughness: 0.15,
  wireframe: false
});

const shards = [];
for (let i = 0; i < 26; i++) {
  const mesh = new THREE.Mesh(shardGeo, shardMat.clone());
  const angle = (i / 26) * Math.PI * 2;
  const radius = 5.5 + Math.random() * 7.5;
  mesh.position.set(
    Math.cos(angle) * radius,
    (Math.random() - 0.5) * 9,
    (Math.random() - 0.5) * 10 - 2
  );
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  const scale = 0.4 + Math.random() * 1.1;
  mesh.scale.set(scale, scale * 1.6, scale);
  shardsGroup.add(mesh);
  shards.push({
    mesh,
    baseY: mesh.position.y,
    speed: 0.6 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2
  });
}

// Cyber Perspective Grid Floor
const gridHelper = new THREE.GridHelper(90, 60, 0xff1e56, 0x26132e);
gridHelper.position.y = -6.2;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.35;
scene.add(gridHelper);

// 3D Particle Field & Wormhole Streaking Stars
const PARTICLE_COUNT = 1500;
const pGeo = new THREE.BufferGeometry();
const pPositions = new Float32Array(PARTICLE_COUNT * 3);
const pColors = new Float32Array(PARTICLE_COUNT * 3);

const colorCrimson = new THREE.Color(0xff1e56);
const colorMagenta = new THREE.Color(0xe935c1);
const colorDiscord = new THREE.Color(0x5865f2);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;
  pPositions[i3] = (Math.random() - 0.5) * 65;
  pPositions[i3 + 1] = (Math.random() - 0.5) * 40;
  pPositions[i3 + 2] = (Math.random() - 0.5) * 90 - 20;

  const c = Math.random() > 0.35 ? colorCrimson : colorMagenta;
  pColors[i3] = c.r;
  pColors[i3 + 1] = c.g;
  pColors[i3 + 2] = c.b;
}

pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

const pMat = new THREE.PointsMaterial({
  size: 0.14,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(pGeo, pMat);
scene.add(particleSystem);

// 3D Wormhole Hexagonal Tunnel Gates (Activated during Discord Warp!)
const wormholeGroup = new THREE.Group();
scene.add(wormholeGroup);
const tunnelRings = [];
const hexGeo = new THREE.RingGeometry(3.6, 3.85, 6);
for (let i = 0; i < 18; i++) {
  const mat = new THREE.MeshBasicMaterial({
    color: i % 2 === 0 ? 0x5865f2 : 0xff1e56,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0
  });
  const ring = new THREE.Mesh(hexGeo, mat);
  ring.position.z = -i * 4.5;
  ring.rotation.z = i * 0.25;
  wormholeGroup.add(ring);
  tunnelRings.push(ring);
}

/* ============================================================================
 * 3. SMOOTH MOUSE PARALLAX & 3D LERP ANIMATION LOOP
 * ============================================================================ */
const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  rawX: window.innerWidth / 2,
  rawY: window.innerHeight / 2
};

let isWarping = false;
let warpIntensity = 0; // 0 = normal, 1 = full hyperspace wormhole
let renderMode = 0; // 0: HYBRID, 1: PURE 3D CORE, 2: WIREFRAME

const cursorEl = document.getElementById('cyber-cursor');
const cursorCoordsEl = document.getElementById('cursor-coords');
const characterCardEl = document.getElementById('character-3d-card');
const giantTitleEl = document.getElementById('giant-title-layer');
const holoCardEl = document.getElementById('discord-holo-card');
const portalModalEl = document.getElementById('discord-portal-modal');

window.addEventListener('mousemove', (e) => {
  mouse.rawX = e.clientX;
  mouse.rawY = e.clientY;
  mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

  // Update Custom Cyber Reticle
  if (cursorEl) {
    cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  }
  if (cursorCoordsEl) {
    cursorCoordsEl.textContent = `X:${String(Math.round(e.clientX)).padStart(3, '0')} Y:${String(Math.round(e.clientY)).padStart(3, '0')}`;
  }
});

// Touch parallax support for tablets & smartphones
window.addEventListener('touchmove', (e) => {
  const touch = e.touches?.[0];
  if (!touch) return;
  mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

function getBaseCameraZ() {
  return window.innerWidth < 860 ? 17.5 : 14;
}
camera.position.z = getBaseCameraZ();

// Linear interpolation helper for ultra-smooth 60fps damping
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Smoothly interpolate mouse coordinates
  mouse.x = lerp(mouse.x, mouse.targetX, CONFIG.LERP_FACTOR);
  mouse.y = lerp(mouse.y, mouse.targetY, CONFIG.LERP_FACTOR);

  // Smoothly interpolate warp intensity
  const targetWarp = isWarping ? 1 : 0;
  warpIntensity = lerp(warpIntensity, targetWarp, 0.05);

  // 1. Camera 3D Parallax & FOV Warp Effect
  camera.position.x = lerp(camera.position.x, mouse.x * 1.6, 0.05);
  camera.position.y = lerp(camera.position.y, 0.4 + mouse.y * 1.1, 0.05);
  camera.fov = lerp(camera.fov, isWarping ? 92 : 60, 0.05);
  camera.updateProjectionMatrix();
  camera.lookAt(mouse.x * 0.5, mouse.y * 0.4, -5);

  // 2. Central 3D Core & Rings Animation
  outerRing.rotation.z = elapsed * 0.22;
  outerRing.rotation.x = Math.sin(elapsed * 0.4) * 0.25 + mouse.y * 0.3;
  outerRing.rotation.y = mouse.x * 0.35;

  midRing.rotation.z = -elapsed * 0.35;
  midRing.rotation.y = elapsed * 0.25;

  xCoreGroup.rotation.y = elapsed * 0.5 + mouse.x * 0.6;
  xCoreGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.2 - mouse.y * 0.4;
  crystalMesh.rotation.y = -elapsed * 0.9;

  // 3. Floating Cyber Shards
  shards.forEach((s) => {
    s.mesh.rotation.x += 0.008 * s.speed;
    s.mesh.rotation.y += 0.012 * s.speed;
    s.mesh.position.y = s.baseY + Math.sin(elapsed * s.speed + s.phase) * 0.45;
  });

  // 4. Streaming 3D Particles (Accelerate during Discord Wormhole!)
  const posAttr = pGeo.attributes.position;
  const speedMultiplier = 0.06 + warpIntensity * 1.85;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    posAttr.array[i3 + 2] += speedMultiplier;
    if (posAttr.array[i3 + 2] > 16) {
      posAttr.array[i3 + 2] = -70;
    }
  }
  posAttr.needsUpdate = true;
  particleSystem.rotation.z = elapsed * 0.03 + warpIntensity * elapsed * 0.25;

  // 5. Wormhole Hexagonal Tunnel Rings
  tunnelRings.forEach((ring, i) => {
    ring.material.opacity = lerp(ring.material.opacity, warpIntensity * 0.68, 0.08);
    if (warpIntensity > 0.02) {
      ring.position.z += 0.45 * warpIntensity;
      ring.rotation.z += 0.025 * (i % 2 === 0 ? 1 : -1);
      if (ring.position.z > 12) {
        ring.position.z = -68;
      }
    }
  });

  // Discord Point Light intensity during warp
  discordLight.intensity = lerp(discordLight.intensity, warpIntensity * 4.5, 0.06);

  // 6. DOM 3D Layered Parallax (Character Card + Giant METAVERSE Title + Discord Holo Card)
  if (characterCardEl && !isWarping) {
    const rotY = mouse.x * 11;
    const rotX = -mouse.y * 8;
    const moveX = mouse.x * 18;
    const moveY = -mouse.y * 12;
    characterCardEl.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  if (giantTitleEl) {
    const titleX = -mouse.x * 26;
    const titleY = mouse.y * 14;
    giantTitleEl.style.transform = `translate3d(${titleX}px, ${titleY}px, -40px)`;
  }

  if (holoCardEl && portalModalEl.classList.contains('active')) {
    const cardRotY = mouse.x * 8;
    const cardRotX = -mouse.y * 6;
    holoCardEl.style.transform = `translateY(0px) rotateX(${cardRotX}deg) rotateY(${cardRotY}deg) scale(1)`;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.z = getBaseCameraZ();
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ============================================================================
 * 4. SPECIAL DISCORD WORMHOLE & HOLOGRAPHIC PORTAL EXPERIENCE
 * ============================================================================ */
const appShellEl = document.getElementById('app-shell');
const warpProgressFill = document.getElementById('warp-progress-fill');
const warpSpeedVal = document.getElementById('warp-speed-val');
const warpStatusText = document.getElementById('warp-status-text');
const confirmDiscordBtn = document.getElementById('confirm-discord-launch');
const stayBtn = document.getElementById('stay-in-metaverse-btn');
const holoCloseBtn = document.getElementById('holo-close-btn');
const portalBackdrop = document.getElementById('portal-backdrop');
const copyInviteBtn = document.getElementById('copy-invite-btn');
const rerollBtn = document.getElementById('reroll-callsign-btn');
const callsignEl = document.getElementById('operative-callsign');
const rankEl = document.getElementById('operative-rank');
const hashEl = document.getElementById('operative-hash');
const onlineCountEl = document.getElementById('discord-online-count');

// Sync configured Discord URL across all links
if (confirmDiscordBtn) {
  confirmDiscordBtn.href = CONFIG.DISCORD_INVITE_URL;
}

let warpTimer = null;
let warpProgressInterval = null;

const CALLSIGNS = [
  'VORTEX // X-77',
  'NYX // ZERO-9',
  'KITSUNE // V-88',
  'SPECTRE // RX-01',
  'VALKYRIE // NEO-4',
  'CIPHER // K-99',
  'RONIN // GLITCH-7'
];
const RANKS = [
  'PHANTOM TIER',
  'CYBER ARCHON',
  'NEURAL VANGUARD',
  'SYNDICATE ELITE',
  'VOID RUNNER'
];

function generateRandomIdentity() {
  sfx.playClick();
  const c = CALLSIGNS[Math.floor(Math.random() * CALLSIGNS.length)];
  const r = RANKS[Math.floor(Math.random() * RANKS.length)];
  const h = '#CX-' + Math.floor(1000 + Math.random() * 8999);
  if (callsignEl) callsignEl.textContent = c;
  if (rankEl) rankEl.textContent = r;
  if (hashEl) hashEl.textContent = h;
}

function openDiscordPortal(e) {
  if (e) e.preventDefault();
  sfx.playWarpPortal();

  isWarping = true;
  appShellEl.classList.add('warping-out');
  portalModalEl.classList.add('active');
  portalModalEl.setAttribute('aria-hidden', 'false');

  // Animate warp telemetry & progress bar
  let progress = 0;
  clearInterval(warpProgressInterval);
  if (warpProgressFill) warpProgressFill.style.width = '0%';
  if (warpStatusText) {
    warpStatusText.textContent = 'LOCKING ONTO DISCORD QUANTUM RELAY...';
  }

  warpProgressInterval = setInterval(() => {
    progress += 2.5;
    if (warpProgressFill) {
      warpProgressFill.style.width = `${Math.min(progress, 100)}%`;
    }
    if (warpSpeedVal) {
      warpSpeedVal.textContent = (12 + (progress / 100) * 87.9).toFixed(1);
    }
    if (progress === 50 && warpStatusText) {
      warpStatusText.textContent = 'NEURAL HANDSHAKE VERIFIED — PORTAL STABILIZED';
    }
    if (progress >= 100) {
      clearInterval(warpProgressInterval);
      if (warpStatusText) {
        warpStatusText.textContent = 'PORTAL READY — CLICK LAUNCH TO ENTER DISCORD';
      }
    }
  }, 50);
}

function closeDiscordPortal() {
  sfx.playClick();
  isWarping = false;
  clearInterval(warpProgressInterval);
  clearTimeout(warpTimer);
  appShellEl.classList.remove('warping-out');
  portalModalEl.classList.remove('active');
  portalModalEl.setAttribute('aria-hidden', 'true');
}

// Attach to all Discord triggers
document.querySelectorAll('.discord-trigger').forEach((el) => {
  el.addEventListener('click', openDiscordPortal);
  el.addEventListener('mouseenter', () => {
    sfx.playHover();
    cursorEl?.classList.add('cursor-discord');
  });
  el.addEventListener('mouseleave', () => {
    cursorEl?.classList.remove('cursor-discord');
  });
});

if (stayBtn) stayBtn.addEventListener('click', closeDiscordPortal);
if (holoCloseBtn) holoCloseBtn.addEventListener('click', closeDiscordPortal);
if (portalBackdrop) portalBackdrop.addEventListener('click', closeDiscordPortal);
if (rerollBtn) rerollBtn.addEventListener('click', generateRandomIdentity);

if (copyInviteBtn) {
  copyInviteBtn.addEventListener('click', () => {
    sfx.playClick();
    navigator.clipboard?.writeText(CONFIG.DISCORD_INVITE_URL);
    copyInviteBtn.textContent = '✓ LINK COPIED TO NEURAL CLIPBOARD!';
    setTimeout(() => {
      copyInviteBtn.textContent = 'COPY INVITE LINK';
    }, 2200);
  });
}

// Live fluctuating online operative count
setInterval(() => {
  if (onlineCountEl) {
    const base = 14890;
    const jitter = Math.floor(Math.random() * 25) - 10;
    onlineCountEl.textContent = (base + jitter).toLocaleString();
  }
}, 2800);

/* ============================================================================
 * 5. INTERACTIVE CONTROLS: 3D MODE SWITCHER, OVERDRIVE, EXPLORE & TRAILER
 * ============================================================================ */

// Hover SFX on interactive buttons/links
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (!el.classList.contains('discord-trigger')) {
      sfx.playHover();
      cursorEl?.classList.add('cursor-hover');
    }
  });
  el.addEventListener('mouseleave', () => {
    cursorEl?.classList.remove('cursor-hover');
  });
});

// 3D Render Mode Switcher (HYBRID / PURE 3D CORE / WIREFRAME)
const modeSwitchBtn = document.getElementById('mode-switch-btn');
const modeLabel = document.getElementById('mode-label');

if (modeSwitchBtn) {
  modeSwitchBtn.addEventListener('click', () => {
    sfx.playClick();
    renderMode = (renderMode + 1) % 3;
    if (renderMode === 0) {
      modeLabel.textContent = '3D: HYBRID';
      document.body.classList.remove('pure-3d-mode');
      barMat.wireframe = false;
      crystalMat.opacity = 0.35;
      xCoreGroup.scale.set(1, 1, 1);
    } else if (renderMode === 1) {
      modeLabel.textContent = '3D: MECHA CORE';
      document.body.classList.add('pure-3d-mode');
      barMat.wireframe = false;
      crystalMat.opacity = 0.85;
      xCoreGroup.scale.set(1.45, 1.45, 1.45);
    } else {
      modeLabel.textContent = '3D: WIREFRAME';
      document.body.classList.remove('pure-3d-mode');
      barMat.wireframe = true;
      crystalMat.opacity = 0.95;
      xCoreGroup.scale.set(1.2, 1.2, 1.2);
    }
  });
}

// SFX Mute/Unmute Toggle
const sfxToggleBtn = document.getElementById('sfx-toggle-btn');
const sfxWave = document.getElementById('sfx-wave');
if (sfxToggleBtn) {
  sfxToggleBtn.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    if (sfxWave) {
      sfxWave.style.opacity = sfx.enabled ? '1' : '0.2';
    }
    if (sfx.enabled) sfx.playClick();
  });
}

// Cyber Overdrive Toggle (Left top grid icon or Brand Logo or SPACE key)
const overdriveBtn = document.getElementById('overdrive-btn');
function toggleOverdrive() {
  sfx.playClick();
  const isOverdrive = document.body.classList.toggle('overdrive-mode');
  const primaryHex = isOverdrive ? 0x00f5d4 : 0xff1e56;
  const secondaryHex = isOverdrive ? 0x00bbf9 : 0xe935c1;

  redLight.color.setHex(primaryHex);
  magentaLight.color.setHex(secondaryHex);
  outerRingMat.color.setHex(primaryHex);
  midRingMat.color.setHex(secondaryHex);
  barMat.emissive.setHex(primaryHex);
}

if (overdriveBtn) overdriveBtn.addEventListener('click', toggleOverdrive);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDiscordPortal();
    document.getElementById('trailer-modal')?.classList.remove('active');
  } else if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    toggleOverdrive();
  }
});

// EXPLORE NOW, Top Nav & Quick Command Palette — 3D Sector Switching
const exploreBtn = document.getElementById('explore-btn');
const activePageNum = document.getElementById('active-page-num');
const cyberToast = document.getElementById('cyber-toast');
const SECTORS = [
  {
    num: '01',
    title: 'METAVERSE',
    leftH: 'CYBER OF X',
    leftP: 'Step into a hyper-immersive neural metaverse rendered in real-time 3D. Forge your cybernetic identity, command next-gen syndicates, and link directly with our global Discord command nexus.',
    rightH: 'THE FUTURE',
    rightP: 'Powered by reactive WebGL shaders, spatial audio synthesis, and zero-latency community raids. Experience seamless 3D dimensional shifts every time you jump into the network.'
  },
  {
    num: '02',
    title: 'SYNDICATE',
    leftH: 'NEURAL WARS',
    leftP: 'Unite with elite cyber-operatives across encrypted sectors. Build your squad reputation, unlock rare holographic badges, and dominate seasonal territory events.',
    rightH: 'ZERO LATENCY',
    rightP: 'Real-time synchronized arenas and live voice squad coordination powered by our global Discord & Telegram relay nodes.'
  },
  {
    num: '03',
    title: 'HYPERGRID',
    leftH: '3D ARENAS',
    leftP: 'Enter custom-built WebGL combat districts and neon racing circuits. Every arena reacts dynamically to audio frequencies and player telemetry.',
    rightH: 'CYBER LOOT',
    rightP: 'Collect limited-edition visor skins, cybernetic cores, and animated profile artifacts earned through active community raids.'
  },
  {
    num: '04',
    title: 'NEXUS HQ',
    leftH: 'MARKETPLACE',
    leftP: 'Trade verified cybernetic gear, neural passes, and custom 3D avatars with fellow citizens inside the zero-fee Syndicate Exchange.',
    rightH: 'LIVE DROPS',
    rightP: 'Follow our YouTube, Instagram, and Telegram channels for instant drop alerts, creator showcases, and secret access codes.'
  },
  {
    num: '05',
    title: 'OVERDRIVE',
    leftH: 'CORE ENGINE',
    leftP: 'Need assistance with your neural link or server access? Our support operatives are online 24/7 inside the official Discord citadel.',
    rightH: 'QUANTUM AI',
    rightP: 'Switch between 3D Hybrid, Mecha Core, and Wireframe modes anytime, or press SPACE to ignite Cyber Overdrive.'
  }
];
let currentSector = 0;

let toastTimeout = null;
function showCyberToast(msg) {
  if (!cyberToast) return;
  cyberToast.textContent = msg;
  cyberToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    cyberToast.classList.remove('show');
  }, 2400);
}

function switchToSector(index) {
  sfx.playWarpPortal();
  currentSector = ((index % SECTORS.length) + SECTORS.length) % SECTORS.length;
  const sec = SECTORS[currentSector];

  // Camera zoom impulse
  camera.position.z = 9.5;
  setTimeout(() => {
    camera.position.z = getBaseCameraZ();
  }, 450);

  if (activePageNum) activePageNum.textContent = sec.num;
  const titleEl = document.querySelector('.metaverse-title');
  if (titleEl) {
    titleEl.setAttribute('data-text', sec.title);
    titleEl.textContent = sec.title;
  }
  const leftTitle = document.querySelector('#info-left .column-title');
  const leftDesc = document.querySelector('#info-left .column-desc');
  const rightTitle = document.querySelector('#info-right .column-title');
  const rightDesc = document.querySelector('#info-right .column-desc');
  if (leftTitle) leftTitle.textContent = sec.leftH;
  if (leftDesc) leftDesc.textContent = sec.leftP;
  if (rightTitle) rightTitle.textContent = sec.rightH;
  if (rightDesc) rightDesc.textContent = sec.rightP;

  // Sync top navbar active underline
  document.querySelectorAll('.center-nav .nav-item[data-section]').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === sec.num);
  });
}

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    switchToSector(currentSector + 1);
  });
}

// Top Nav Sector Buttons (HOME, ABOUT, GAMES, MARKETPLACE, SUPPORT)
document.querySelectorAll('.center-nav .nav-item[data-section]').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(item.dataset.section, 10) - 1;
    if (!Number.isNaN(idx)) switchToSector(idx);
  });
});

// Scroll indicator click + wheel navigation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.style.cursor = 'pointer';
  scrollIndicator.addEventListener('click', () => switchToSector(currentSector + 1));
}

let wheelLock = false;
window.addEventListener('wheel', (e) => {
  if (window.innerWidth <= 1180) return; // Allow normal vertical scroll on tablets & phones
  if (wheelLock || portalModalEl.classList.contains('active')) return;
  if (Math.abs(e.deltaY) > 25) {
    wheelLock = true;
    switchToSector(currentSector + (e.deltaY > 0 ? 1 : -1));
    setTimeout(() => { wheelLock = false; }, 650);
  }
}, { passive: true });

// External Social Links (Facebook, Telegram, Instagram, YouTube) Feedback
document.querySelectorAll('.social-external').forEach((link) => {
  link.addEventListener('click', () => {
    sfx.playWarpPortal();
    const platform = link.dataset.platform || 'EXTERNAL';
    showCyberToast(`TRANSMITTING TO ${platform} // OPENING LINK`);
  });
});

// Quick Neural Command / Search Palette
const searchBtn = document.getElementById('search-btn');
const quickSearchModal = document.getElementById('quick-search-modal');
const quickSearchInput = document.getElementById('quick-search-input');
const quickSearchClose = document.getElementById('quick-search-close');

function openQuickSearch() {
  if (!quickSearchModal) return;
  sfx.playClick();
  quickSearchModal.classList.add('active');
  quickSearchModal.setAttribute('aria-hidden', 'false');
  if (quickSearchInput) {
    quickSearchInput.value = '';
    quickSearchInput.focus();
  }
  document.querySelectorAll('#quick-search-list .qs-item').forEach((el) => {
    el.style.display = 'flex';
  });
}

function closeQuickSearch() {
  if (!quickSearchModal) return;
  quickSearchModal.classList.remove('active');
  quickSearchModal.setAttribute('aria-hidden', 'true');
}

if (searchBtn) searchBtn.addEventListener('click', openQuickSearch);
if (quickSearchClose) quickSearchClose.addEventListener('click', closeQuickSearch);
if (quickSearchModal) {
  quickSearchModal.addEventListener('click', (e) => {
    if (e.target === quickSearchModal) closeQuickSearch();
  });
}
if (quickSearchInput) {
  quickSearchInput.addEventListener('input', () => {
    const q = quickSearchInput.value.trim().toLowerCase();
    document.querySelectorAll('#quick-search-list .qs-item').forEach((el) => {
      const text = el.textContent.toLowerCase();
      el.style.display = text.includes(q) ? 'flex' : 'none';
    });
  });
}

document.querySelectorAll('#quick-search-list .qs-item').forEach((item) => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    closeQuickSearch();
    if (action === 'sector') {
      switchToSector(parseInt(item.dataset.index, 10) || 0);
    } else if (action === 'discord') {
      openDiscordPortal();
    } else if (item.tagName === 'A') {
      sfx.playWarpPortal();
    }
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQuickSearch();
  }
});

// WATCH TRAILER Modal & Real-time 3D Cyber-City / Waveform Canvas
const watchTrailerBtn = document.getElementById('watch-trailer-btn');
const trailerModal = document.getElementById('trailer-modal');
const trailerCloseBtn = document.getElementById('trailer-close-btn');
const trailerCanvas = document.getElementById('trailer-canvas');

if (watchTrailerBtn && trailerModal) {
  watchTrailerBtn.addEventListener('click', () => {
    sfx.playWarpPortal();
    trailerModal.classList.add('active');
    startTrailerDemo();
  });
}
if (trailerCloseBtn && trailerModal) {
  trailerCloseBtn.addEventListener('click', () => {
    sfx.playClick();
    trailerModal.classList.remove('active');
  });
}

let trailerAnimId = null;
function startTrailerDemo() {
  if (!trailerCanvas) return;
  const ctx = trailerCanvas.getContext('2d');
  trailerCanvas.width = trailerCanvas.clientWidth || 800;
  trailerCanvas.height = trailerCanvas.clientHeight || 440;

  let t = 0;
  cancelAnimationFrame(trailerAnimId);

  function drawTrailer() {
    if (!trailerModal.classList.contains('active')) return;
    trailerAnimId = requestAnimationFrame(drawTrailer);
    t += 0.035;

    const w = trailerCanvas.width;
    const h = trailerCanvas.height;
    ctx.fillStyle = 'rgba(6, 4, 14, 0.28)';
    ctx.fillRect(0, 0, w, h);

    // Draw 3D Synthwave Cyber Horizon & Audio-Reactive Waveform
    const horizonY = h * 0.52 + mouse.y * 25;
    ctx.strokeStyle = '#ff1e56';
    ctx.lineWidth = 1.5;

    // Perspective vertical lines
    for (let i = -12; i <= 12; i++) {
      ctx.beginPath();
      ctx.moveTo(w / 2 + i * 18 + mouse.x * 30, horizonY);
      ctx.lineTo(w / 2 + i * 95, h);
      ctx.strokeStyle = `rgba(255, 30, 86, ${0.45 - Math.abs(i) * 0.025})`;
      ctx.stroke();
    }

    // Moving horizontal grid bars
    for (let j = 0; j < 10; j++) {
      const progress = ((j / 10) + (t * 0.15)) % 1;
      const y = horizonY + Math.pow(progress, 2.2) * (h - horizonY);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = `rgba(233, 53, 193, ${progress * 0.7})`;
      ctx.stroke();
    }

    // Neon Cyber Sun / Core
    const sunX = w / 2 + mouse.x * 25;
    const sunY = horizonY - 45;
    const grad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 95);
    grad.addColorStop(0, 'rgba(255, 30, 86, 0.95)');
    grad.addColorStop(0.5, 'rgba(88, 101, 242, 0.55)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 95, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTrailer();
}
