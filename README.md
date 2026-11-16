# ⚡ CYBER OF X — 3D Metaverse & Neural Discord Portal

Interactive 3D Cyberpunk landing page built with **Three.js (WebGL)**, procedural **Web Audio API** sound synthesis, and a **3D Hyperspace Wormhole Discord Portal**.

## ✨ Features
- **Real-Time Three.js 3D Scene**: Gyroscopic neon rings, floating cyber crystals, perspective horizon grid, and 1,500 streaming particles with smooth `lerp` mouse inertia.
- **3D Layered Depth Parallax**: Transparent cyborg centerpiece positioned in front of the giant `METAVERSE` typography with reactive visor & neon ear glow.
- **3D Discord Wormhole Portal**: Clicking any Discord trigger (`JOIN US`, sidebar icon, or community orb) accelerates the camera through a 3D hexagonal wormhole tunnel and materializes an interactive holographic server card with a live **Operative Callsign Generator**.
- **3D Render Mode Switcher**: Switch on the fly between `3D: HYBRID`, `3D: MECHA CORE`, and `3D: WIREFRAME`.
- **Cyber Overdrive Mode**: Press `SPACE` or click the top-left grid button to switch the neon shader palette.

## 🔧 Customizing Your Discord Link
Open `app.js` and edit the `CONFIG` object at the top of the file:
```js
const CONFIG = {
  DISCORD_INVITE_URL: 'https://discord.gg/YOUR_INVITE_CODE',
  LERP_FACTOR: 0.065,
  AUTO_LAUNCH_DELAY_MS: 4200
};
```
