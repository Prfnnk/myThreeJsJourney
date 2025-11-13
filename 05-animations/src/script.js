import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'pink' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

/*** Animate
 */
// let time = Date.now(); // Opt 1: We can use Date.now() to get the current time in milliseconds, but Three.js provides a Clock class for this purpose
// let clock = new THREE.Clock(); // Opt 2: Create a new Clock instance using Three.js

// Option 3: GSAP Animation
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
  // Option 1: Using Date.now()
  // const elapsedTime = clock.getElapsedTime();
  // const currentTime = Date.now(); // Opt 1: Get the current time in milliseconds
  // const deltaTime = currentTime - time; // Opt 1: The difference between the current time and the last frame time
  // Opt 1: Save current time for the next frame
  // time = currentTime;
  // mesh.rotation.y += 0.002 * deltaTime; // Opt 1: Rotate the mesh based on deltaTime for consistent speed across different frame rates

  // Option 2: Using Three.js Clock
  // const elapsedTime = clock.getElapsedTime(); // Opt 2: Get the elapsed time since the clock was started - in seconds

  // Update objects
  // mesh.rotation.y = elapsedTime * Math.PI * 2; // Full rotation every second
  // camera.position.x = Math.sin(elapsedTime); // Move the mesh left and right over time
  // camera.position.y = Math.cos(elapsedTime); // Move the mesh up and down over time
  // camera.lookAt(mesh.position); // Make the camera always look at the mesh

  // Render
  renderer.render(scene, camera);

  // // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
