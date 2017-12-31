function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function generateWarning(child, parent) {
  return function () {
    return console.warn("[Vuetify] Warn: The " + child + " component must be used inside a " + parent + ".");
  };
}

export function inject(namespace, child, parent) {
  return {
    inject: _defineProperty({}, namespace, {
      default: {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
      }
    })
  };
}

export function provide(namespace) {
  return {
    methods: {
      register: null,
      unregister: null
    },
    provide: function provide() {
      return _defineProperty({}, namespace, {
        register: this.register,
        unregister: this.unregister
      });
    }
  };
}