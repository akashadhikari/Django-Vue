import ExpandTransitionGenerator from '../../transitions/expand-transition';

export default {
  methods: {
    genTBody: function genTBody() {
      var children = [];

      if (!this.itemsLength && !this.items.length) {
        var noData = this.$slots['no-data'] || this.noDataText;
        children.push(this.genEmptyBody(noData));
      } else if (!this.filteredItems.length) {
        var noResults = this.$slots['no-results'] || this.noResultsText;
        children.push(this.genEmptyBody(noResults));
      } else {
        children.push(this.genFilteredItems());
      }

      return this.$createElement('tbody', children);
    },
    genExpandedRow: function genExpandedRow(props) {
      var children = [];

      if (this.isExpanded(props.item)) {
        var expand = this.$createElement('div', {
          class: 'datatable__expand-content',
          key: props.item[this.itemKey]
        }, this.$scopedSlots.expand(props));

        children.push(expand);
      }

      var transition = this.$createElement('transition-group', {
        class: 'datatable__expand-col',
        attrs: { colspan: '100%' },
        props: {
          tag: 'td'
        },
        on: ExpandTransitionGenerator('datatable__expand-col--expanded')
      }, children);

      return this.genTR([transition], { class: 'datatable__expand-row' });
    },
    createProps: function createProps(item, index) {
      var _this = this;

      var props = { item: item, index: index };
      var key = this.itemKey;

      Object.defineProperty(props, 'selected', {
        get: function get() {
          return _this.selected[item[_this.itemKey]];
        },
        set: function set(value) {
          var selected = _this.value.slice();
          if (value) selected.push(item);else selected = selected.filter(function (i) {
            return i[key] !== item[key];
          });
          _this.$emit('input', selected);
        }
      });

      Object.defineProperty(props, 'expanded', {
        get: function get() {
          return _this.expanded[item[_this.itemKey]];
        },
        set: function set(value) {
          if (!_this.expand) {
            Object.keys(_this.expanded).forEach(function (key) {
              _this.$set(_this.expanded, key, false);
            });
          }
          _this.$set(_this.expanded, item[_this.itemKey], value);
        }
      });

      return props;
    },
    genFilteredItems: function genFilteredItems() {
      var _this2 = this;

      var rows = [];
      this.filteredItems.forEach(function (item, index) {
        var props = _this2.createProps(item, index);
        var row = _this2.$scopedSlots.items ? _this2.$scopedSlots.items(props) : [];

        rows.push(_this2.needsTR(row) ? _this2.genTR(row, {
          attrs: { active: _this2.isSelected(item) }
        }) : row);

        if (_this2.$scopedSlots.expand) {
          var expandRow = _this2.genExpandedRow(props);
          rows.push(expandRow);
        }
      });

      return rows;
    },
    genEmptyBody: function genEmptyBody(content) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, content)]);
    }
  }
};