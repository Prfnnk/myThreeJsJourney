import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

// Debug UI
const gui = new GUI({
  width: 300,
  title: 'Cool Debug UI',
});
const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Object
debugObject.color = '#ec0909';
console.log(debugObject.color);
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
);
scene.add(mesh);

const cubeTweaks = gui.addFolder('Cube tweaks');

cubeTweaks.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Position X');
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Position Y');
cubeTweaks.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Position Z');
cubeTweaks.add(mesh, 'visible').name('Visible');
cubeTweaks.add(mesh.material, 'wireframe').name('Wireframe');
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
  mesh.material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
cubeTweaks.add(debugObject, 'spin').name('Spin Mesh');

debugObject.subdivision = 2;
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .name('Subdivision')
  .onFinishChange(() => {
    // onFinishChange so it doesn't update continuously for better performance
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate

const tick = () => {
  controls.update(); // We need to update the controls after any controls change

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
