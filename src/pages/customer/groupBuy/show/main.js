import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 引入全局插件
    usingComponents: {
      'i-cell': '/static/dist/cell/index',
      'i-icon': '/static/dist/icon/index',
      'i-button': '/static/dist/button/index',
      'i-drawer': '/static/dist/drawer/index',
      'i-input': '/static/dist/input/index',
      'i-tabs': '/static/dist/tabs/index',
      'i-tab': '/static/dist/tab/index',
      'i-radio-group': '/static/dist/radio-group/index',
      'i-radio': '/static/dist/radio/index',
      'i-panel': '/static/dist/panel/index',
      'i-input-number': '/static/dist/input-number/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '微信标题'
  }
}
