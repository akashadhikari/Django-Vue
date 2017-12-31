export default {
  data: function data() {
    return {
      buttons: [],
      listeners: []
    };
  },


  methods: {
    getValue: function getValue(i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value;
      }

      return i;
    },
    update: function update() {
      var _this = this;

      var selected = [];

      this.buttons.forEach(function (button, i) {
        var elm = button.$el;

        // Fix for testing, dataset does not exist on elm?
        if (!elm.dataset) elm.dataset = {};

        elm.removeAttribute('data-only-child');

        if (_this.isSelected(i)) {
          elm.setAttribute('data-selected', true);

          if (!elm.classList.contains('btn--router')) {
            elm.classList.add('btn--active');
          }

          selected.push(i);
        } else {
          elm.removeAttribute('data-selected');

          if (!elm.classList.contains('btn--router')) {
            elm.classList.remove('btn--active');
          }
        }

        elm.dataset.index = i;
      });

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.buttons = this.$children;

    this.buttons.forEach(function (button, i) {
      _this2.listeners.push(_this2.updateValue.bind(_this2, i));
      button.$on('click', _this2.listeners[i]);
    });

    this.update();
  },
  beforeDestroy: function beforeDestroy() {
    var _this3 = this;

    this.buttons.forEach(function (button, i) {
      button.$off('click', _this3.listeners[i]);
    });
  }
};