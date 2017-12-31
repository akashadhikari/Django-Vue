require('../../../src/stylus/components/_steppers.styl');

import Themeable from '../../mixins/themeable';

export default {
  name: 'v-stepper',

  mixins: [Themeable],

  provide: function provide() {
    return {
      stepClick: this.stepClick
    };
  },
  data: function data() {
    return {
      inputValue: null,
      isBooted: false,
      steps: [],
      content: [],
      isReverse: false
    };
  },


  props: {
    nonLinear: Boolean,
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper': true,
        'stepper--is-booted': this.isBooted,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels,
        'stepper--non-linear': this.nonLinear,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    inputValue: function inputValue(val, prev) {
      var _this = this;

      this.isReverse = Number(val) < Number(prev);
      this.steps.forEach(function (i) {
        return i.toggle(_this.inputValue);
      });
      this.content.forEach(function (i) {
        return i.toggle(_this.inputValue, _this.isReverse);
      });

      this.$emit('input', this.inputValue);
      prev && (this.isBooted = true);
    },
    value: function value() {
      var _this2 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this2.inputValue = _this2.value;
      });
    }
  },

  mounted: function mounted() {
    this.getSteps();

    this.inputValue = this.value || this.steps[0].step || 1;
  },


  methods: {
    getSteps: function getSteps() {
      var _this3 = this;

      this.steps = [];
      this.content = [];
      this.$children.forEach(function (i) {
        if (i.$options._componentTag === 'v-stepper-step') {
          _this3.steps.push(i);
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = _this3.vertical;
          _this3.content.push(i);
        }
      });
    },
    stepClick: function stepClick(step) {
      var _this4 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this4.inputValue = step;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
};