import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

// const positionsArray = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]); // 3 vertices, each with x, y, z

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3); // itemSize = 3 because there are 3 values (x, y, z) per vertex
const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionsAttribute);

const count = 150;
const positionsArray = new Float32Array(count * 3 * 3); // count of triangles * 3 vertices per triangle * 3 values (x, y, z) per vertex

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5; // Random value between -0.5 and +0.5
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 'pink', wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const setRendererSize = () => {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  setRendererSize();
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
setRendererSize();

const tick = () => {
  controls.update(); // We need to update the controls after any controls change

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
