<template>
  <div class="container">
    <!--确认发货-->
    <div style="width: 100%;">
      <i-cell title="发货状态" label="选中后表示确认收到货了,团长慎重选择">
        <i-switch :value="detail.isDelivery" size="large" @change="handleIsDeliveryChange" slot="footer">
          <view slot="open">已发</view>
          <view slot="close">未发</view>
        </i-switch>
      </i-cell>
    </div>
    <!--物流信息-->
    <div style="width: 100%;">
      <i-panel title="物流信息">
        <i-input :value="detail.logisticsInfo.name" title="收货人" disabled></i-input>
        <i-input :value="detail.logisticsInfo.phone" title="手机" disabled></i-input>
        <i-input v-if="detail.logisticsInfo.address === ''||!detail.logisticsInfo.address" :value="detail.logisticsInfo.noutoasiakas.name" title="自提点" disabled></i-input>
        <i-input v-else :value="detail.logisticsInfo.address" title="收获地址" disabled></i-input>
        <i-input :value="detail.logisticsInfo.customerRemark" title="备注" disabled></i-input>
        <i-input title="团长备注" :value="detail.logisticsInfo.merchantRemark" placeholder="请输入备注(可不填)"></i-input>
      </i-panel>
    </div>
    <!--商品展示-->
    <div style="width: 80%;">
      <div class="item" v-for="(product, productIndex) in  detail.products" :key="productIndex">
        <image class="item-image" :src="product.imageUrl" lazy-load mode="aspectFill"></image>
        <div>
          <span class="item-title-name text-info">{{product.name}}</span>
          <span  class="item-title-price text-other">{{product.price}}￥ * {{product.number}}</span>
          <i-cell v-if="isEdit">
            <i-input-number :value="product.number" min="1" max="10000" @change="handleProductNumberChange($event, productIndex)"></i-input-number>
          </i-cell>
        </div>
        <!--<div class="column-item">-->
        <!--</div>-->
      </div>
    </div>
    <!--合计-->
    <span>合计:{{getTotalPrice}}￥</span>
    <!--团购信息-->
    <div style="width: 100%;">
      <i-panel title="团购信息">
        <i-input :value="orderId" title="订单编号" disabled></i-input>
        <i-input :value="createDate" title="下单时间" disabled></i-input>
      </i-panel>
    </div>
    <!--编辑按钮-->
    <div style="width: 100%;">
      <i-button v-if="!isEdit" type="primary" :long="true" @click="handleEditButtonClick">编辑团购</i-button>
      <i-button v-else type="primary" :long="true" @click="handleEditAffirmButtonClick">确认编辑结果</i-button>
    </div>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        isEdit: false,
        orderId: '',
        createDate: '2018-08-17 13:55',
        detail: {
          isDelivery: false,
          logisticsInfo: {
            name: 'asdf',
            phone: '18718840426',
            merchantRemark: '',
            customerRemark: '客户备注',
            noutoasiakas: {
              name: '张家路口',
              address: '广州市白云区拉斯卡的解放军拉萨打开解放流口水的房间拉萨的看风景拉萨的看风景拉斯达克放假'
            },
            address: '广州市白云区拉斯卡的解放军拉萨打开解放流口水的房间拉萨的看风景拉萨的看风景拉斯达克放假'
          },
          productTotalPrice: 225546.45,
          products: [
            {
              productId: 0,
              name: '测试商品',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535021904&di=6cae6a92af3fb1a00894770a957feec7&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ffd039245d688d43f1bec8dd7771ed21b0ef43b49.jpg',
              price: 12.55,
              number: 12
            },
            {
              productId: 12,
              name: '测试商品1',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534427185840&di=b294bdd3b5888ec6d6878eca808d4888&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb2de9c82d158ccbf33b9c01c13d8bc3eb135418a.jpg',
              price: 12.55,
              number: 14
            },
            {
              productId: 23,
              name: '测试商品2',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534427185838&di=29ef597724be4b54decb84488d65e4dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ffd039245d688d43f31aeaac8761ed21b0ef43b80.jpg',
              price: 12.55,
              number: 14
            },
            {
              productId: 88,
              name: '测试商品3',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534427185838&di=f7395e7da2c8423af6b7d8e0066ae609&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20140920%2Fsy_71382031999.jpg',
              price: 12.55,
              number: 12
            }
          ]
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getTotalPrice: function () {
        return this.detail.products.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 100 + (curValue.price * 100 * curValue.number)) / 100
          },
          0.0
        )
      }
    },
    // 函数集合
    methods: {
      getData: function (orderId) {
      },
      handleIsDeliveryChange: function ({mp}) {
        this.detail.isDelivery = mp.detail.value
        // TODO 请求后端修改发货状态
      },
      handleEditButtonClick: function () {
        // 进入编辑状态
        this.isEdit = true
      },
      handleEditAffirmButtonClick: function () { // 编辑结束
        // TODO 提交订正结果到服务 products and orderId
        this.isEdit = false
      },
      handleProductNumberChange: function ({mp}, productIndex) { // 处理商品数量变更
        this.$set(this.detail.products, productIndex, Object.assign({}, this.detail.products[productIndex], {number: mp.detail.value}))
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
      if (this.$mp.query.orderId) {
        this.orderId = this.$mp.query.orderId
        this.getData(this.orderId)
      }
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
  .item {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px #888888;
    .item-image {
      margin: 2px;
      width: 80px;
      height: 80px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .item-title-name {
     /* !*display: inline-block;*!
      position: relative;
      top: -55px;
      !*top: -55px;*!
      left: 0px;*/
    }
    .item-title-price {
      display: block;
      /*position: relative;
      top: -18px;
      !*top: -55px;*!
      left: -90px;*/
    }
  }
</style>
