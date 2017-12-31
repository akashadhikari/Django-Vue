require('../../../src/stylus/components/_alerts.styl');

import VIcon from '../VIcon';

import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';
import Transitionable from '../../mixins/transitionable';

export default {
  name: 'v-alert',

  components: {
    VIcon: VIcon
  },

  mixins: [Colorable, Toggleable, Transitionable],

  props: {
    dismissible: Boolean,
    icon: String,
    outline: Boolean,
    type: {
      type: String,
      validator: function validator(val) {
        return ['info', 'error', 'success', 'warning'].includes(val);
      }
    }
  },

  data: function data() {
    return {
      defaultColor: 'error'
    };
  },

  computed: {
    classes: function classes() {
      var colorProp = this.type && !this.color ? 'type' : 'computedColor';
      var classes = {
        'alert--dismissible': this.dismissible,
        'alert--outline': this.outline
      };

      return this.outline ? this.addTextColorClassChecks(classes, colorProp) : this.addBackgroundColorClassChecks(classes, colorProp);
    },
    computedIcon: function computedIcon() {
      if (this.icon || !this.type) return this.icon;

      switch (this.type) {
        case 'info':
          return 'info';
        case 'error':
          return 'warning';
        case 'success':
          return 'check_circle';
        case 'warning':
          return 'priority_high';
      }
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [h('div', this.$slots.default)];

    if (this.computedIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.computedIcon));
    }

    if (this.dismissible) {
      var close = h('a', {
        'class': 'alert__dismissible',
        on: { click: function click() {
            return _this.$emit('input', false);
          } }
      }, [h(VIcon, {
        props: {
          right: true
        }
      }, 'cancel')]);

      children.push(close);
    }

    var alert = h('div', {
      staticClass: 'alert',
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, children);

    if (!this.transition) return alert;

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert]);
  }
};