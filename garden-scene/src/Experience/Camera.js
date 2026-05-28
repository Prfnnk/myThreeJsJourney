import * as THREE from 'three';
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
    this.instance.position.set(0, 6.5, 6.5);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // Camera remains static, no update needed
  }
}
