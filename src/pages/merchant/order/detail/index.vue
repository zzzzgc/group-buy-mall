<template>
  <div class="container">
    {{orderId}}
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        orderId: '',
        createDate: '2018-08-17 13:55',
        detail: {
          logisticsInfo: {
            name: 'asdf',
            phone: '18718840426',
            noutoasiakas: {
              name: '张家路口',
              address: '广州市白云区拉斯卡的解放军拉萨打开解放流口水的房间拉萨的看风景拉萨的看风景拉斯达克放假'
            },
            merchantRemark: '客户备注',
            customerRemark: '商家备注',
            productTotalPrice: 225546.45,
            product: [
              {
                name: '测试商品1',
                imageUrl: '',
                price: 12.55,
                number: 12
              },
              {
                name: '测试商品1',
                imageUrl: '',
                price: 12.55,
                number: 12
              },
              {
                name: '测试商品1',
                imageUrl: '',
                price: 12.55,
                number: 12
              },
              {
                name: '测试商品1',
                imageUrl: '',
                price: 12.55,
                number: 12
              }
            ]
          }
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      getData: function (orderId) {
      }
    },
    // 组件注册
    component: {},
    // 侦听属性
    watch: {},
    created () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad () { // vue 初始化加载
      // options = this.$root.$mp.query
      this.orderId = this.$mp.query.orderId
      this.getData(this.orderId)
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
