import { addOnceEventListener } from './helpers';

/**
 * @mixin
 */
export default {
  mounted: function mounted() {
    var _this = this;

    var setupPointerSupport = function setupPointerSupport(propName, eventName) {
      addOnceEventListener(window, eventName, function () {
        _this.$vuetify[propName] = true;
        var className = 'application--' + propName.replace(/([A-Z])/g, '-$1').toLowerCase();
        document.querySelector('[data-app]').classList.add(className);
      });
    };

    // Adds application--touch-support class
    // after touchstart event is triggered
    setupPointerSupport('touchSupport', 'touchstart');

    // Add application--hover-support class
    // after mouseover event is triggered
    // Useless as per #869 in Modernizr
    // setupPointerSupport('hoverSupport', 'mouseover')
  }
};