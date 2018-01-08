// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './bootstrap'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import {store} from './Store/store'
import VeeValidate from 'vee-validate'

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'vuetify/src/stylus/main.styl'
// import IEcharts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'

import Form from './utilities/Form'
import Nav from './components/Common/Nav.vue'
import Alert from './components/Common/Alert.vue'
import Bar from './components/Common/Bar.vue'

window.Form = Form
window.axios = axios

// import 'echarts/lib/chart/'
// @import '../../node_modules/vuetify/src/stylus/main'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.use(ECharts)
Vue.use(Vuex)
Vue.component('app-nav', Nav)
Vue.component('app-alert', Alert)
Vue.component('app-bar', Bar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
  // created () {
  //   firebase.initializeApp({
  //     apiKey: 'AIzaSyCrs3MZbjREh_TrfAjOd4vU76_qXU13D0k',
  //     authDomain: 'vue-firebase-df971.firebaseapp.com',
  //     databaseURL: 'https://vue-firebase-df971.firebaseio.com',
  //     projectId: 'vue-firebase-df971',
  //     storageBucket: '',
  //     messagingSenderId: '342709496128'
  //   })
  // }
})
