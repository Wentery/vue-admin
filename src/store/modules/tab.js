import { Message } from 'element-ui'
const tabs = sessionStorage.getItem('tabs')

function addRefresh (data) {
  data.forEach(item => {
    if (typeof item.refresh === 'undefined') {
      item.refresh = false
    }
  })
  return data
}
function setActiveIndex (state, index) {
  state.activeIndex = String(index)
  sessionStorage.setItem('activeIndex', index)
}
function setActivePath (state, path) {
  sessionStorage.setItem('activePath', path)
  state.activePath = path
}
const state = {
  tabs: tabs ? JSON.parse(tabs) : [],
  activeIndex: '0',
  activePath: ''
}

const mutations = {
  setTabs (state, tabs) {
    tabs = addRefresh(tabs)
    state.tabs = tabs
    sessionStorage.setItem('tabs', JSON.stringify(tabs))
  },
  pushToTabs (state, tab) {
    if (state.tabs.length === 20) {
      Message.warning('打开的tab不能超过20个，请先关闭其他tab')
      return
    }
    const id2 = tab.query !== undefined ? tab.query.id : undefined
    const index = state.tabs.findIndex(x => {
      const id = x.query !== undefined ? x.query.id : undefined
      return id === id2 && x.component === tab.component
    })
    const item = index !== -1 ? state.tabs[index] : null
    if (!item) {
      state.tabs.push(tab)
    } else {
      state.tabs[index] = tab
      state.tabs[index].refresh = false
      setActiveIndex(state, index)
    }
    setActivePath(state, tab.path)
    state.tabs = addRefresh(state.tabs)
    sessionStorage.setItem('tabs', JSON.stringify(state.tabs))
  },
  setActiveIndex (state, index) {
    sessionStorage.setItem('activeIndex', index)
    state.activeIndex = index
  },
  setActivePath (state, path) {
    sessionStorage.setItem('activePath', path)
    state.activePath = path
  }
}

const getters = {
  getTabs (state) {
    const tabs = sessionStorage.getItem('tabs')
    if (tabs) {
      state.tabs = JSON.parse(tabs)
    }
    return state.tabs
  },
  getActiveIndex (state) {
    const index = sessionStorage.getItem('activeIndex')
    if (index !== null) {
      state.activeIndex = index
    }
    return state.activeIndex
  },
  getActivePath (state) {
    const path = sessionStorage.getItem('activePath')
    if (path !== null) {
      state.activePath = path
    }
    return state.activePath
  }
}

export default {
  state,
  mutations,
  getters
}
