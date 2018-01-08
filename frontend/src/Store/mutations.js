import axios from 'axios'

export default {
  getTableData (state, payload) {
    axios({
      method: 'get',
      baseURL: payload.baseUrl + '?offset=' + payload.offset + '&limit=' + payload.rowsPerPage + '&ordering=' + payload.ordering + '&search=' + payload.searchvalue + '&' + payload.field + '=' + payload.value,
      headers: {
        Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3'
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
  getPieData (state) {
    axios.get('http://localhost:8000/api/lead/stats', {
      headers: {
        Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3'
      }
    })
    .then((response) => {
      state.pieData = response.data.results[0]
    })
    .catch((error) => {
      console.log(error)
    })
  },
  getStatsData (state) {
    axios.get('http://localhost:8000/api/lead/stats', {
      headers: {
        Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3'
      }
    })
    .then((response) => {
      console.log(response.data.results[0])
      state.statsData = response.data.results[0]
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  setToken (state, payload) {
    state.token = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}
