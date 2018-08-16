var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

/**
 * 开发环境配置
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
