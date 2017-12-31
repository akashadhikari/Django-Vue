import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import 'echarts/lib/chart/pie'
import {store} from './Store/store'

Vue.use(VeeValidate)
Vue.use(Vuetify)
import('vuetify/dist/vuetify.min.css')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
