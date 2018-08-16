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
      'i-input': '/static/dist/input/index',
      'i-radio-group': '/static/dist/radio-group/index',
      'i-radio': '/static/dist/radio/index',
      'i-swipeout': '/static/dist/swipeout/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '团购详细'
  }
}
