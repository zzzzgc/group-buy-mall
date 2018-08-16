import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 引入全局插件
    usingComponents: {
      'i-icon': '/static/dist/icon/index',
      'i-cell-group': '/static/dist/cell-group/index',
      'i-panel': '/static/dist/panel/index',
      'i-cell': '/static/dist/cell/index',
      'i-radio': '/static/dist/radio/index',
      'i-radio-group': '/static/dist/radio-group/index',
      'i-button': '/static/dist/button/index',
      'i-avatar': '/static/dist/avatar/index',
      'i-collapse-item': '/static/dist/collapse-item/index',
      'i-collapse': '/static/dist/collapse/index',
      'i-input': '/static/dist/input/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '团购订单'
  }
}
