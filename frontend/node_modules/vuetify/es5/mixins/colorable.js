export default {
  props: {
    color: String
  },

  data: function data() {
    return {
      defaultColor: null
    };
  },


  computed: {
    computedColor: function computedColor() {
      return this.color || this.defaultColor;
    }
  },

  methods: {
    addBackgroundColorClassChecks: function addBackgroundColorClassChecks() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'computedColor';

      var classes = Object.assign({}, obj);

      if (prop && this[prop]) {
        classes[this[prop]] = true;
      }

      return classes;
    },
    addTextColorClassChecks: function addTextColorClassChecks() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'computedColor';

      var classes = Object.assign({}, obj);

      if (prop && this[prop]) {
        var parts = this[prop].trim().split(' ');

        var color = parts[0] + '--text';

        if (parts.length > 1) color += ' text--' + parts[1];

        classes[color] = !!this[prop];
      }

      return classes;
    }
  }
};