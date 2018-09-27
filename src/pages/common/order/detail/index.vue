<template>
  <div class="container">
    <!--确认发货-->
    <div style="width: 100%;">
      <i-cell v-if="getUserType === 1" title="发货状态" label="选中后表示确认收到货了">
        <i-switch :value="detail.order.isDelivery" size="large" @change="handleIsDeliveryChange" slot="footer">
          <view slot="open">已发</view>
          <view slot="close">未发</view>
        </i-switch>
      </i-cell>
      <i-cell v-else title="获取取货二维码" label="打开二维码给货主扫描查看订单">
        <div>
          <i-button type="primary" :long="true" @click="handleOpenQrCoede">打开取货二维码</i-button>
        </div>
      </i-cell>
    </div>

    <!--物流信息-->
    <div style="width: 100%;">
      <i-panel title="物流信息">
        <i-input :value="detail.order.userName" title="收货人" :disabled="!isEdit" @change="orderChange('userName',$event.mp.detail.detail.value)" placeholder="请输入联系人姓名"></i-input>
        <i-input :value="detail.order.phone" title="手机" :disabled="!isEdit" @change="orderChange('phone',$event.mp.detail.detail.value)" placeholder="请输入联系人手机号码"></i-input>
        <!--选择物流方式-->
        <i-radio-group v-if="isEdit" :current="detail.order.logisticsType == 1?'配送到家':'用户自提'" @change="handleLogisticsTypeChange">
          <div v-for="(logisticsType, logisticsTypeIndex) in logisticsTypes" :key="logisticsTypeIndex">
            <i-radio position="left" :value="logisticsType.name"></i-radio>
          </div>
        </i-radio-group>
        <!--订正自提点-->
        <div class="radio-group-parent" v-if="detail.order.logisticsType === 2">
          <radio-group v-if="isEdit" class="radio-group-class" @change="handleNoutoasiakasChange">
            <div v-for="(noutoasiakas, noutoasiakasIndex) in detail.order.groupBuy.groupBuyNoutoasiakases" :key="noutoasiakasIndex">
              <radio :value="noutoasiakas.id" :id="noutoasiakas.id+'noutoasiakasId'" :checked="false"/>
              <label class="text-other" :for="noutoasiakas.id+'noutoasiakasId'" style="display: inline">{{noutoasiakas.address}}</label>
            </div>
          </radio-group>
        </div>
        <!--订正取货地址-->
        <div v-if="detail.order.logisticsType === 2&&!isEdit">
          <i-input title="自提点地址" :value="detail.order.noutoasiakasAddress" disabled placeholder="请在上方选择自提点"></i-input>
        </div>
        <i-input v-if="detail.order.logisticsType === 1" :value="detail.order.address" title="收货地址" @change="orderChange('address',$event.mp.detail.detail.value)" :disabled="!isEdit" placeholder="请"></i-input>
        <i-input :value="detail.order.customerRemark" title="团员备注" :disabled="getUserType!=2||!isEdit" @change="orderChange('customerRemark',$event.mp.detail.detail.value)" placeholder="请输入备注(可不填)"></i-input>
        <i-input :value="detail.order.merchantRemark" title="团长备注" :disabled="getUserType!=1||!isEdit" @change="orderChange('merchantRemark',$event.mp.detail.detail.value)" placeholder="请输入备注(可不填)"></i-input>
      </i-panel>
    </div>
    <!--商品展示-->
    <div style="width: 100%;">
      <div class="item" v-for="(product, productIndex) in  detail.order.orderProducts" :key="productIndex">
        <image class="item-image" :src="product.imageUrl" style="background-color: #eeeeee" lazy-load mode="aspectFill"></image>
        <div>
          <span class="item-title-name text-info">{{product.name}}</span>
          <span class="item-title-price text-other">{{product.price}}￥ * {{product.number}}</span>
          <i-cell v-if="isEdit">
            <i-input-number :value="product.number" min="0" max="10000" @change="handleProductNumberChange($event, productIndex)"></i-input-number>
          </i-cell>
        </div>
      </div>
    </div>

    <!--合计-->
    <span>合计:{{getTotalPrice}}￥</span>

    <!--团购信息-->
    <div style="width: 100%;">
      <i-panel title="团购信息">
        <i-input :value="orderId" title="订单编号" disabled></i-input>
        <i-input :value="detail.order.createAt" title="下单时间" disabled></i-input>
      </i-panel>
    </div>

    <!--编辑按钮-->
    <div v-if="!detail.order.isDelivery" style="width: 100%;">
      <!--<div v-if="!((detail.order.groupBuy.status === 2)||detail.order.isDelivery)" style="width: 100%;">-->
      <i-button v-if="!isEdit" type="primary" :long="true" @click="handleEditButtonClick">编辑团购</i-button>
      <i-button v-else type="primary" :long="true" @click="handleEditAffirmButtonClick">确认编辑结果</i-button>
    </div>

    <!--收货二维码展示-->
    <i-drawer mode="right" :visible="on_off.showQrCode" @close="on_off.showQrCode=false">
      <view class="demo-container qr_code_image">
        <span class="text-button-mini">收货二维码</span>
        <image :src="takeQrCodeImageUrl" mode="widthFix"/>
      </view>
    </i-drawer>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        on_off: {
          showQrCode: false
        },
        takeQrCodeImageUrl: 'https://group.52xiguo.com/qrCode/a1524444d54f439ea38355d30533f628.jpeg',
        logisticsTypes: [
          {
            id: 1,
            name: '配送到家',
            disabled: false
          },
          {
            id: 2,
            name: '用户自提',
            disabled: false
          }
        ],
        isEdit: false,
        isCustomer: true,
        orderId: '',
        createTime: '',
        detail: {
          order: {
            isDelivery: false,
            logisticsType: 0,
            name: '',
            phone: '',
            merchantRemark: '',
            customerRemark: '',
            noutoasiakasId: 0,
            noutoasiakasName: '',
            address: '',
            orderProduct: [
              {
                id: 0,
                productId: 0,
                name: '',
                imageUrl: '',
                price: 0,
                number: 0
              }
            ],
            groupBuy: {
              id: 0,
              status: 0,
              canNoutoasiakas: false,
              canDistribution: false,
              title: '',
              descriptor: ''
            },
            groupBuyNoutoasiakas: [
              {
                address: '',
                name: '',
                id: 0
              }
            ]
          }
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getTotalPrice: function () {
        return this.detail.order.orderProducts ? this.detail.order.orderProducts.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 100 + (curValue.price * 100 * curValue.number)) / 100
          },
          0.0
        ) : 0.0
      },
      // 获取用户类型
      getUserType: function () {
        return this.$store.state.userType
      }
    },
    // 函数集合
    methods: {
      getData: function (orderId) {
        // order -> groupBuy -> noutoasiakas
        // order -> orderProduct
        let that = this
        this.$portApi.order.findDetailById(orderId).then(
          (order) => {
            that.detail.order = order
          }
        )
      },
      orderChange: function (keyName, value) {
        console.log(keyName, value)
        this.detail.order[keyName] = value
        console.log(this.detail.order[keyName])
      },
      // 发货?
      handleIsDeliveryChange: function ({mp}) {
        this.detail.order.isDelivery = mp.detail.value
        // 不是很恰当,但是最快
        this.$portApi.order.save(this.detail.order).then(
          () => {
            console.log('修改发货状态')
          }
        )
        // let orderStatus = this.detail.isDelivery
      },
      handleEditButtonClick: function () {
        // 进入编辑状态
        this.isEdit = true
      },
      // 提交编辑订单的数据
      handleEditAffirmButtonClick: function () {
        // 修改操作可以不提交 groupBuyId and mUserId
        // 主要更改 商品数量 订单信息
        this.$portApi.order.save(this.detail.order).then(
          () => {
            console.log('提交编辑')
          }
        )
        this.isEdit = false
      },
      // 商品数量改变
      handleProductNumberChange: function ({mp}, productIndex) { // 处理商品数量变更
        this.$set(this.detail.order.orderProducts[productIndex], 'number', mp.detail.value)
      },
      // 物流类型改变
      handleLogisticsTypeChange: function ({mp}) {
        if (mp.detail.value === '配送到家') {
          this.detail.order.logisticsType = 1
        } else {
          this.detail.order.logisticsType = 2
        }
      },
      // 自提点改变
      handleNoutoasiakasChange: function ({mp}) {
        let noutoasiakas = this.detail.order.groupBuy.groupBuyNoutoasiakases.find(
          (noutoasiakas) => {
            return noutoasiakas.id === parseInt(mp.detail.value)
          }
        )
        // console.log(noutoasiakas)
        this.detail.order.noutoasiakasId = noutoasiakas.id
        this.detail.order.noutoasiakasName = noutoasiakas.nickName
        this.detail.order.noutoasiakasAddress = noutoasiakas.address
      },
      // 获取并展示收货二维码
      handleOpenQrCoede: function () {
        let that = this
        console.log('开始获取二维码')
        this.$portApi.weChat.createQrCode('pages/common/order/detail/main', this.detail.order.id).then(
          (takeQrCodeImageUrl) => {
            console.log('获取成功  ')
            that.takeQrCodeImageUrl = takeQrCodeImageUrl
            that.on_off.showQrCode = true
          }
        )
        that.on_off.showQrCode = true
      }
    },
    // 组件注册
    component: {},
    // 侦听属性
    watch: {},
    created: function () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad: function (options) { // vue 初始化加载
      // options = this.$root.$mp.query

      // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      let orderId = decodeURIComponent(options.scene)
      if (orderId !== 'undefined') {
        console.log(orderId)
        this.orderId = orderId
      } else {
        this.orderId = this.$mp.query.orderId
      }
      this.createAt = this.$mp.query.createAt
      this.isCustomer = !(/^false/).test(this.$mp.query.isCustomer)
      console.log(this.isCustomer ? '团员进入查看' : '团长进入查看')
      this.getData(this.orderId)
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
      this.on_off.showQrCode = false
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

  .demo-container {
    width: 100vw;
    /*width: 80%;*/
    height: 100%;
    background: #fff;
  }

  .radio-group-parent {
    margin-left: 35px;
    .radio-group-class {
      display: inline;
      background-color: white;
    }
  }

  .qr_code_image {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

</style>
