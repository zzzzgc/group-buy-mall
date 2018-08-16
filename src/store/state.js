/**
 * store为实例化生成的
 * @type {{openId: string}}
 *
 1. 注册计算属性调用(局部)
 import store from './store'
 const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
   }
  }

 2. 把注册计算属性的组件注册到全局组件中被所有组件调用(全局)
 const app = addAndEdit Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
  })

 3. 注册计算属性调用(常用,局部)<---<---<---<---<---<---<---<---<---<---<---
 const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}

 4. mapState 辅助函数
 // 在单独构建的版本中辅助函数为 Vuex.mapState
 import { mapState } from 'vuex'

 export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 映射 this.count 为 store.state.count<----<----<----<----<----<----<----<----
    'count'

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

 5. 批量调用<---<---<---<---<---
 import { mapState } from 'vuex'

 computed: {
  localComputed () { //other... },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
 */
const state = {
  openId: '初始openId',
  userInfo: {
    avatarUrl: '',
    city: '',
    country: '',
    gender: 0,
    language: '',
    nickName: '',
    province: ''
  }
}

export default state
