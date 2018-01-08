import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: null,
    user: null,
    tableData: [],
    totalTableItems: null,
    statsData: [],
    loading: false,
    barData: [],
    pieData: [],
    // pieLegend: null,
    start_date: '',
    end_date: '',
    error: null
  },
  mutations,
  actions,
  getters
})
