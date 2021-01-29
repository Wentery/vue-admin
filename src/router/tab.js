import Vuex from '../store'

export default {
  /**
   * @pararm label：新开标签名称 *必填
   * @pararm component：标签下需要展示的组件 *必填
   * @pararm query：需要传入组件的参数，如果类似于编辑页面，需要打开多个同组件的情况，必须传入字段id
   * @pararm path：与router/path.js做映射 *必填
   * @pararm isMenu：判断是否菜单打开的tab 如果是菜单必填
  */
  openTab (params) {
    Vuex.commit('pushToTabs', params)
  },
  setTabs (tabs) {
    Vuex.commit('setTabs', tabs)
  }
}
