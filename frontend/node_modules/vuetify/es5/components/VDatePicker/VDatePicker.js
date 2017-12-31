var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('../../../src/stylus/components/_pickers.styl');
require('../../../src/stylus/components/_date-picker.styl');

import { createRange } from '../../util/helpers';

import DateYears from './mixins/date-years';
import DateTitle from './mixins/date-title';
import DateHeader from './mixins/date-header';
import DateTable from './mixins/date-table';
import MonthTable from './mixins/month-table';
import Picker from '../../mixins/picker';
import VBtn from '../VBtn';
import VCard from '../VCard';
import VIcon from '../VIcon';

import Touch from '../../directives/touch';

var pad = function pad(n) {
  return n * 1 < 10 ? '0' + n * 1 : '' + n;
};

export default {
  name: 'v-date-picker',

  components: {
    VBtn: VBtn,
    VCard: VCard,
    VIcon: VIcon
  },

  mixins: [Picker, DateYears, DateTitle, DateHeader, DateTable, MonthTable],

  directives: { Touch: Touch },

  data: function data() {
    var now = new Date();
    return {
      activePicker: this.type.toUpperCase(),
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isReversing: false,
      originalDate: this.value,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: this.type === 'month' ? '' + now.getFullYear() : now.getFullYear() + '-' + (now.getMonth() + 1)
    };
  },


  props: {
    allowedDates: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: null
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: null
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'date',
      validator: function validator(type) {
        return ['date', 'month' /*, 'year'*/].includes(type);
      }
    },
    value: String,
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: null
    },
    yearIcon: String
  },

  computed: {
    weekDays: function weekDays() {
      var _this = this;

      var first = parseInt(this.firstDayOfWeek, 10);

      return this.formatters.weekDay ? createRange(7).map(function (i) {
        return _this.formatters.weekDay('2017-01-' + (first + i + 15));
      }) // 2017-01-15 is Sunday
      : createRange(7).map(function (i) {
        return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7];
      });
    },
    firstAllowedDate: function firstAllowedDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();

      if (this.allowedDates) {
        for (var date = now.getDate(); date <= 31; date++) {
          var dateString = year + '-' + (month + 1) + '-' + date;
          if (isNaN(new Date(dateString).getDate())) break;

          var sanitizedDateString = this.sanitizeDateString(dateString, 'date');
          if (this.isAllowed(sanitizedDateString)) {
            return sanitizedDateString;
          }
        }
      }

      return this.sanitizeDateString(year + '-' + (month + 1) + '-' + now.getDate(), 'date');
    },
    firstAllowedMonth: function firstAllowedMonth() {
      var now = new Date();
      var year = now.getFullYear();

      if (this.allowedDates) {
        for (var month = now.getMonth(); month < 12; month++) {
          var dateString = year + '-' + (month + 1);
          var sanitizedDateString = this.sanitizeDateString(dateString, 'month');
          if (this.isAllowed(sanitizedDateString)) {
            return sanitizedDateString;
          }
        }
      }

      return this.sanitizeDateString(year + '-' + (now.getMonth() + 1), 'month');
    },

    // inputDate MUST be a string in ISO 8601 format (including leading zero for month/day)
    // YYYY-MM for month picker
    // YYYY-MM-DD for date picker
    inputDate: {
      get: function get() {
        if (this.value) {
          return this.sanitizeDateString(this.value, this.type);
        }

        return this.type === 'month' ? this.firstAllowedMonth : this.firstAllowedDate;
      },
      set: function set(value) {
        var date = value == null ? this.originalDate : this.sanitizeDateString(value, this.type);
        this.$emit('input', date);
      }
    },
    day: function day() {
      return this.inputDate.split('-')[2] * 1;
    },
    month: function month() {
      return this.inputDate.split('-')[1] - 1;
    },
    year: function year() {
      return this.inputDate.split('-')[0] * 1;
    },
    tableMonth: function tableMonth() {
      return this.tableDate.split('-')[1] - 1;
    },
    tableYear: function tableYear() {
      return this.tableDate.split('-')[0] * 1;
    },
    computedTransition: function computedTransition() {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition';
    },
    formatters: function formatters() {
      return {
        day: this.dayFormat || this.createNativeLocaleFormatter(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 }),
        headerDate: this.headerDateFormat || this.createNativeLocaleFormatter(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 }),
        month: this.monthFormat || this.createNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 }),
        year: this.yearFormat || this.createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        weekDay: this.createNativeLocaleFormatter(this.locale, { weekday: 'narrow', timeZone: 'UTC' }),
        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter
      };
    },
    defaultTitleDateFormatter: function defaultTitleDateFormatter() {
      var titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      };

      var titleDateFormatter = this.createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      });

      var landscapeFormatter = function landscapeFormatter(date) {
        return titleDateFormatter(date).replace(/([^\d\s])([\d])/g, function (match, nonDigit, digit) {
          return nonDigit + ' ' + digit;
        }).replace(', ', ',<br>');
      };

      return this.landscape ? landscapeFormatter : titleDateFormatter;
    }
  },

  watch: {
    activePicker: function activePicker(val, prev) {
      var _this2 = this;

      if (val !== 'YEAR') return;

      // That's a quirk, setting timeout stopped working after fixing #1649
      // It worked but for timeouts significantly longer than the transition duration
      var interval = setInterval(function () {
        if (_this2.$refs.years) {
          _this2.$refs.years.scrollTop = _this2.$refs.years.scrollHeight / 2 - 125;
          clearInterval(interval);
        }
      }, 100);
    },
    tableDate: function tableDate(val, prev) {
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      var sanitizeType = this.type === 'month' ? 'year' : 'month';
      this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType);
    },
    value: function value(val) {
      if (val) {
        this.tableDate = this.type === 'month' ? '' + this.year : this.year + '-' + (this.month + 1);
      }
    },
    type: function type(val) {
      if (val === 'month' && this.activePicker === 'DATE') {
        this.activePicker = 'MONTH';
      } else if (val === 'year') {
        this.activePicker = 'YEAR';
      }
    }
  },

  methods: {
    save: function save() {
      if (this.originalDate) {
        this.originalDate = this.value;
      } else {
        this.originalDate = this.inputDate;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel: function cancel() {
      this.inputDate = this.originalDate;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    isAllowed: function isAllowed(date) {
      if (!this.allowedDates) return true;

      // date parameter must be in ISO 8601 format with leading zero
      // If allowedDates is an array its values must be in ISO 8601 format with leading zero
      // If allowedDates is on object its min/max properties must be in ISO 8601 with leading zero
      if (Array.isArray(this.allowedDates)) {
        return this.allowedDates.indexOf(date) > -1;
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date);
      } else if (this.allowedDates instanceof Object) {
        var min = this.allowedDates.min;
        var max = this.allowedDates.max;
        return (!min || min <= date) && (!max || max >= date);
      }

      return true;
    },
    genTableTouch: function genTableTouch(touchCallback) {
      return {
        name: 'touch',
        value: {
          left: function left(e) {
            return e.offsetX < -15 && touchCallback(1);
          },
          right: function right(e) {
            return e.offsetX > 15 && touchCallback(-1);
          }
        }
      };
    },
    genTable: function genTable(tableChildren, touchCallback) {
      var wheel = this.activePicker === 'MONTH' ? this.monthWheelScroll : this.dateWheelScroll;
      var options = {
        staticClass: 'picker--date__table',
        'class': {
          'picker--month__table': this.activePicker === 'MONTH'
        },
        on: this.scrollable ? { wheel: wheel } : undefined,
        directives: [this.genTableTouch(touchCallback)]
      };

      var table = this.$createElement('table', {
        key: this.activePicker === 'MONTH' ? this.tableYear : this.tableMonth
      }, tableChildren);

      return this.$createElement('div', options, [this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [table])]);
    },
    genPickerBody: function genPickerBody(h) {
      var _this3 = this;

      var pickerBodyChildren = [];
      if (this.activePicker === 'DATE') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]));
        pickerBodyChildren.push(this.genTable([this.dateGenTHead(), this.dateGenTBody()], function (value) {
          return _this3.updateTableMonth(_this3.tableMonth + value);
        }));
      } else if (this.activePicker === 'MONTH') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]));
        pickerBodyChildren.push(this.genTable([this.monthGenTBody()], function (value) {
          return _this3.tableDate = '' + (_this3.tableYear + value);
        }));
      } else if (this.activePicker === 'YEAR') {
        pickerBodyChildren.push(this.genYears());
      }

      return pickerBodyChildren;
    },
    createNativeLocaleFormatter: function createNativeLocaleFormatter(locale, options) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { start: 0, length: 0 },
          start = _ref.start,
          length = _ref.length;

      var makeIsoString = function makeIsoString(dateString) {
        var _dateString$trim$spli = dateString.trim().split(' ')[0].split('-'),
            _dateString$trim$spli2 = _slicedToArray(_dateString$trim$spli, 3),
            year = _dateString$trim$spli2[0],
            month = _dateString$trim$spli2[1],
            date = _dateString$trim$spli2[2];

        return [year, pad(month || 1), pad(date || 1)].join('-');
      };

      try {
        var intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);
        return function (dateString) {
          return intlFormatter.format(new Date(makeIsoString(dateString) + 'T00:00:00+00:00'));
        };
      } catch (e) {
        return start || length ? function (dateString) {
          return makeIsoString(dateString).substr(start, length);
        } : null;
      }
    },

    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString: function sanitizeDateString(dateString, type) {
      var _dateString$split = dateString.split('-'),
          _dateString$split2 = _slicedToArray(_dateString$split, 3),
          year = _dateString$split2[0],
          month = _dateString$split2[1],
          date = _dateString$split2[2];

      return (year + '-' + pad(month) + '-' + pad(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
    },

    // For month = 12 it sets the tableDate to January next year
    // For month = -1 it sets the tableDate to December previous year
    // Otherwise it just changes the table month
    updateTableMonth: function updateTableMonth(month /* -1..12 */) {
      if (month === 12) {
        this.tableDate = this.tableYear + 1 + '-01';
      } else if (month === -1) {
        this.tableDate = this.tableYear - 1 + '-12';
      } else {
        this.tableDate = this.tableYear + '-' + (month + 1);
      }
    }
  },

  created: function created() {
    this.tableDate = this.type === 'month' ? '' + this.year : this.year + '-' + (this.month + 1);
  },
  mounted: function mounted() {
    var date = new Date();
    this.currentDay = date.getDate();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  },
  render: function render(h) {
    var children = [];

    !this.noTitle && children.push(this.genTitle(this.formatters.titleDate(this.inputDate)));

    children.push(h('transition', {
      props: {
        origin: 'center center',
        mode: 'out-in',
        name: 'scale-transition'
      }
    }, [h('div', {
      staticClass: 'picker__body',
      key: this.activePicker
    }, this.genPickerBody(h))]));

    this.$scopedSlots.default && children.push(this.genSlot());

    return h('v-card', {
      staticClass: 'picker picker--date',
      'class': _extends({
        'picker--landscape': this.landscape
      }, this.themeClasses)
    }, children);
  }
};