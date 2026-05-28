import Experience from '../Experience.js';
import Garden from './Garden.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on('ready', () => {
      console.log('world');
      this.garden = new Garden();
    });
  }

  update() {
    if (this.garden) {
      this.garden.update();
    }
  }
}
