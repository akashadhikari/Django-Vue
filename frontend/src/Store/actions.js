import axios from 'axios'

export default {
  getTableData (context, payload) {
    context.commit('getTableData', payload)
  },
  // getPieData (context, payload) {
  //   context.commit('getPieData', payload)
  // },
  getStatsData (context) {
    context.commit('getStatsData')
  },
  logUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    let username = payload.username
    let password = payload.password
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api-token-auth/',
      data: {
        username,
        password
      },
      headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
    }
    )
    .then((response) => {
      console.log(response)
      commit('setLoading', false)
      const newToken = {
        token: response.data.token
      }
      commit('setToken', newToken)
      commit('setUser', payload.username)
    })
    .catch(error => {
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
    })
  },
  clearError ({commit}) {
    commit('clearError')
  },
  logout ({commit}) {
    commit('setToken', null)
  }
}
