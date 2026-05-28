export default class EventEmitter {
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  on(_names, callback) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) this.callbacks[name.namespace] = {};

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names, callback) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove callback
      if (
        this.callbacks[name.namespace] instanceof Object &&
        this.callbacks[name.namespace][name.value] instanceof Array
      ) {
        this.callbacks[name.namespace][name.value].forEach((_callback, _index) => {
          if (_callback === callback) {
            this.callbacks[name.namespace][name.value].splice(_index, 1);
          }
        });
      }
    });

    return this;
  }

  trigger(_names, _args) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    let names = this.resolveNames(_names);

    // Callback
    if (typeof _args === 'undefined') {
      _args = {};
    }

    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (
        this.callbacks[name.namespace] instanceof Object &&
        this.callbacks[name.namespace][name.value] instanceof Array
      ) {
        this.callbacks[name.namespace][name.value].forEach((_callback) => {
          _callback(_args);
        });
      }
    });

    return this;
  }

  resolveNames(_names) {
    let names = _names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
    names = names.replace(/[,/]+/g, ' ');
    names = names.split(' ');

    return names;
  }

  resolveName(_name) {
    const name = {};
    name.original = _name;
    const parts = _name.split('.');

    name.value = parts[0];
    name.namespace = 'base';

    if (parts.length > 1) name.namespace = parts[1];

    return name;
  }
}
