import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyHttpServer)
// 日期处理
Vue.filter('fmtdate', (v) => {
  return moment(v * 1000).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
