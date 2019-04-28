// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import input from './utils/input'
import store from './store'
import Axios from 'axios'
import reset from './style/reset.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'  // 引入css
Vue.use(Mint)   // 全局使用
// Vue.use(input)
Vue.config.productionTip = false
Vue.prototype.$axios=Axios
Vue.prototype.$filterNote = (content, length) => {
  let len = 0
  let index = content.length
  let contentTrue = null
  for (let i = 0; i< content.length; i++) {
    if (content.charCodeAt(i) > 127 || content.charCodeAt(i) == 94) {
      len += 2
    } else {
      len ++
    }
    if (len >= length) {
      index = i + 1
      contentTrue = content.substr(0, index).length
      break
    }
  }
  return { content: content.substr(0, index), maxLength: contentTrue }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
