import application from './mixins/application';
import theme from './mixins/theme';

var Vuetify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) return;

    this.installed = true;

    var $vuetify = {};
    Vue.util.defineReactive($vuetify, 'inspire', {
      breakpoint: {},
      application: application,
      dark: false,
      theme: theme(opts.theme),
      touchSupport: false
    });

    Vue.prototype.$vuetify = $vuetify.inspire;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(function (key) {
        var t = opts.transitions[key];
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(function (key) {
        var d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(function (key) {
        var c = opts.components[key];
        Vue.use(c);
      });
    }
  }
};

export default Vuetify;