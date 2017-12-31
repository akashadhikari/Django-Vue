export default {
  methods: {
    monthWheelScroll: function monthWheelScroll(e) {
      e.preventDefault();

      var year = this.tableYear;

      if (e.deltaY < 0) year++;else year--;

      this.tableDate = '' + year;
    },
    monthClick: function monthClick(month) {
      var _this = this;

      // Updates inputDate setting 'YYYY-MM' or 'YYYY-MM-DD' format, depending on the picker type
      if (this.type === 'date') {
        var date = this.sanitizeDateString(this.tableYear + '-' + (month + 1) + '-' + this.day, 'date');
        if (this.isAllowed(date)) this.inputDate = date;
        this.updateTableMonth(month);
        this.activePicker = 'DATE';
      } else {
        this.inputDate = this.sanitizeDateString(this.tableYear + '-' + (month + 1), 'month');
        this.$nextTick(function () {
          return _this.autosave && _this.save();
        });
      }
    },
    monthGenTD: function monthGenTD(month) {
      var _this2 = this;

      var pad = function pad(n) {
        return n * 1 < 10 ? '0' + n * 1 : '' + n;
      };
      var date = this.tableYear + '-' + pad(month + 1);
      var monthName = this.formatters.month(date);
      var isActive = this.monthIsActive(month);
      var isCurrent = this.monthIsCurrent(month);
      var classes = Object.assign({
        'btn--flat': !isActive,
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': this.type === 'month' && !this.isAllowed(date)
      }, this.themeClasses);

      return this.$createElement('td', [this.$createElement('button', {
        staticClass: 'btn',
        'class': isActive || isCurrent ? this.addBackgroundColorClassChecks(classes) : classes,
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: '<span class="btn__content">' + monthName + '</span>'
        },
        on: {
          click: function click() {
            return _this2.monthClick(month);
          }
        }
      })]);
    },
    monthGenTBody: function monthGenTBody() {
      var _this3 = this;

      var children = [];
      var cols = Array(3).fill(null);
      var rows = 12 / cols.length;

      var _loop = function _loop(row) {
        children.push(_this3.$createElement('tr', cols.map(function (_, col) {
          return _this3.monthGenTD(row * cols.length + col);
        })));
      };

      for (var row = 0; row < rows; row++) {
        _loop(row);
      }

      return this.$createElement('tbody', children);
    },
    monthIsActive: function monthIsActive(i) {
      return this.tableYear === this.year && (this.type === 'month' ? this.month : this.tableMonth) === i;
    },
    monthIsCurrent: function monthIsCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === i;
    }
  }
};