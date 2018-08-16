import * as types from './mutation-types'

/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 * 用来书写修改state状态的修改方法集合
 * 方法名统一从mutation-types.js获取
 * 书写格式为:
 * [方法名](参数1,参数2...){方法}
 * @type {{[p: string]: *}}
 *
 * 注意:mutation 必须是同步函数,调用mutations方法会默认注入一个state作为第一个参数
 *
 * 设置方式
 * const store = addAndEdit Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

 调用方式
 store.commit('increment')

 载荷(带参数)
 mutations: {
  increment (state, n) {
    state.count += n
  }
}

 store.commit('increment', 10)
 或者
 store.commit({
  type: 'increment',
  amount: 10
})

 映射为
 import { mapMutations } from 'vuex'

 export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}

 */
const mutations = {
  // [方法名](参数1,参数2...){方法}
  [types.SET_OPEN_ID] (state, v) {
    state.openId = v
  },
  [types.SET_TEST_TEXT] (state, text) {
    state.testText = text
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default mutations
