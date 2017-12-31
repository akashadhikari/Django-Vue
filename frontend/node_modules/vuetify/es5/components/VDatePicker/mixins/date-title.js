
export default {
  methods: {
    genYearIcon: function genYearIcon() {
      return this.yearIcon ? this.$createElement('v-icon', {
        props: {
          dark: true
        }
      }, this.yearIcon) : null;
    },
    getYearBtn: function getYearBtn() {
      var _this = this;

      return this.$createElement('div', {
        'class': {
          'picker--date__title-year': true,
          'active': this.activePicker === 'YEAR'
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this.activePicker = 'YEAR';
          }
        }
      }, [this.formatters.year('' + this.year), this.genYearIcon()]);
    },
    genTitleText: function genTitleText(title) {
      return this.$createElement('transition', {
        props: {
          name: 'slide-y-reverse-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', {
        domProps: { innerHTML: title },
        key: title
      })]);
    },
    genTitleDate: function genTitleDate(title) {
      var _this2 = this;

      return this.$createElement('div', {
        staticClass: 'picker--date__title-date',
        'class': {
          'active': this.activePicker === this.type.toUpperCase()
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this2.activePicker = _this2.type.toUpperCase();
          }
        }
      }, [this.genTitleText(title)]);
    },
    genTitle: function genTitle(title) {
      return this.genPickerTitle([this.getYearBtn(), this.genTitleDate(title)]);
    }
  }
};