/*
    fly配置文件
    by:David 2018.6.14
    规范:
      1. spring data rest 请求 统一放在api 的 portApi 中
      2. 服务端请求 统一放在api 的 restfulApi 中
      3. 响应信息状态码
        * 为 2** 统一视为请求成功,内容直接是数据
        * 为 4** 和 5** 统一视为请求失败,响应信息直接是错误提示
*/

// 引入主配置
import config from '../config'

const host = config.host

// 引入 fly
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

// 引入tips提示工具类
var tips = require('../common/js/tips')

// fly.config.headers={xx:5,bb:6,dd:7} // 定义公共headers
// 设置超时
fly.config.timeout = config.timeout
// 设置请求基地址
fly.config.baseURL = host

// 添加请求拦截器
fly.interceptors.request.use(request => {
  /**
   * {
        baseURL,  //请求的基地址
        body, //请求的参数
        headers, //自定义的请求头
        method, // 请求方法
        timeout, //本次请求的超时时间
        url, // 本次请求的地址
        withCredentials //跨域请求是否发送第三方cookie
      }
   */
  let sessionId = wx.getStorageSync('sessionId')
  tips.default.loading()
  // 给所有请求添加自定义header
  // request.headers['token'] = ''
  if (sessionId) {
    request.headers['Cookie'] = sessionId
  }
  // console.log('发起请求', request)
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
    /**
     * {
          data, //服务器返回的数据
          engine, //请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
          headers, //响应头信息
          request  //本次响应对应的请求信息
        }
     */
    // 只将请求结果的data字段返回
    // console.log('收到响应', response)
    tips.default.loaded()
    // http请求的状态成功,但是内容的状态是由服务器决定的
    // 200 201 204   2**成功  3**重定向  4**客户端异常  5**服务端异常
    // if (serviceData.code === 0) {
    //   // 成功,返回内容
    //   return serviceData.data
    // } else {
    //   tips.default.toast(serviceData.msg || '访问异常,请稍后重试', 'none', 2500)
    //   // 失败,回馈请求失败
    //   return Promise.reject(serviceData.msg)
    // }
    return response.data
  },
  error => {
    /**
     * {
          message:"Not Find 404", //错误消息
          status:404, //如果服务器可通，则为http请求状态码。网络异常时为0，网络超时为1
          request:{...}, //对应的请求信息
          response:{}, //响应信息
          engine:{}//请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
        }
     */
    // 解除加载中tips
    tips.default.loaded()
    // TODO 上报错误
    console.log('报错了', error)
    if (error.response.data === '' || !error.response.data) {
      tips.default.toast('网络延迟,请稍后再试', 'none', 2500)
    } else {
      if (error.response.data instanceof Object) {
        tips.default.toast(error.response.data.message, 'none', 3000)
      } else {
        tips.default.toast(error.response.data, 'none', 2500)
      }
    }
    // return Promise.resolve('info')
  }
)

// 将fly实例挂在vue原型上
// Vue.prototype.$http=fly

export default fly
