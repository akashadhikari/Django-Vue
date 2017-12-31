require('../../../src/stylus/components/_toolbar.styl');

import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';

export default {
  name: 'v-toolbar',

  mixins: [Applicationable, Colorable, Themeable],

  data: function data() {
    return {
      heights: {
        mobileLandscape: 48,
        mobile: 56,
        desktop: 64,
        dense: 48
      },
      isExtended: false,
      isScrollingProxy: false,
      marginTop: 0,
      previousScroll: null,
      target: null
    };
  },

  props: {
    absolute: Boolean,
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    height: [Number, String],
    manualScroll: {
      type: Boolean,
      default: null
    },
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 100
    }
  },

  computed: {
    computedHeight: function computedHeight() {
      if (this.height) return parseInt(this.height);
      if (this.dense) return this.heights.dense;

      if (this.prominent || this.$vuetify.breakpoint.mdAndUp) return this.heights.desktop;

      if (this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) return this.heights.mobileLandscape;

      return this.heights.mobile;
    },
    computedMarginTop: function computedMarginTop() {
      if (!this.app) return this.marginTop;

      return this.marginTop + this.$vuetify.application.bar;
    },
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'toolbar': true,
        'elevation-0': this.flat,
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--clipped': this.clippedLeft || this.clippedRight,
        'toolbar--dense': this.dense,
        'toolbar--fixed': this.fixed,
        'toolbar--floating': this.floating,
        'toolbar--prominent': this.prominent,
        'toolbar--extended': this.isExtended,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },

    isScrolling: {
      get: function get() {
        return this.manualScroll != null ? this.manualScroll : this.isScrollingProxy;
      },
      set: function set(val) {
        this.isScrollingProxy = val;
      }
    },
    paddingLeft: function paddingLeft() {
      if (!this.app || this.clippedLeft) return 0;

      return this.$vuetify.application.left;
    },
    paddingRight: function paddingRight() {
      if (!this.app || this.clippedRight) return 0;

      return this.$vuetify.application.right;
    },
    styles: function styles() {
      var style = {
        marginTop: this.computedMarginTop + 'px'
      };

      if (this.app) {
        style.paddingRight = this.paddingRight + 'px';
        style.paddingLeft = this.paddingLeft + 'px';
      }

      return style;
    }
  },

  watch: {
    clippedLeft: function clippedLeft(val) {
      this.updateApplication();
    },
    clippedRight: function clippedRight(val) {
      this.updateApplication();
    },
    isScrolling: function isScrolling(val) {
      this.whenScrolled(val);
    }
  },

  mounted: function mounted() {
    this.whenScrolled(this.isScrolling);
  },
  destroyed: function destroyed() {
    if (this.app) this.$vuetify.application.top = 0;
  },


  methods: {
    onScroll: function onScroll() {
      if (typeof window === 'undefined') return;

      if (!this.target) {
        this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window;
      }

      var currentScroll = this.scrollTarget ? this.target.scrollTop : this.target.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll < this.scrollThreshold) return;

      if (this.previousScroll === null) {
        this.previousScroll = currentScroll;
      }

      this.isScrollingProxy = this.previousScroll < currentScroll;

      this.previousScroll = currentScroll;
    },
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.top = !this.fixed && !this.absolute ? 0 : this.isExtended && !this.isScrolling ? this.computedHeight * 2 : this.computedHeight;
    },
    whenScrolled: function whenScrolled(val) {
      this.marginTop = val ? -this.$refs.content.clientHeight - 6 : 0;

      this.updateApplication();
    }
  },

  render: function render(h) {
    this.isExtended = this.extended || !!this.$slots.extension;
    this.updateApplication();

    var children = [];
    var data = {
      'class': this.classes,
      style: this.styles,
      on: this.$listeners
    };

    if (this.scrollOffScreen) {
      data.directives = [{
        name: 'scroll',
        value: {
          callback: this.onScroll,
          target: this.scrollTarget
        }
      }];
    }

    children.push(h('div', {
      staticClass: 'toolbar__content',
      style: { height: this.computedHeight + 'px' },
      ref: 'content'
    }, this.$slots.default));

    if (this.isExtended) {
      children.push(h('div', {
        staticClass: 'toolbar__extension',
        style: { height: this.computedHeight + 'px' }
      }, this.$slots.extension));
    }

    return h('nav', data, children);
  }
};