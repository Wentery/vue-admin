import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import tab from './router/tab'
import ElementUI from 'element-ui'
import VueParticles from 'vue-particles'
// css/scss
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/scss/element-variables.scss'
import './assets/scss/base.scss'
require('./mock')
Vue.prototype.$api = api
Vue.prototype.$tab = tab
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
