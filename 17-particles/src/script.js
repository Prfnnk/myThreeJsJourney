import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/8.png');

/**
 * Test cube
 */
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
// scene.add(cube);

// Particles geometry and material
const randomGeometry = new THREE.BufferGeometry();
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true, // If true, particles appear smaller when far away
  //   color: 'pink',
  alphaMap: particleTexture,
  transparent: true,
  //   alphaTest: 0.001, // Good but hard edges
  //   depthTest: false, // Good, but with multiple object in the scene it can create weird visual bugs
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

const count = 20000;
const positionsArray = new Float32Array(count * 3); // count of triangles * 3 vertices per triangle * 3 values (x, y, z) per vertex
const colors = new Float32Array(count * 3); // 3 as in RGB

for (let i = 0; i < count * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 10; // Random value between -0.5 and +0.5
  colors[i] = Math.random(); // Random color value between 0 and 1
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
randomGeometry.setAttribute('position', positionsAttribute);
randomGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Points
const particles = new THREE.Points(randomGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
