// 用gettter取数据到组件里,是数据的映射

// // getter可充当计算属性
// export const currentSong = (state) => {
//     return state.playlist[state.currentIndex] || {}
// }

/**
 * store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
 * Getter 接受 state 作为其第一个参数
 * const store = addAndEdit Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(t odo => t odo.done)
    }
  }
})
 调用:

 其他参数在第一个参数之后
 getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(t odo => t odo.id === id)
  }
}
 调用: store.getters.getTodoById(2)
 */
export default {
  openId: state => state.openId,
  userType: state => state.userType,
  userId: state => state.userId
}
