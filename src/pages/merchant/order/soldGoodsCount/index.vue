<template>
  <div class="container">
    <i-icon size="20" type="prompt"/><span class="text-button-mini">抱歉!该功能正在加速研发中.请返回上一页.</span>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {},
    // 组件注册
    components: {},
    // 侦听属性
    watch: {},
    created () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad () { // vue 初始化加载
      // options = this.$root.$mp.query
      // console.log('page index onLoad', this)
    },
    mounted () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow () { // 小程序页面显示
      // options = this.$root.$mp.appOptions
      // console.log('onShow', this)
    },
    onUnload () { // 小程序页面出栈
      // console.log('onUnload', this)
    },
    onHide () { // 小程序页面隐藏
      // console.log('onHide', this)
    }
  }
</script>

<style lang="scss" scoped>
</style>
