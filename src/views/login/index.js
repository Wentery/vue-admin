import path from '@/router/path'
export default {
  name: 'LoginView',
  data () {
    return {
      form: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  computed: {
    title () {
      return this.$store.state.auth.title
    }
  },
  methods: {
    async handleLogin () {
      const params = JSON.parse(JSON.stringify(this.form))
      const formData = new FormData()
      Object.keys(params).map(item => {
        formData.append(item, params[item])
      })
      this.$api.login(formData).then(res => {
        if (res.status === 200) {
          this.getMenu()
          const token = res.token
          this.$store.commit('setToken', token)
          this.$router.replace('/home')
        } else {
          // this.$message.error(res.message)
        }
      }).catch(rej => {
        console.log(rej)
      })
    },
    getMenu () {
      this.$api.getMenuList().then(res => {
        if (res.status === 200) {
          const firstTab = res.data[0].menus[0]
          const url = firstTab.url
          const component = path[url]
          const tab = {
            label: firstTab.name,
            component,
            query: {},
            path: url,
            isMenu: true
          }
          this.$tab.openTab(tab)
        } else {
          this.$message.error(res.message || res.msg)
        }
      }).catch(rej => {
        console.log(rej)
      })
    }
  }
}
