require('../../../src/stylus/components/_breadcrumbs.styl');

export default {
  name: 'v-breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/'
    },
    large: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'breadcrumbs--large': this.large
      };
    },
    computedDivider: function computedDivider() {
      return this.$slots.divider ? this.$slots.divider : this.divider;
    },
    styles: function styles() {
      var justify = this.justifyCenter ? 'center' : this.justifyEnd ? 'flex-end' : 'flex-start';

      return {
        'justify-content': justify
      };
    }
  },

  methods: {
    /**
     * Add dividers between
     * v-breadcrumbs-item
     * 
     * @return {array}
     */
    genChildren: function genChildren() {
      var _this = this;

      if (!this.$slots.default) return null;

      var children = [];
      var dividerData = { staticClass: 'breadcrumbs__divider' };
      var length = this.$slots.default.length;

      this.$slots.default.forEach(function (elm, i) {
        children.push(elm);

        if (!elm.componentOptions || elm.componentOptions.tag !== 'v-breadcrumbs-item' || i === length - 1) return;

        children.push(_this.$createElement('li', dividerData, _this.computedDivider));
      });

      return children;
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'breadcrumbs',
      'class': this.classes,
      style: this.styles
    }, this.genChildren());
  }
};