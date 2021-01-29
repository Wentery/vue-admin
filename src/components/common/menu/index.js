import path from '@/router/path'
export default {
  name: 'Menu',
  props: {
    isCollapse: Boolean,
    uniqueOpened: Boolean,
    menu: Array
  },
  data () {
    return {

    }
  },
  computed: {
    defaultActive () {
      return this.$store.getters.getActivePath
    },
    title () {
      return this.$store.state.auth.title
    },
    tabs () {
      return this.$store.getters.getTabs
    }
  },
  methods: {
    findName (data, path) {
      let name = ''
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.url === path) {
          name = item.name
          break
        } else if (Array.isArray(item.children) && item.children.length > 0) {
          name = this.findName(item.children, path) !== '' ? this.findName(item.children, path) : name
        }
      }
      return name
    },
    handleSelect (key, keyPath) {
      const url = key
      const component = path[url]
      const name = this.findName(this.menu, url)
      const index = this.tabs.findIndex(x => x.component === component && x.isMenu)
      this.$tab.openTab({
        label: name, // 新开标签名称 *必填
        component, // 标签下需要展示的组件 *必填
        query: {
          num: Math.random()
        }, // 需要传入组件的参数，如果类似于编辑页面，需要打开多个同组件的情况，必须传入字段id
        path: url, // 与router/path.js做映射 *必填
        isMenu: true // 判断是否菜单打开的tab 如果是菜单必填
      })
      if (index > -1) {
        this.$store.commit('setActiveIndex', String(index))
      }
      this.$store.commit('setActivePath', url)
    }
  }
}
