import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {saveAs} from 'file-saver'
import 'xterm/css/xterm.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  saveAs,
  render: h => h(App)
}).$mount('#app')
