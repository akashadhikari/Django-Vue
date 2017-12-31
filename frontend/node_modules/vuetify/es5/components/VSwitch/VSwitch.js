require('../../../src/stylus/components/_input-groups.styl');
require('../../../src/stylus/components/_selection-controls.styl');
require('../../../src/stylus/components/_switch.styl');

// Mixins
import Rippleable from '../../mixins/rippleable';
import Selectable from '../../mixins/selectable';

// Directives
import Touch from '../../directives/touch';

export default {
  name: 'v-switch',

  mixins: [Rippleable, Selectable],

  directives: { Touch: Touch },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group--selection-controls switch': true
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    rippleClasses: function rippleClasses() {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      };
    },
    containerClasses: function containerClasses() {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      };
    },
    toggleClasses: function toggleClasses() {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      };
    }
  },

  methods: {
    onSwipeLeft: function onSwipeLeft() {
      if (this.isActive) this.toggle();
    },
    onSwipeRight: function onSwipeRight() {
      if (!this.isActive) this.toggle();
    }
  },

  render: function render(h) {
    var container = h('div', {
      'class': this.containerClasses
    }, [h('div', { 'class': this.toggleClasses }), this.genRipple({
      directives: [{
        name: 'touch',
        value: {
          left: this.onSwipeLeft,
          right: this.onSwipeRight
        }
      }]
    })]);

    return this.genInputGroup([container]);
  }
};