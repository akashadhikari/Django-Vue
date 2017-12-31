// Helpers
import { getObjectValueByPath } from '../../../util/helpers';

/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * v-select component
 */
export default {
  methods: {
    getText: function getText(item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue: function getValue(item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    getPropertyFromItem: function getPropertyFromItem(item, field) {
      if (item !== Object(item)) return item;

      var value = getObjectValueByPath(item, field);

      return typeof value === 'undefined' ? item : value;
    },
    compareObjects: function compareObjects(a, b) {
      var aProps = Object.keys(a);
      var bProps = Object.keys(b);

      if (aProps.length !== bProps.length) return false;

      for (var i = 0, length = aProps.length; i < length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) return false;
      }

      return true;
    }
  }
};