import Vue from 'vue'
import axios from 'axios'
import Form from './utilities/Form'

window.Vue = Vue

window.axios = axios
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

window.Form = Form
