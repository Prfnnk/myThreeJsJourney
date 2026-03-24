import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
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
 * Objects
 */
const object1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: 'red' }));
object1.position.x = -2;

const object2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: 'red' }));

const object3 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: 'red' }));
object3.position.x = 2;

scene.add(object1, object2, object3);

const dracoLoader = new DRACOLoader(); // helps to load draco compessed models -> much smaller and lighter
dracoLoader.setDecoderPath('draco/'); // we need to specify the path to the draco decoder - separate file

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader); // we need to specify the draco loader for the gltf loader, so it can use it to load draco compressed models

let model = null;
gltfLoader.load('models/Duck/glTF/Duck.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

// Raycaster
const raycaster = new THREE.Raycaster();

// we need to update the world matrix of the objects before we can use the raycaster, otherwise it will not work correctly
// object1.updateMatrixWorld();
// object2.updateMatrixWorld();
// object3.updateMatrixWorld();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(1, 0, 0); // length of the ray is 1 unit so it'll test only object this close to it
// rayDirection.normalize(); // we need to normalize the direction of the ray, otherwise it will not work correctly
// raycaster.set(rayOrigin, rayDirection);

// const intersect = raycaster.intersectObject(object2);
// console.log(intersect);

// const intersects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersects);

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

// Mouse
const mouse = new THREE.Vector2(); // just x and y for the cursor position

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1; // we need to convert the mouse position to a value between -1 and 1, because that's what the raycaster expects
  mouse.y = -(event.clientY / sizes.height) * 2 + 1; // we need to invert the y axis, because in the browser the y axis is inverted compared to the raycaster
});

// listen for clicks
window.addEventListener('click', () => {
  if (currentIntersect) {
    console.log('click on object', currentIntersect.object);
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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

let currentIntersect = null; // witness variable to keep track of the current intersected object

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate objs
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.7) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.2) * 1.5;

  // Cast a ray
  raycaster.setFromCamera(mouse, camera); // this is a helper function that sets the raycaster's origin and direction based on the mouse position and the camera

  //   const rayOrigin = new THREE.Vector3(-3, 0, 0);
  //   const rayDirection = new THREE.Vector3(1, 0, 0);
  //   rayDirection.normalize();
  //   raycaster.set(rayOrigin, rayDirection);

  const objectsToTest = [object1, object2, object3];

  const intersects = raycaster.intersectObjects(objectsToTest);

  // check for hovers
  for (const object of objectsToTest) {
    object.material.color.set('red');
  }

  for (const intersect of intersects) {
    intersect.object.material.color.set('pink');
  }

  // check for mouse enter and mouse leave - crazy overkill
  if (intersects.length) {
    if (currentIntersect === null) {
      console.log('mouse enter');
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log('mouse leave');
    }
    currentIntersect = null;
  }

  if (model) {
    const modelIntersect = raycaster.intersectObject(model);

    if (modelIntersect.length) {
      model.scale.set(1.2, 1.2, 1.2);
    } else {
      model.scale.set(1, 1, 1);
    }
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
