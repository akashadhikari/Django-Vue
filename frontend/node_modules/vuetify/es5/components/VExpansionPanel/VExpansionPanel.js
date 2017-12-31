var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_expansion-panel.styl');

import Themeable from '../../mixins/themeable';

export default {
  name: 'v-expansion-panel',

  mixins: [Themeable],

  provide: function provide() {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    };
  },


  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    getChildren: function getChildren() {
      return this.$children.filter(function (c) {
        if (!c.$options) return;

        return c.$options.name === 'v-expansion-panel-content';
      });
    },
    panelClick: function panelClick(uid) {
      if (!this.expand) {
        return this.getChildren().forEach(function (e) {
          return e.toggle(uid);
        });
      }

      var panel = this.$children.find(function (e) {
        return e._uid === uid;
      });

      panel && panel.toggle(uid);
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': _extends({
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset
      }, this.themeClasses)
    }, this.$slots.default);
  }
};