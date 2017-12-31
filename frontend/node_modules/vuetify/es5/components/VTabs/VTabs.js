require('../../../src/stylus/components/_tabs.styl');

import Resize from '../../directives/resize';

export default {
  name: 'v-tabs',

  directives: {
    Resize: Resize
  },

  provide: function provide() {
    var _this = this;

    return {
      registerContent: this.registerContent,
      unregisterContent: this.unregisterContent,
      registerTabItem: this.registerTabItem,
      unregisterTabItem: this.unregisterTabItem,
      next: this.next,
      prev: this.prev,
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: function isScrollable() {
        return _this.scrollable;
      },
      isMobile: function isMobile() {
        return _this.isMobile;
      }
    };
  },
  data: function data() {
    return {
      activeIndex: null,
      content: [],
      isBooted: false,
      resizeTimeout: null,
      reverse: false,
      tabItems: [],
      tabsContainer: null,
      tabsSlider: null,
      target: null,
      targetEl: null,
      transitionTime: 300
    };
  },


  props: {
    centered: Boolean,
    fixed: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1280
    },
    value: String,
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--fixed': this.fixed,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--mobile': this.isMobile,
        'tabs--scroll-bars': this.scrollable
      };
    },
    isMobile: function isMobile() {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
    }
  },

  watch: {
    value: function value() {
      this.tabClick(this.value);
    },
    activeIndex: function activeIndex() {
      var _this2 = this;

      this.updateTabs();
      this.$nextTick(function () {
        return _this2.isBooted = true;
      });
    },
    tabItems: function tabItems(newItems, oldItems) {
      var _this3 = this;

      // Tab item was removed and
      // there are still more
      if (oldItems.length > newItems.length && newItems.length > 0) {
        if (!newItems.find(function (o) {
          return o.id === _this3.target;
        })) {
          var i = oldItems.findIndex(function (o) {
            return o.id === _this3.target;
          });

          this.$nextTick(function () {
            _this3.activeIndex = _this3.tabItems[i > 0 ? i - 1 : 0].id;
            _this3.target = _this3.activeIndex;
          });
        }
      }
      this.slider();
    },
    '$vuetify.application.left': function $vuetifyApplicationLeft() {
      this.onContainerResize();
    },
    '$vuetify.application.right': function $vuetifyApplicationRight() {
      this.onContainerResize();
    }
  },

  mounted: function mounted() {
    // This is a workaround to detect if link is active
    // when being used as a router or nuxt link
    var i = this.tabItems.findIndex(function (_ref) {
      var el = _ref.el;

      return el.firstChild.classList.contains('tabs__item--active');
    });

    var tab = this.value || (this.tabItems[i !== -1 ? i : 0] || {}).id;

    tab && this.tabClick(tab);
  },


  methods: {
    registerContent: function registerContent(id, toggle) {
      this.content.push({ id: id, toggle: toggle });
    },
    registerTabItem: function registerTabItem(id, toggle, el) {
      this.tabItems.push({ id: id, toggle: toggle, el: el });
    },
    unregisterContent: function unregisterContent(id) {
      this.content = this.content.filter(function (o) {
        return o.id !== id;
      });
    },
    unregisterTabItem: function unregisterTabItem(id) {
      this.tabItems = this.tabItems.filter(function (o) {
        return o.id !== id;
      });
    },
    next: function next(cycle) {
      var nextIndex = this.activeIndex + 1;

      if (!this.content[nextIndex]) {
        if (!cycle) return;
        nextIndex = 0;
      }

      this.tabClick(this.tabItems[nextIndex].id);
    },
    prev: function prev(cycle) {
      var prevIndex = this.activeIndex - 1;

      if (!this.content[prevIndex]) {
        if (!cycle) return;
        prevIndex = this.content.length - 1;
      }

      this.tabClick(this.tabItems[prevIndex].id);
    },
    onResize: function onResize() {
      this.slider();
    },

    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     *
     * @return {Void}
     */
    onContainerResize: function onContainerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.onResize, this.transitionTime);
    },
    slider: function slider(el) {
      var _this4 = this;

      this.tabsSlider = this.tabsSlider || !!this.$el && this.$el.querySelector('.tabs__slider');

      this.tabsContainer = this.tabsContainer || !!this.$el && this.$el.querySelector('.tabs__container');

      if (!this.tabsSlider || !this.tabsContainer) return;

      this.targetEl = el || this.targetEl;

      if (!this.targetEl) return;

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(function () {
        // #684 Calculate width as %
        var width = _this4.targetEl.scrollWidth / _this4.tabsContainer.clientWidth * 100;

        _this4.tabsSlider.style.width = width + '%';
        _this4.tabsSlider.style.left = _this4.targetEl.offsetLeft + 'px';
      });
    },
    tabClick: function tabClick(target) {
      var _this5 = this;

      var setActiveIndex = function setActiveIndex(index) {
        if (_this5.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          _this5.updateTabs();
        } else {
          _this5.activeIndex = index;
        }
      };

      this.target = target;

      this.$nextTick(function () {
        var nextIndex = _this5.content.findIndex(function (o) {
          return o.id === target;
        });
        _this5.reverse = nextIndex < _this5.activeIndex;
        setActiveIndex(nextIndex);

        _this5.$emit('input', _this5.target);
      });
    },
    updateTabs: function updateTabs() {
      var _this6 = this;

      this.content.forEach(function (_ref2) {
        var toggle = _ref2.toggle;

        toggle(_this6.target, _this6.reverse, _this6.isBooted);
      });

      this.tabItems.forEach(function (_ref3) {
        var toggle = _ref3.toggle;

        toggle(_this6.target);
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, this.$slots.default);
  }
};