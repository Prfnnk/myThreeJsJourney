// This scene took me forever !!!

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Timer } from 'three/src/core/Timer.js';
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
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Floor texture
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp');
const floorColorTexture = textureLoader.load('./floor/forest_leaves_02/diffuse.webp');
const floorNormalTexture = textureLoader.load('./floor/forest_leaves_02/nor_gl.webp');
const floorARMTexture = textureLoader.load('./floor/forest_leaves_02/arm.webp');
const floorDisplacementTexture = textureLoader.load('./floor/forest_leaves_02/disp.webp');

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Repeat floor textures
[floorColorTexture, floorNormalTexture, floorARMTexture, floorDisplacementTexture].forEach((texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
});

// Walls texture
const wallsColorTexture = textureLoader.load('./walls/brown_planks_08/diff.jpg');
const wallsNormalTexture = textureLoader.load('./walls/brown_planks_08/nor_gl.jpg');
const wallsARMTexture = textureLoader.load('./walls/brown_planks_08/arm.jpg');

wallsColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof texture
const roofColorTexture = textureLoader.load('./roof/roof_3/diff.jpg');
const roofNormalTexture = textureLoader.load('./roof/roof_3/nor_gl.jpg');
const roofARMTexture = textureLoader.load('./roof/roof_3/arm.jpg');

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

[roofColorTexture, roofNormalTexture, roofARMTexture].forEach((texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
});

// Bushes texture
const bushColorTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-albedo.webp');
const bushNormalTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-normal-ogl.webp');
const bushAoTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-ao.webp');
const bushroughnessTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-roughness.webp');
const bushMetallicTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-metallic.webp');
const bushDisplacementTexture = textureLoader.load('./bushes/leafy-grass2/leafy-grass2-height.webp');

// Door texture
const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// ??
// [wallsColorTexture, wallsNormalTexture, wallsARMTexture].forEach((texture) => {
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(2, 2);
// });
/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.2,
    displacementBias: 0.01,
    normalMap: floorNormalTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor displacementScale');
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor displacementBias');

// House group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsColorTexture,
    aoMap: wallsARMTexture,
    roughnessMap: wallsARMTexture,
    metalnessMap: wallsARMTexture,
    normalMap: wallsNormalTexture,
  })
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 80, 80),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.05,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1;
door.position.z = 2 + 0.01; // Z-fighting offset
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushColorTexture,
  normalMap: bushNormalTexture,
  aoMap: bushAoTexture,
  roughnessMap: bushroughnessTexture,
  metalnessMap: bushMetallicTexture,
  displacementMap: bushDisplacementTexture,
  displacementScale: 0.2,
});

const bushBigLeft = new THREE.Mesh(bushGeometry, bushMaterial);
bushBigLeft.position.set(-0.8, 0.2, 2.2);
bushBigLeft.scale.setScalar(0.4);

const bushSmallLeft = new THREE.Mesh(bushGeometry, bushMaterial);
bushSmallLeft.position.set(-1.3, 0, 2.4);
bushSmallLeft.scale.setScalar(0.25);

const bushBigRight = new THREE.Mesh(bushGeometry, bushMaterial);
bushBigRight.position.set(0.8, 0.2, 2.2);
bushBigRight.scale.setScalar(0.5);

const bushSmallRight = new THREE.Mesh(bushGeometry, bushMaterial);
bushSmallRight.position.set(1.5, 0.2, 2.2);
bushSmallRight.scale.setScalar(0.35);

[bushBigLeft, bushSmallLeft, bushBigRight, bushSmallRight].forEach((bush) => {
  bush.rotation.x = -0.75;
});

house.add(bushBigLeft, bushSmallLeft, bushBigRight, bushSmallRight);

// Mushrooms
// const mushroom = new THREE.Group();
const stemGeometry = new THREE.CylinderGeometry(
  0.5, // Top radius
  0.7, // Bottom radius
  2, // Height
  16 // Segments (smoothness)
);
const stemMaterial = new THREE.MeshStandardMaterial({ color: '#E0D1C5' });

