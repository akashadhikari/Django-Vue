require('../../../src/stylus/components/_system-bars.styl');

import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';

export default {
  name: 'v-system-bar',

  mixins: [Applicationable, Colorable, Themeable],

  props: {
    absolute: Boolean,
    fixed: Boolean,
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks(Object.assign({
        'system-bar--lights-out': this.lightsOut,
        'system-bar--absolute': this.absolute,
        'system-bar--fixed': this.fixed,
        'system-bar--status': this.status,
        'system-bar--window': this.window
      }, this.themeClasses));
    },
    computedHeight: function computedHeight() {
      return this.window ? 32 : 24;
    }
  },

  watch: {
    window: function window() {
      this.updateApplication();
    },
    fixed: function fixed() {
      this.updateApplication();
    },
    absolute: function absolute() {
      this.updateApplication();
    }
  },

  methods: {
    updateApplication: function updateApplication() {
      if (this.app && this.$vuetify) {
        this.$vuetify.application.bar = this.fixed || this.absolute ? this.computedHeight : 0;
      }
    }
  },

  destroyed: function destroyed() {
    if (this.app && this.$vuetify) this.$vuetify.application.bar = 0;
  },
  render: function render(h) {
    var data = {
      staticClass: 'system-bar',
      'class': this.classes,
      style: {
        height: this.computedHeight + 'px'
      }
    };

    return h('div', data, this.$slots.default);
  }
};