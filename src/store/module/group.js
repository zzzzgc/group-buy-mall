// import * as types from '../mutation-types'

const state = {
  // 约定:状态码等于数组下标
  groupBuyStatus: [
    '未开始',
    '进行中',
    '已结束'
  ]
}

// getters
const getters = {
  getGroupBuyStatus: (state, getters, rootState, rootGetters) => {
    return state.groupBuyStatus
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  // 开启命名空间:test  this.$store.test.count
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
