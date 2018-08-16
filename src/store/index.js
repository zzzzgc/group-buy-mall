import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// module
import test from './module/test'
import group from './module/group'

Vue.use(Vuex)

/**
 * 调用格式
 *
 */

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    test,
    group
    // 插入单独模块的store对象,模板 @see src\components\store\baseStore.js
  },
  // 严格模式,可以在控制台查看状态树,不可以在生产环境开启
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    // 引入vuex-persistedstate，将vuex的数据持久化到本地
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {}
        // removeItem: key => wx.createStorage()
      }
    })
  ]
})
