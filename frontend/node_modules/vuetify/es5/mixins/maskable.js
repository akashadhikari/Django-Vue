/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */

import { isMaskDelimiter, maskText as _maskText, unmaskText as _unmaskText } from '../util/mask';

export default {
  data: function data() {
    return {
      selection: 0,
      preDefined: {
        'credit-card': '#### - #### - #### - ####',
        'date': '##/##/####',
        'date-with-time': '##/##/#### ##:##',
        'phone': '(###) ### - ####',
        'social': '###-##-####',
        'time': '##:##',
        'time-with-seconds': '##:##:##'
      }
    };
  },

  props: {
    dontFillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean
  },

  computed: {
    masked: function masked() {
      var preDefined = this.preDefined[this.mask];
      var mask = preDefined || this.mask || '';

      return mask.split('');
    }
  },

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask: function mask() {
      var _this = this;

      if (!this.$refs.input) return;

      var oldValue = this.$refs.input.value;
      var newValue = this.maskText(this.lazyValue);
      var position = 0;
      var selection = this.selection;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = oldValue.substr(0, selection)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _char = _step.value;

          isMaskDelimiter(_char) || position++;
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

      selection = 0;
      if (newValue) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = newValue[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var char = _step2.value;

            isMaskDelimiter(char) || position--;
            selection++;
            if (position <= 0) break;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      this.$nextTick(function () {
        _this.$refs.input.value = newValue;
        _this.setCaretPosition(selection);
      });
    }
  },

  methods: {
    setCaretPosition: function setCaretPosition(selection) {
      var _this2 = this;

      this.selection = selection;
      window.setTimeout(function () {
        _this2.$refs.input && _this2.$refs.input.setSelectionRange(_this2.selection, _this2.selection);
      }, 0);
    },
    updateRange: function updateRange() {
      if (!this.$refs.input) return;

      var newValue = this.maskText(this.lazyValue);
      var selection = 0;

      this.$refs.input.value = newValue;
      if (newValue) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = newValue[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var char = _step3.value;

            if (this.lazySelection <= 0) break;
            isMaskDelimiter(char) || this.lazySelection--;
            selection++;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      this.setCaretPosition(selection);
      // this.$emit() must occur only when all internal values are correct
      this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue);
    },
    maskText: function maskText(text) {
      return this.mask ? _maskText(text, this.masked, this.dontFillMaskBlanks) : text;
    },
    unmaskText: function unmaskText(text) {
      return this.mask ? _unmaskText(text) : text;
    },

    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange: function setSelectionRange() {
      this.$nextTick(this.updateRange);
    }
  }
};