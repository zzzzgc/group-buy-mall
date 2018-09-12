var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

/**
 * 开发环境配置
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PACKAGE_NAME: 'dev_package',
  HOST: '"http://127.0.0.1:8100"',
  FILE_UPLOAD_URL: '"http://127.0.0.1:8100/file"'
})
