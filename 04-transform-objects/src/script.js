import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Mesh examples
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// Mesh Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);

// Mesh Scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// Mesh Rotation
// Note: Rotation uses Radians not Degrees -> 180 degrees = PI radians
// Note: Order of rotation matters as axes directions change after each rotation
mesh.rotation.reorder('YXZ'); // Reorder always before setting rotation values
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.5;
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);

// scene.add(mesh);

/** * Group
 */
const group = new THREE.Group();
group.position.y = -1;
group.scale.y = 2;
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1), new THREE.MeshBasicMaterial({ color: 'pink' }));
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshBasicMaterial({ color: 'yellow' }));
cube2.position.set(2, 1, 0);
cube3.position.set(-2, -1, 0);
group.add(cube1);
group.add(cube2);
group.add(cube3);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth || 800,
  height: window.innerHeight || 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

camera.lookAt(mesh.position); // Camera looks at the mesh position in Vector3

/**
 * Renderer
 * NOTE: Render goes after everything is set up -> like taking a picture
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
