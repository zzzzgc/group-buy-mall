// import * as types from './mutation-types'
// 进行涉及到多个全局变量的复杂计算

// export const setOpenId = ({ commit }, { id }) => {
//     commit(types.OPEN_ID, id)
// }

import * as types from './mutation-types'

/**
 * Action 类似于 mutation，不同在于：

 Action 提交的是 mutation，而不是直接变更状态。
 Action 可以包含任意异步操作。

 注意: 调用Action方法会默认注入一个context作为第一个参数
 context中包含commit用于触发mutation,包含state,包含dispatch用于分发Action(可以嵌套调用action的意思)
 相当于可以异步的mutation
 * const store = addAndEdit Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

 小技巧:参数解构(ES5特性)
 actions: {
  increment ({ commit }) {
    commit('increment')
  }
}

 别名
 import { mapActions } from 'vuex'

 export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}

 分发actions
 actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
 */
export default {
  setOpenId: ({ commit }, { id }) => commit(types.SET_OPEN_ID, id),
  setText: ({ commit }, { id }) => commit(types.SET_TEST_TEXT, id)
}
