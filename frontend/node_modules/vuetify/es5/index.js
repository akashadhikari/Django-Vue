var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./stylus/app.styl');
import Semver from 'semver';
import { peerDependencies, version } from '../package.json';
import * as components from './components';
import * as directives from './directives';

function Vuetify(Vue, args) {
  var Vuetify = components.Vuetify;

  Vue.use(Vuetify, _extends({
    components: components,
    directives: directives
  }, args));
}

Vuetify.version = version;

function checkVueVersion() {
  var vueDep = peerDependencies.vue;
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    console.warn('Vuetify requires Vue version ' + vueDep);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion();
  window.Vue.use(Vuetify);
}

export default Vuetify;