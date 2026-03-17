import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import * as CANNON from 'cannon-es';

/**
 * Debug
 */
const gui = new GUI();
const debugObj = {};

debugObj.createSphere = () => {
  const randomColor = Math.round(0xffffff * Math.random()).toString(16);
  createSphere(
    Math.random() * 0.5,
    {
      x: (Math.random() - 0.5) * 3,
      y: 4,
      z: (Math.random() - 0.5) * 3,
    },
    `#${randomColor}`,
  );
};

debugObj.createBox = () => {
  const randomColor = Math.round(0xffffff * Math.random()).toString(16);
  createBox(
    Math.random(),
    Math.random(),
    Math.random(),
    {
      x: (Math.random() - 0.5) * 3,
      y: 4,
      z: (Math.random() - 0.5) * 3,
    },
    `#${randomColor}`,
  );
};

debugObj.reset = () => {
  for (const object of objectsToUpdate) {
    object.body.removeEventListener('collide', playHitSound);
    world.removeBody(object.body);

    // Remove mesh
    scene.remove(object.mesh);
  }

  objectsToUpdate.splice(0, objectsToUpdate.length);
};

gui.add(debugObj, 'createSphere');
gui.add(debugObj, 'createBox');
gui.add(debugObj, 'reset');

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Sounds
const hitSound = new Audio('/sounds/hit.mp3');

const playHitSound = (collision) => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();

  if (impactStrength > 1.5) {
    // play sound only if velocity is high enough for it
    hitSound.volume = Math.random(); // more natural sound
    hitSound.currentTime = 0; // reset the sound
    hitSound.play();
  }
};

// We need to listen for collisions on the world, not on the bodies, because we want to play the sound when any body collides with any other body, not just when a specific body collides with another body
// world.addEventListener('collide', playHitSound);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.png',
  '/textures/environmentMaps/0/nx.png',
  '/textures/environmentMaps/0/py.png',
  '/textures/environmentMaps/0/ny.png',
  '/textures/environmentMaps/0/pz.png',
  '/textures/environmentMaps/0/nz.png',
]);

// Physics
// World
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world); // this is an optimization for the physics engine, it makes it faster by using a spatial partitioning algorithm to reduce the number of collision checks
world.allowSleep = true; // this is another optimization for the physics engine, it allows bodies to sleep when they are not moving, which reduces the number of calculations needed for those bodies
world.gravity.set(0, -9.82, 0); // -9.82 is the gravity of earth

// Materials
const defaultMaterial = new CANNON.Material('default'); // Names are just references

const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
  friction: 0.1, // slippery
  restitution: 0.7, // 0 is no bounce, 1 is full bounce, > 1 is more than full bounce
});

world.addContactMaterial(defaultContactMaterial);

// Sphere
// const sphereShape = new CANNON.Sphere(0.5);
// const sphereBody = new CANNON.Body({
//   mass: 1,
//   position: new CANNON.Vec3(0, 3, 0),
//   shape: sphereShape,
//   material: defaultMaterial,
// });
// sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0)); // apply a force to the right at the center of the sphere

// world.addBody(sphereBody);

// Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({});
floorBody.mass = 0; // mass of 0 means that the body is static, it won't move when something collides with it. Can be skipped as it's 0 by default
floorBody.material = defaultMaterial;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5); // rotate the floor to be horizontal

world.addBody(floorBody);

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture,
//     envMapIntensity: 0.5,
//   }),
// );
// sphere.castShadow = true;
// sphere.position.y = 0.5;
// scene.add(sphere);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  }),
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Utils
const objectsToUpdate = [];
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createSphere = (radius, position, color) => {
  // Three.js mesh
  const material = sphereMaterial.clone();
  material.color.set(color);
  const mesh = new THREE.Mesh(sphereGeometry, material);
  mesh.scale.set(radius, radius, radius); // we can't pass the radius parameter to the geometry, so we scale it instead
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Physics body
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape,
    material: defaultMaterial,
  });
  body.position.copy(position);
  body.addEventListener('collide', playHitSound);
  world.addBody(body);

  // Update objects
  objectsToUpdate.push({
    mesh,
    body,
  });
};
const createBox = (w, h, d, position, color) => {
  // Three.js mesh
  const material = boxMaterial.clone();
  material.color.set(color);
  const mesh = new THREE.Mesh(boxGeometry, material);
  mesh.scale.set(w, h, d); // we can't pass the size parameter to the geometry, so we scale it instead
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Physics body - creating a box shape in cannon.js is a bit more complicated than creating a sphere shape, we need to create a box shape with half extents, so we need to divide the size by 2
  const shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, h * 0.5, d * 0.5));
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape,
    material: defaultMaterial,
  });
  body.position.copy(position);
  body.addEventListener('collide', playHitSound);
  world.addBody(body);

  // Update objects
  objectsToUpdate.push({
    mesh,
    body,
  });
};

createSphere(0.5, { x: 0, y: 4, z: 0 });
// createBox(0.5, { x: 0, y: 3, z: 0 }, '#ff0000');

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update physics world - step 1
  // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position); // like a wind to push the sphere back

  world.step(1 / 60, deltaTime, 3);

  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion); // we also need to copy the rotation of the body to the mesh, otherwise the mesh will not rotate when the body rotates which looks weird
  }

  // // Update three.js sphere - step 2
  // sphere.position.copy(sphereBody.position);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
