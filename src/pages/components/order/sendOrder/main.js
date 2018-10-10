import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 引入全局插件
    usingComponents: {
      'i-button': '/static/dist/button/index',
      'i-tabs': '/static/dist/tabs/index',
      'i-tab': '/static/dist/tab/index',
      'i-input': '/static/dist/input/index',
      'i-drawer': '/static/dist/drawer/index',
      'i-icon': '/static/dist/icon/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '微信标题'
  }
}
