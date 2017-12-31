export default {
  data: function data() {
    return {
      style: null
    };
  },

  watch: {
    '$vuetify.theme': {
      deep: true,
      handler: function handler() {
        this.applyTheme();
      }
    }
  },

  created: function created() {
    if (typeof document === 'undefined') {
      return this.$ssrContext && this.$ssrContext._styles && (this.$ssrContext._styles['vuetify-theme-stylesheet'] = {
        ids: ['vuetify-theme-stylesheet'],
        css: this.genColors(this.$vuetify.theme),
        media: ''
      });
    }
    this.genStyle();
    this.applyTheme();
  },


  methods: {
    applyTheme: function applyTheme() {
      this.style.innerHTML = this.genColors(this.$vuetify.theme);
    },
    genColors: function genColors(theme) {
      var _this = this;

      var colors = Object.keys(theme).map(function (key) {
        var value = theme[key];

        return _this.genBackgroundColor(key, value) + _this.genTextColor(key, value);
      });

      colors.push(this.genAnchorColor(this.$vuetify.theme.primary));

      return colors.join('');
    },
    genAnchorColor: function genAnchorColor(color) {
      return '.application a{color: ' + color + ';}';
    },
    genBackgroundColor: function genBackgroundColor(key, value) {
      return '.' + key + '{background-color:' + value + ' !important;border-color:' + value + ' !important;}';
    },
    genTextColor: function genTextColor(key, value) {
      return '.' + key + '--text{color:' + value + ' !important;}';
    },
    genStyle: function genStyle() {
      var style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]');

      if (!style) {
        style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
      }

      this.style = style;
    }
  }
};