export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug';
  }

  log(...args) {
    if (this.active) {
      console.log(...args);
    }
  }

  warn(...args) {
    if (this.active) {
      console.warn(...args);
    }
  }

  error(...args) {
    console.error(...args);
  }
}
