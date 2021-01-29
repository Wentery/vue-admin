import axios from './axios'

export default {
  login () {
    return axios.post('/api/login').then(res => {
      return Promise.resolve(res.data)
    })
  },
  getMenuList () {
    return axios.get('/api/getLeftMenuList').then(res => {
      return Promise.resolve(res.data)
    })
  },
  getEmployers () {
    return axios.get('/api/employers').then(res => {
      return Promise.resolve(res.data)
    })
  }
}
