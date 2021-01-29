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
      const url = keyPath[keyPath.length - 1]
      const component = path[url]
      const name = this.findName(this.menu, url)
      this.$tab.openTab({
        label: name,
        component,
        query: {},
        path: keyPath
      })
    }
  }
}
