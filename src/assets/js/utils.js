import { Loading } from 'element-ui'
import Vuex from '../../store/index'

/**
 * 全屏控制
*/
class ScreenController {
  constructor () {
    this.element = document.documentElement
  }

  // 全屏模式
  requestFullScreen () {
    if (this.element.requestFullScreen) {
      this.element.requestFullScreen()
    } else if (this.element.webkitRequestFullScreen) {
      this.element.webkitRequestFullScreen()
    } else if (this.element.mozRequestFullScreen) {
      this.element.mozRequestFullScreen()
    }
  }

  // 退出全屏
  exitFullScreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

class DateFormat {
  getDate (value) {
    const date = new Date(value)
    const year = toString(date.getFullYear())
    let month = toString(date.getMonth() + 1)
    let day = toString(date.getDate())
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return [year, month, day].join('-')
  }

  getDetailDate (value) {
    const date = new Date(value)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }

  getDateArr (value) {
    const date = new Date(value)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec
    return [year, month, day, hour, min, sec]
  }
}
// 加载
class Load {
  constructor () {
    this.loading = null
  }

  start () {
    this.loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  // 关闭loading
  end () {
    this.loading.close()
  }
}

function Auth (code) {
  const noMenus = Vuex.getters.getNoMenus
  if (noMenus) {
    const index = noMenus.findIndex(x => x === code)
    return index > -1
  } else {
    return false
  }
}

function isPhone (phone) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

const screen = new ScreenController()
const format = new DateFormat()
const loading = new Load()
export {
  screen,
  format,
  loading,
  Auth,
  isPhone
}
