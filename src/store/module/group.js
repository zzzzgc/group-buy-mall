// import * as types from '../mutation-types'

const state = {
  // 约定:状态码等于数组下标
  status: [
    '未开始',
    '进行中',
    '已结束'
  ],
  orderDeliverStatus: [
    '未发货',
    '已发货'
  ]
}

// getters
const getters = {
  getGroupBuyStatus: (state, getters, rootState, rootGetters) => {
    return state.status
  },
  getOrderDeliverStatus: function (state, getters, rootState, rootGetters) {
    return state.orderDeliverStatus
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
