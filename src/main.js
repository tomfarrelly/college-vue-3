/**
 * @Author: tomfarrelly
 * @Date:   2021-03-02T08:57:30+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-21T04:09:51+01:00
 */



import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
