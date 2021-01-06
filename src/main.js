import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueLazyload)

Vue.prototype.$bus = new Vue
new Vue({
  render: h => h(App),
  store,
  router
  
}).$mount('#app')
