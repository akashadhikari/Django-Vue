export default {
  methods: {
    dateWheelScroll: function dateWheelScroll(e) {
      e.preventDefault();

      this.updateTableMonth(e.deltaY < 0 ? this.tableMonth + 1 : this.tableMonth - 1);
    },
    dateGenTHead: function dateGenTHead() {
      var _this = this;

      var days = this.weekDays.map(function (day) {
        return _this.$createElement('th', day);
      });
      return this.$createElement('thead', this.dateGenTR(days));
    },
    dateClick: function dateClick(day) {
      var _this2 = this;

      this.inputDate = this.sanitizeDateString(this.tableYear + '-' + (this.tableMonth + 1) + '-' + day, 'date');
      this.$nextTick(function () {
        return _this2.autosave && _this2.save();
      });
    },
    dateGenTD: function dateGenTD(day) {
      var _this3 = this;

      var date = this.sanitizeDateString(this.tableYear + '-' + (this.tableMonth + 1) + '-' + day, 'date');
      var buttonText = this.formatters.day(date);
      var isActive = this.dateIsActive(day);
      var isCurrent = this.dateIsCurrent(day);
      var classes = Object.assign({
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': !this.isAllowed(date)
      }, this.themeClasses);

      var button = this.$createElement('button', {
        staticClass: 'btn btn--raised btn--icon',
        'class': isActive || isCurrent ? this.addBackgroundColorClassChecks(classes) : classes,
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: '<span class="btn__content">' + buttonText + '</span>'
        },
        on: {
          click: function click() {
            return _this3.dateClick(day);
          }
        }
      });

      return this.$createElement('td', [button]);
    },

    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth: function weekDaysBeforeFirstDayOfTheMonth() {
      var pad = function pad(n) {
        return n * 1 < 10 ? '0' + n * 1 : '' + n;
      };
      var firstDayOfTheMonth = new Date(this.tableYear + '-' + pad(this.tableMonth + 1) + '-01T00:00:00+00:00');
      var weekDay = firstDayOfTheMonth.getUTCDay();
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
    },
    dateGenTBody: function dateGenTBody() {
      var children = [];
      var daysInMonth = new Date(this.tableYear, this.tableMonth + 1, 0).getDate();
      var rows = [];
      var day = this.weekDaysBeforeFirstDayOfTheMonth();

      for (var i = 0; i < day; i++) {
        rows.push(this.$createElement('td'));
      }

      for (var _i = 1; _i <= daysInMonth; _i++) {
        rows.push(this.dateGenTD(_i));

        if (rows.length % 7 === 0) {
          children.push(this.dateGenTR(rows));
          rows = [];
        }
      }

      if (rows.length) {
        children.push(this.dateGenTR(rows));
      }

      children.length < 6 && children.push(this.dateGenTR([this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })]));

      return this.$createElement('tbody', children);
    },
    dateGenTR: function dateGenTR() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return [this.$createElement('tr', data, children)];
    },
    dateIsActive: function dateIsActive(i) {
      return this.tableYear === this.year && this.tableMonth === this.month && this.day === i;
    },
    dateIsCurrent: function dateIsCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === this.tableMonth && this.currentDay === i;
    }
  }
};