<template>
  <div class="container">
    <!--<i-icon size="20" type="prompt"/><span class="text-button-mini">商品详细页</span>-->
    <!--商品轮播图展示-->
    <swiper style="width: 100%;" indicator-dots="true">
      <div style="width: 100%" v-for="(image, imageIndex) in detail.groupBuyProduct.groupBuyProductImages"
           :key="imageIndex">
        <swiper-item style="width: 100%;">
          <image :src="image.url"  style="width: 100%" mode="aspectFill"/>
        </swiper-item>
      </div>
    </swiper>
    <!--商品信息展示和下单按钮-->
    <div style="width: 100%">
      <i-panel title="商品信息">
        <div style="display: flex;flex-flow: column nowrap;justify-content: center;align-items: center">
          <!--商品名称-->
          <span>{{detail.groupBuyProduct.name}}</span>
          <!--商品价格-->
          <div>
            <span style="color: red">{{detail.groupBuyProduct.price}}￥</span>
          </div>
        </div>
      </i-panel>
      <!--数量选择和下单按钮-->
      <div v-if="canSell">
        <i-panel title="快速下单">
          <div style="display: flex;flex-flow: row nowrap;justify-content: center;align-items: center">
            <div style="width: 50%;display: flex;flex-flow: row nowrap;justify-content: center;align-items: center">
              <i-input-number
                :value="detail.groupBuyProduct.number" min="0"
                :max="detail.groupBuyProduct.limitQuantity == 0 ? detail.groupBuyProduct.inventory - detail.groupBuyProduct.sellTotalNumber:9999"
                @change="handleProductNumberChange"/>
            </div>
            <div style="width: 50%">
              <i-button :disabled="!detail.groupBuyProduct.number>0" type="primary" long="true" @click="handlesSendOrder">立即下单</i-button>
            </div>
          </div>
        </i-panel>
      </div>
      <div v-else>
        <i-panel title="快速下单">
          <span style="text-indent:25px" class="text-info"><p>商品已被抢完了.下次再来吧</p></span>
        </i-panel>
      </div>
    </div>
    <!--商品详细图展示 暂时和轮播图内容相同-->
    <div style="width: 100%">
      <i-panel title="商品描述">
        <span style="text-indent:25px" class="text-title">
          <p>{{detail.groupBuyProduct.descriptor}}</p>
        </span>
      </i-panel>
    </div>
    <div style="width: 100%">
      <i-panel title="商品详细">
        <div style="width: 100%" v-for="(image, imageIndex) in detail.groupBuyProduct.groupBuyProductImages"
             :key="imageIndex">
            <image :src="image.url" style="width: 100%" mode="aspectFill"/>
        </div>
      </i-panel>
    </div>

    <!--下单组件 TODO 下单组件需要组件化-->
    <div style="width: 100%"></div>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        canSell: false,
        groupBuyId: 0,
        groupBuyProductId: 0,
        detail: {
          groupBuyProduct: {
            name: '',
            price: 0,
            descriptor: '',
            limitQuantity: false,
            number: 0,
            quantity: 0,
            sellTotalNumber: 0,
            groupBuyProductImages: [
              {
                url: ''
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
      // 获取初始化数据
      getData: function (groupBuyProductId) {
        this.$portApi.product.toGroupBuyProductImageById(groupBuyProductId).then(
          (groupBuyProduct) => {
            this.detail.groupBuyProduct = groupBuyProduct
            this.$set(this.detail.groupBuyProduct, 'number', 0)
            this.canSell = ((this.detail.groupBuyProduct.inventory - this.detail.groupBuyProduct.sellTotalNumber) > 1 || this.detail.groupBuyProduct.limitQuantity)
          }
        )
      },
      // 选择提交订单
      handlesSendOrder: function ({mp}) {
        console.log('提交订单')
      },
      // 修改购买数量
      handleProductNumberChange: function ({ mp }) {
        this.$set(this.detail.groupBuyProduct, 'number', mp.detail.value)
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
      // options = this.$root.$mp.query
      // options = this.$mp.query.xxx
      // console.log(this.groupBuyId, this.productId)
      // console.log('page index onLoad', this)
    },
    mounted: function () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow: function () { // 小程序页面显示
      // options = this.$root.$mp.appOptions
      this.groupBuyId = this.$mp.query.groupBuyId
      this.groupBuyProductId = this.$mp.query.groupBuyProductId
      this.getData(this.groupBuyProductId)
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
