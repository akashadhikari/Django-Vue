export default {
  getTableData (context, payload) {
    context.commit('getTableData', payload)
  },
  getPieData (context, payload) {
    context.commit('getPieData', payload)
  },
  getStatsData (context, payload) {
    context.commit('getStatsData', payload)
  }
}