const capGeometry = new THREE.SphereGeometry(
  1.5, // Radius
  16, // Width segments
  16, // Height segments
  0, // Start angle
  Math.PI * 2, // Sweep angle (full circle)
  0, // Start vertical angle
  Math.PI / 2 // End vertical angle (half sphere)
);
const capColors = [
  '#8B4513', // Brown - porcini, shiitake
  '#D2691E', // Dark orange-brown - honey mushrooms
  '#DEB887', // Tan - meadow mushrooms
  '#8B0000', // Dark red - russula, some amanitas
  '#B8860B', // Dark goldenrod - golden oyster
  '#696969', // Dim gray - oyster mushrooms
];
const capMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });

const mushroomsGroup = new THREE.Group();
mushroomsGroup.rotation.y = Math.PI / 8; // Rotate the group to the angle where entrance is not located
scene.add(mushroomsGroup);

for (let i = 0; i < 20; i++) {
  const angle = Math.random() * Math.PI * 1.66; // Random angle around the house, excluding the front entrance
  const radius = 3 + Math.random() * 4; // Random radius between 3 and 7
  const x = Math.sin(angle) * radius; // Random radius between 3 and 7
  const z = Math.cos(angle) * radius; // Random radius between 3 and 7
  const randomScale = Math.random() * (0.15 - 0.01) + 0.05; // Random scale between 0.05 and 0.15
  const y = randomScale + 0.06; // Slightly vary the height

  const mushroom = new THREE.Group();

  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  //   stem.position.y = 1; // Move stem up
  mushroom.add(stem);

  const randomColor = capColors[Math.floor(Math.random() * capColors.length)];
  const uniqueCapMaterial = capMaterial.clone(); // Clone the base material
  uniqueCapMaterial.color = new THREE.Color(randomColor);

  const cap = new THREE.Mesh(capGeometry, uniqueCapMaterial);
  cap.position.y = 0.3; // Position on top of stem
  mushroom.add(cap);

  mushroom.position.set(x, y, z);
  mushroom.rotation.z = (Math.random() - 0.5) * 0.4; // Random rotation
  mushroom.rotation.x = (Math.random() - 0.5) * 0.4; // Random rotation
  mushroom.rotation.y = (Math.random() - 0.5) * 0.4; // Random rotation
  mushroom.scale.setScalar(randomScale);
  mushroomsGroup.add(mushroom);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.375);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

// Fireflies lights
const firefliesLight1 = new THREE.PointLight('#ffddaa', 2, 3);
const firefliesLight2 = new THREE.PointLight('#fbd342', 3, 3);
const firefliesLight3 = new THREE.PointLight('#ffcfaa', 4, 3);
firefliesLight1.position.set(1, 4, 4);
scene.add(firefliesLight1, firefliesLight2, firefliesLight3);

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
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 7;
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
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

[directionalLight, firefliesLight1, firefliesLight2, firefliesLight3, walls, roof].forEach((obj) => {
  obj.castShadow = true;
});
[walls, floor].forEach((obj) => {
  obj.receiveShadow = true;
});
mushroomsGroup.children.forEach((mushroom) => {
  mushroom.children.forEach((part) => {
    part.castShadow = true;
    part.receiveShadow = true;
  });
});

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

[firefliesLight1, firefliesLight2, firefliesLight3].forEach((light) => {
  light.shadow.mapSize.width = 256;
  light.shadow.mapSize.height = 256;
  light.shadow.camera.far = 10;
});

// Sky
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.08);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update fireflies position
  const firefly1Angle = elapsedTime * 0.5;
  firefliesLight1.position.x = Math.sin(firefly1Angle) * 4;
  firefliesLight1.position.z = Math.cos(firefly1Angle) * 4;
  firefliesLight1.position.y =
    0.7 + Math.sin(firefly1Angle) * Math.sin(firefly1Angle * 2.34) * Math.sin(firefly1Angle * 3.45);

  const firefly2Angle = -elapsedTime * 0.3;
  firefliesLight2.position.x = Math.sin(firefly2Angle) * 5;
  firefliesLight2.position.z = Math.cos(firefly2Angle) * 5;
  firefliesLight2.position.y =
    0.7 + Math.sin(firefly2Angle) * Math.sin(firefly2Angle * 2.34) * Math.sin(firefly2Angle * 3.45);

  const firefly3Angle = elapsedTime * 0.24;
  firefliesLight3.position.x = Math.sin(firefly3Angle) * 6;
  firefliesLight3.position.z = Math.cos(firefly3Angle) * 6;
  firefliesLight3.position.y =
    0.7 + Math.sin(firefly3Angle) * Math.sin(firefly3Angle * 2.34) * Math.sin(firefly3Angle * 3.45);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
