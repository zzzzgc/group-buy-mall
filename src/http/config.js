/*
    fly配置文件
    by:David 2018.6.14
*/
// 引入 fly
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
// import tips from '../common/js/tips'
// tips提示工具类
var tips = require('../common/js/tips')

// 配置请求基地址
// //定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
// //设置超时
fly.config.timeout = 10000
// //设置请求基地址
// fly.config.baseURL="https://wendux.github.io/"
fly.config.baseURL = 'http://localhost:8090/'

// 添加请求拦截器
fly.interceptors.request.use(request => {
  // 加载中...
  tips.default.loading()
  // 给所有请求添加自定义header
  request.headers['X-Tag'] = 'flyio'
  // 打印出请求体
  // console.log(request.body)
  // 终止请求
  // var err=addAndEdit Error("xxx")
  // err.request=request
  // return Promise.reject(addAndEdit Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    // 解除加载中tips
    tips.default.loaded()
    // 只将请求结果的data字段返回
    console.log(response)
    return response.data
  },
  error => {
    tips.default.loaded()
    // TODO 上报错误
    // 发生网络错误后会走到这里
    console.log('报错了', error)
    // return Promise.resolve("ssss")
  }
)
// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly
