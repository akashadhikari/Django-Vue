import Touch from '../../directives/touch';

export default {
  name: 'v-tabs-items',

  directives: { Touch: Touch },

  inject: ['next', 'prev'],

  props: {
    cycle: Boolean,
    touchless: Boolean
  },

  methods: {
    swipeLeft: function swipeLeft() {
      this.next(this.cycle);
    },
    swipeRight: function swipeRight() {
      this.prev(this.cycle);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'tabs__items',
      directives: []
    };

    !this.touchless && data.directives.push({
      name: 'touch',
      value: {
        left: this.swipeLeft,
        right: this.swipeRight
      }
    });

    return h('div', data, this.$slots.default);
  }
};