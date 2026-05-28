import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
  constructor(sources = []) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = sources.length;
    this.loaded = 0;

    this.startLoading();
  }

  startLoading() {
    // If no sources, trigger ready after a tick
    if (this.toLoad === 0) {
      setTimeout(() => {
        this.trigger('ready');
      }, 0);
      return;
    }

    // For now, just trigger ready after a tick since GardenScene doesn't need external resources
    // In a real scenario, you would load textures, models, etc.
    setTimeout(() => {
      this.trigger('ready');
    }, 0);
  }
}
