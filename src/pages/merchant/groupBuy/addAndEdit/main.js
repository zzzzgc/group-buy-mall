import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 引入全局插件
    usingComponents: {
      'i-cell-group': '/static/dist/cell-group/index',
      'i-cell': '/static/dist/cell/index',
      'i-panel': '/static/dist/panel/index',
      'i-input': '/static/dist/input/index',
      'i-switch': '/static/dist/switch/index',
      'i-icon': '/static/dist/icon/index',
      'i-button': '/static/dist/button/index',
      'i-drawer': '/static/dist/drawer/index',
      'i-action-sheet': '/static/dist/action-sheet/index',
      'i-input-number': '/static/dist/input-number/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '新建团购'
  }
}
