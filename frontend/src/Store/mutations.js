import axios from 'axios'
export default {
  getTableData (state, payload) {
    axios({
      method: 'get',
      baseURL: payload.baseUrl + '/?offset=' + payload.offset + '&limit=' + payload.rowsPerPage + '&ordering=' + payload.ordering + '&search=' + payload.searchvalue + '&' + payload.field + '=' + payload.value,
      headers: {
        Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10'
      }
    })
    .then((response) => {
      state.tableData = response.data.results
      state.totalTableItems = response.data.count
      state.loading = false
    })
    .catch((error) => {
      console.log(error)
      state.loading = false
    })
  },
  getPieData (state, payload) {
    axios.get('http://localhost:8000/api/' + payload.chartOf + '/pi-chart/', {
      params: {
        field: payload.field
      },
      headers: {
        Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10'
      }
    })
    .then((response) => {
      state.pieLegend = response.data[payload.field].legend
      state.pieData = response.data[payload.field].pi
    })
    .catch((error) => {
      console.log(error)
    })
  },
  getStatsData (state, payload) {
    axios.get('http://localhost:8000/api/' + payload.statsFor + '/stats/', {
      params: {
        field: payload.field,
        start_date: state.start_date,
        end_date: state.end_date
      },
      headers: {
        Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10'
      }
    })
    .then((response) => {
      state.statsData = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
