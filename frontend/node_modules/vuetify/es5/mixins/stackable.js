function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { getZIndex } from '../util/helpers';

export default {
  data: function data() {
    return {
      stackBase: null,
      stackClass: 'unpecified',
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0
    };
  },

  computed: {
    activeZIndex: function activeZIndex() {
      var content = this.stackElement || this.$refs.content;
      // Return current zindex if not active
      if (!this.isActive) return getZIndex(content);

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return this.getMaxZIndex(this.stackExclude || [content]) + 2;
    }
  },
  methods: {
    getMaxZIndex: function getMaxZIndex() {
      var exclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var base = this.stackBase || this.$el;
      // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater
      var zis = [this.stackMinZIndex, getZIndex(base)];
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146
      var activeElements = [].concat(_toConsumableArray(document.getElementsByClassName(this.stackClass)));

      // Get z-index for all active dialogs
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = activeElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var activeElement = _step.value;

          if (!exclude.includes(activeElement)) {
            zis.push(getZIndex(activeElement));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Math.max.apply(Math, zis);
    }
  }
};