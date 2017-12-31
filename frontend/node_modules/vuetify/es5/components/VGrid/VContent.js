require('../../../src/stylus/components/_content.styl');

export default {
  name: 'v-content',

  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },

  computed: {
    styles: function styles() {
      var _$vuetify$application = this.$vuetify.application,
          bar = _$vuetify$application.bar,
          top = _$vuetify$application.top,
          right = _$vuetify$application.right,
          bottom = _$vuetify$application.bottom,
          left = _$vuetify$application.left;


      return {
        paddingTop: top + bar + 'px',
        paddingRight: right + 'px',
        paddingBottom: bottom + 'px',
        paddingLeft: left + 'px'
      };
    }
  },

  mounted: function mounted() {
    // TODO: Deprecate
    if (this.$el.parentElement.tagName === 'MAIN') {
      console.warn('v-content no longer needs to be wrapped in a <main> tag', this.$el.parentElement);
    }
  },
  render: function render(h) {
    var data = {
      staticClass: 'content',
      style: this.styles,
      ref: 'content'
    };

    return h('div', {
      staticClass: 'content--wrap'
    }, [h(this.tag, data, this.$slots.default)]);
  }
};