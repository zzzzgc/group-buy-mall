/**
 * 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
 * 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
 * const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

 const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

 const store = addAndEdit Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

 store.state.a // -> moduleA 的状态
 store.state.b // -> moduleB 的状态

 module的mutation 和 getter接受的第一个参数(state)是模块的局部状态对象。

 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState

 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：rootState

 const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}

 // 嵌套模块
 modules: {
        // 继承父模块的命名空间(在全局中) 用stroe.xxx 来获取状态(全局)
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间(在局部中) 用stroe.posts.xxx 来获取状态(局部)
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }

 高级情况查看 @see https://vuex.vuejs.org/zh/guide/modules.html
 * @type {{}}
 */
import * as types from '../mutation-types'
// import mutationsTypes from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
  count: 0
}

// getters
const getters = {
  getCountAddText: (state, getters, rootState, rootGetters) => {
    return state.count
  }
}

// actions
const actions = {
  asyncIncrement ({ dispatch, commit, getters, rootGetters }) {
    commit(types.INCREMENT)
  },
  asyncDecrement ({ dispatch, commit, getters, rootGetters }) {
    commit(types.DECREMENT)
  }
}

// mutations
const mutations = {
  [types.INCREMENT]: state => {
    const obj = state
    obj.count += 1
  },
  [types.DECREMENT]: state => {
    const obj = state
    obj.count -= 1
  }
}

export default {
  // 开启命名空间:test  this.$store.test.count
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
