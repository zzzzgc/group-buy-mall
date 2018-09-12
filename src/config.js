// 配置

const timeout = 10000
// 微信appid
const appid = ''
// 微信key?不放这
const appKey = ''

// 访问站点
const host = process.env.HOST
const fileUpdateUrl = process.env.FILE_UPLOAD_URL

// const host = 'https://group.52xiguo.com'
// const fileUpdateUrl = 'https://group.52xiguo.com/file'

// const host = 'http://120.79.173.122:8100'
// const fileUpdateUrl = 'http://120.79.173.122:8100/file'

const config = {
  host,
  timeout,
  appid,
  appKey,
  fileUpdateUrl
}
export default config
