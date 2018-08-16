import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'i-message': '/static/dist/message/index',
      'i-button': '/static/dist/button/index',
      'i-panel': '/static/dist/panel/index',
      'i-input': '/static/dist/input/index',
      'i-col': '/static/dist/col/index',
      'i-cell': '/static/dist/cell/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    navigationBarTitleText: '嘻果CRM'
  }
}
