<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <p>
      <button @click="asyncIncrement">+</button>
      <button @click="asyncDecrement">-</button>
    </p>
    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
// import mutationTypes from '../../store/mutation-types'
// import mutationTypes from '@/store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('test')

export default {
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
  methods: {
    ...mapMutations({
      increment: 'increment',
      decrement: 'decrement'
    }),
    ...mapActions(['asyncIncrement', 'asyncDecrement'])
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
