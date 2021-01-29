import axios from 'axios'
import qs from 'qs'
import store from '../store/index.js'
const io = axios.create()
io.defaults.timeout = 60000

io.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401: console.log('logout'); break
      case 403: console.log('无权限'); break
      case 404: console.log('not found'); break
      case 502: console.log('部署中'); break
      default : console.log('success'); break
    }
  }
  return Promise.reject(error)
})

io.interceptors.request.use((config) => {
  if (store.state.auth.token) {
    config.headers = {
      Authorization: store.state.auth.token
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

class Axios {
  get (url, params) {
    return io.get(url, params)
  }

  post (url, params = {}, config = {}) {
    if (config.dataType === 'josn') {
      params = qs.stringify(params)
    }
    return io.post(url, params)
  }

  form (url, data) {
    return io.post(url, data)
  }
}

export default new Axios()
