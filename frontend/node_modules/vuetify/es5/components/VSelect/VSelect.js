var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_text-fields.styl');
require('../../../src/stylus/components/_input-groups.styl');
require('../../../src/stylus/components/_select.styl');

// Components
import VBtn from '../VBtn';
import VCard from '../VCard';
import VCheckbox from '../VCheckbox';
import VChip from '../VChip';
import { VList, VListTile, VListTileAction, VListTileContent, VListTileTitle } from '../VList';
import VMenu from '../VMenu';

// Mixins
import Colorable from '../../mixins/colorable';
import Dependent from '../../mixins/dependent';
import Filterable from '../../mixins/filterable';
import Input from '../../mixins/input';
import Maskable from '../../mixins/maskable';

// Component level mixins
import Autocomplete from './mixins/select-autocomplete';
import Computed from './mixins/select-computed';
import Events from './mixins/select-events';
import Generators from './mixins/select-generators';
import Helpers from './mixins/select-helpers';
import Menu from './mixins/select-menu';
import Props from './mixins/select-props';
import Watchers from './mixins/select-watchers';

// Directives
import ClickOutside from '../../directives/click-outside';

export default {
  name: 'v-select',

  inheritAttrs: false,

  components: {
    VCard: VCard,
    VCheckbox: VCheckbox,
    VChip: VChip,
    VList: VList,
    VListTile: VListTile,
    VListTileAction: VListTileAction,
    VListTileContent: VListTileContent,
    VListTileTitle: VListTileTitle,
    VMenu: VMenu,
    VBtn: VBtn
  },

  directives: {
    ClickOutside: ClickOutside
  },

  mixins: [Autocomplete, Colorable, Dependent, Events, Filterable, Generators, Helpers, Input, Maskable, Menu, Props, Watchers,
  // Input and Computed both
  // contain isDirty props
  // last gets merged in
  Computed],

  data: function data() {
    return {
      cachedItems: [],
      content: {},
      defaultColor: 'primary',
      inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      lazySearch: null,
      isActive: false,
      menuIsActive: false,
      searchTimeout: null,
      selectedIndex: -1,
      selectedItems: [],
      shouldBreak: false
    };
  },
  mounted: function mounted() {
    // If instance is being destroyed
    // do not run mounted functions
    if (this._isDestroyed) return;

    // Evaluate the selected items immediately
    // to avoid a unnecessary label transition
    this.genSelectedItems();

    this.content = this.$refs.menu.$refs.content;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isBooted) {
      if (this.content) {
        this.content.removeEventListener('scroll', this.onScroll, false);
      }
    }
  },


  methods: {
    changeSelectedIndex: function changeSelectedIndex(keyCode) {
      // backspace, left, right, delete
      if (![8, 37, 39, 46].includes(keyCode)) return;

      var indexes = this.selectedItems.length - 1;

      if (keyCode === 37) {
        // Left arrow
        this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
      } else if (keyCode === 39) {
        // Right arrow
        this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes;
        return;
      }

      // backspace/delete
      if ([8, 46].includes(keyCode)) {
        var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;

        this.combobox ? this.inputValue = null : this.selectItem(this.selectedItems[this.selectedIndex]);
        this.selectedIndex = newIndex;
      }
    },
    filterDuplicates: function filterDuplicates(arr) {
      var values = arr.map(this.getValue);
      return arr.filter(function (el, i) {
        return i === values.indexOf(values[i]);
      });
    },
    genDirectives: function genDirectives() {
      var _this = this;

      return [{
        name: 'click-outside',
        value: function value(e) {
          return !!_this.content && !_this.content.contains(e.target) && !!_this.$el && !_this.$el.contains(e.target);
        }
      }];
    },
    genSelectedItems: function genSelectedItems() {
      var _this2 = this;

      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.inputValue;

      // If we are using tags, don't filter results
      if (this.tags) return this.selectedItems = val;

      // Combobox is the single version
      // of a taggable select element
      if (this.combobox) return this.selectedItems = val ? [val] : [];

      var selectedItems = this.computedItems.filter(function (i) {
        if (!_this2.isMultiple) {
          return _this2.getValue(i) === _this2.getValue(val);
        } else {
          // Always return Boolean
          return _this2.findExistingItem(i) > -1;
        }
      });

      if (!selectedItems.length && val != null && this.tags) {
        selectedItems = Array.isArray(val) ? val : [val];
      }

      this.selectedItems = selectedItems;
    },
    clearableCallback: function clearableCallback() {
      var _this3 = this;

      var inputValue = this.isMultiple ? [] : null;

      this.inputValue = inputValue;
      this.$emit('change', inputValue);
      this.genSelectedItems();

      // When input is cleared
      // reset search value and
      // re-focus the input
      setTimeout(function () {
        _this3.searchValue = null;
        _this3.focusInput();
      }, 0);

      if (this.openOnClear) {
        setTimeout(this.showMenu, 50);
      }
    },
    onScroll: function onScroll() {
      var _this4 = this;

      if (!this.isActive) {
        requestAnimationFrame(function () {
          return _this4.content.scrollTop = 0;
        });
      } else {
        if (this.lastItem >= this.computedItems.length) return;

        var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    findExistingItem: function findExistingItem(item) {
      var _this5 = this;

      return this.inputValue.findIndex(function (i) {
        var a = _this5.getValue(i);
        var b = _this5.getValue(item);

        if (a !== Object(a)) return a === b;

        return _this5.compareObjects(a, b);
      });
    },
    selectItem: function selectItem(item) {
      var _this6 = this;

      if (!this.isMultiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
        this.selectedItems = [item];
      } else {
        var selectedItems = [];
        var inputValue = this.inputValue.slice();
        var i = this.findExistingItem(item);

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item);
        this.inputValue = inputValue.map(function (i) {
          selectedItems.push(i);
          return _this6.returnObject ? i : _this6.getValue(i);
        });

        this.selectedItems = selectedItems;
      }

      this.searchValue = !this.isMultiple && !this.chips && !this.$scopedSlots.selection ? this.getText(this.selectedItem) : null;

      this.$emit('change', this.inputValue);

      // List tile will re-render, reset index to
      // maintain highlighting
      var savedIndex = this.getMenuIndex();
      this.resetMenuIndex();

      // After selecting an item
      // refocus the input and
      // reset the caret pos
      this.$nextTick(function () {
        _this6.focusInput();
        _this6.setCaretPosition(_this6.currentRange);

        requestAnimationFrame(function () {
          if (savedIndex > -1) {
            _this6.setMenuIndex(savedIndex);
          }
        });
      });
    }
  },

  render: function render(h) {
    var _this7 = this;

    var data = {
      attrs: _extends({
        tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex
      }, this.isAutocomplete ? null : this.$attrs, {
        role: this.isAutocomplete ? null : 'combobox'
      })
    };

    if (!this.isAutocomplete) {
      data.on = this.genListeners();
      data.directives = this.genDirectives();
    } else {
      data.on = {
        click: function click() {
          if (_this7.disabled || _this7.readonly || _this7.isFocused) return;

          // If the input is dirty,
          // the input is not targetable
          // so we must manually focus
          if (_this7.isDirty) {
            _this7.focus();
            _this7.$nextTick(_this7.focusInput);
          }
        }
      };
    }

    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], data, this.toggleMenu);
  }
};