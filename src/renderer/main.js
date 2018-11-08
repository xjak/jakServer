import Vue from 'vue'
import axios from 'axios'
import fs from 'fs'

import App from './App'
import router from './router'
// import store from './store'

import {api} from './assets/config'
require('./style/init.css')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$axios = axios
Vue.prototype.$fs = fs
Vue.prototype.$api = api
Vue.prototype.$path = api.path // 路径
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')
