import { screen } from '@/assets/js/utils'
export default {
  name: 'TheHeader',
  data () {
    return {
      isCollapse: false,
      isFullScreen: false,
      user: {
        name: 'username'
      },
      modal: {
        modalVisible: false,
        form: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },
        rules: {
          oldPassword: [{
            required: true, message: '请输入原始密码', trigger: 'blur'
          }],
          newPassword: [{
            required: true, message: '请输入新密码', trigger: 'blur'
          }],
          repeatPassword: [{
            required: true, message: '请确认密码', trigger: 'blur'
          }]
        }
      }
    }
  },
  watch: {
    isCollapse () {
      this.$emit('on-collapse', this.isCollapse)
    }
  },
  methods: {
    refreshTab () {
      this.$emit('on-refresh')
    },
    toggleScreen () {
      // 切换全屏状态
      if (this.isFullScreen) {
        screen.exitFullScreen()
        this.isFullScreen = false
      } else {
        screen.requestFullScreen()
        this.isFullScreen = true
      }
    },
    /**
     * @param val：0 个人中心，1 修改密码，2 退出登录
    */
    handleSelect (val) {
      switch (val) {
        case '0': console.log('个人中心'); break
        case '1': this.handleChangePassword(); break
        case '2': this.handleLogout(); break
        default: console.log(null); break
      }
    },
    handleChangePassword () {
      this.modal.modalVisible = true
    },
    handleLogout () {
      this.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        sessionStorage.clear()
        this.$store.commit('setTabs', [])
        this.$router.replace('/')
      }).catch(() => {
        console.log('cancel logout')
      })
    },
    changePassword (ele) {
      this.$refs[ele].validate(val => {
        if (val) {
          this.handleSubmit()
        }
      })
    },
    handleSubmit () {
      const params = {}
      const form = JSON.parse(JSON.stringify(this.modal)).form
      Object.keys(form).map(item => {
        params[item] = form[item].trim()
      })
      if (params.newPassword !== params.repeatPassword) {
        this.$message.warning('请再次确认新密码！')
      }
    },
    handleModalClosed () {
      const keys = Object.keys(this.modal.form)
      const obj = {}
      keys.map(item => {
        obj[item] = ''
      })
      this.modal.form = obj
    }
  }
}
