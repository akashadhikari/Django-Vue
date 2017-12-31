export default {
  methods: {
    genBtn: function genBtn(change, children) {
      var _this = this;

      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            if (_this.activePicker === 'DATE') {
              _this.updateTableMonth(change);
            } else if (_this.activePicker === 'MONTH') {
              _this.tableDate = '' + change;
            }
          }
        }
      }, children);
    },
    genHeader: function genHeader(keyValue, selectorText) {
      var _this2 = this;

      var header = this.$createElement('strong', {
        'class': this.addTextColorClassChecks(),
        key: keyValue,
        on: {
          click: function click() {
            return _this2.activePicker = _this2.activePicker === 'DATE' ? 'MONTH' : 'YEAR';
          }
        }
      }, selectorText);

      var transition = this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [header]);

      return this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [transition]);
    },
    genSelector: function genSelector() {
      var keyValue = this.activePicker === 'DATE' ? this.tableMonth : this.tableYear;
      // Generates the text of the button switching the active picker in the table header.
      // For date picker it uses headerDateFormat formatting function (defined by dev or
      // default). For month picker it uses Date::toLocaleDateString to get the year
      // in the current locale or just a year numeric value if Date::toLocaleDateString
      // is not supported
      var selectorText = this.activePicker === 'DATE' ? this.formatters.headerDate(this.tableYear + '-' + (this.tableMonth + 1)) : this.formatters.year('' + this.tableYear);

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [this.genBtn(keyValue - 1, [this.$createElement('v-icon', 'chevron_left')]), this.genHeader(keyValue, selectorText), this.genBtn(keyValue + 1, [this.$createElement('v-icon', 'chevron_right')])]);
    }
  }
};