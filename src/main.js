import Vue from 'vue'
import App from './App'
import store from './store/index'
import { $Toast } from '../static/dist/base/index'
import Tips from './common/js/tips'

// 生产环境
Vue.config.productionTip = false
App.mpType = 'app'

// 定义全局属性
Vue.prototype.$store = store
Vue.prototype.$Toast = $Toast
Vue.prototype.$tips = Tips

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/main',
        text: '调试页面'
      }, {
        pagePath: 'pages/standard/main',
        text: '参考'
      }]
    }
  }
}
