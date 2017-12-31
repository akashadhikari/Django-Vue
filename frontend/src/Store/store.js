import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tableData: [],
    totalTableItems: null,
    loading: true,
    pieData: [],
    pieLegend: null,
    statsData: [],
    start_date: '',
    end_date: ''
  },
  mutations,
  actions
})
