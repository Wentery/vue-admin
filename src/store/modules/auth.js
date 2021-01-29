const state = {
  token: '',
  info: {},
  title: 'CRM'
}

const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  setInfo (state, info) {
    state.info = info
  }
}

const getters = {
  getToken (state) {
    const token = localStorage.getItem('token')
    if (token) {
      state.token = token
    }
    return state.token
  },
  getInfo (state) {
    return state.info
  }
}

export default {
  state,
  mutations,
  getters
}
