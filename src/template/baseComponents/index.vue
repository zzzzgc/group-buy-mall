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
        detail: {}
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      getData: function () {
        this.detail = {}
        // TODO 通过服务加载数据,根据openId(研发中)
      }
    },
    // 组件注册
    component: {},
    // 侦听属性
    watch: {},
    created: function () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad: function () { // vue 初始化加载
      this.getData()
      // options = this.$root.$mp.query
      // options = this.$mp.query.xxx
      // console.log('page index onLoad', this)
    },
    mounted: function () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow: function () { // 小程序页面显示
      // options = this.$root.$mp.appOptions
      // console.log('onShow', this)
    },
    onUnload: function () { // 小程序页面出栈
      // console.log('onUnload', this)
    },
    onHide: function () { // 小程序页面隐藏
      // console.log('onHide', this)
    }
  }
</script>

<style lang="scss" scoped>
</style>
