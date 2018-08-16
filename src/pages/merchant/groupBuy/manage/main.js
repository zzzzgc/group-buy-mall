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
      'i-cell': '/static/dist/cell/index',
      'i-tabs': '/static/dist/tabs/index',
      'i-button': '/static/dist/button/index',
      'i-swipeout': '/static/dist/swipeout/index',
      'i-row': '/static/dist/row/index',
      'i-col': '/static/dist/col/index',
      'i-tab': '/static/dist/tab/index'
    },
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    // 标题
    navigationBarTitleText: '团购管理'
  }
}
