/*
这个页面是团长分享给团员买货的团购展示页(show),同时也是团购详细展示页(detail)
*/
<template>
  <div class="container">
    <!--主面板-->
    <div class="main-panel">
      <!--上半部分-->
      <i-cell @click="handleUserClick" is-link>
        <div class="main-panel-up">
          <image class="main-panel-up-head-image" :src="detail.user.imageUrl"></image>
          <div>
            <div class="main-panel-up-text">
              <i-icon type="addressbook" size="17"/>
              <span>{{detail.user.nickName}}</span>
            </div>
            <div class="main-panel-up-text">
              <i-icon type="shop_fill" size="17"/>
              <span v-if="detail.user.userShop">{{detail.user.userShop.shopName}}</span>
              <span v-else>未绑定店铺</span>
            </div>
          </div>
        </div>
      </i-cell>
      <!--下半部分-->
      <div class="main-panel-bottom">
        <span class="main-panel-bottom-desc text-other">公告: {{detail.groupBuy.descriptor}}</span>
        <div class="main-panel-bottom-status-class">
          <span class="main-panel-bottom-status text-other">{{getStatusNickname}}</span>
        </div>
      </div>
    </div>

    <div style="width: 100%;padding-bottom: 45px">
      <!--product-list-->
      <div class="list-item" v-for="(product, productIndex) in detail.groupBuy.groupBuyProducts" :key="productIndex">
        <a :href="'/pages/customer/product/main?groupBuyId='+ detail.groupBuy.id + '&groupBuyProductId=' + product.id">
          <image class="product-image" style="background-color: #eeeeee;width: 100%;" mode="aspectFill"
                 :src="product.groupBuyProductImages && product.groupBuyProductImages[0] ? product.groupBuyProductImages[0].url : ''"></image>
        </a>
        <div class="product-info">
          <div>
            <span class="text-other">{{product.name}}</span>
            <span v-if="product.limitQuantity == 0" class="text-other">(已销{{product.sellTotalNumber}}份,只剩{{product.inventory - product.sellTotalNumber}}份)</span>
            <span v-else class="text-other">(已销{{product.sellTotalNumber}}份)</span>
          </div>
          <!--<span class="text-other">{{product.descriptor}}</span>-->
          <div class="product-price-and-sell-number">
            <span class="text-title" style="color: red;">{{product.price}}￥</span>
            <div style="display: inline-block">
              <i-input-number
                v-if="detail.groupBuy.status === 1&&((product.inventory - product.sellTotalNumber)>1||product.limitQuantity)"
                :value="product.number" min="0"
                :max="product.limitQuantity == 0?product.inventory - product.sellTotalNumber:9999"
                @change="handleProductNumberChange($event, productIndex)"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 100%;" v-if="detail.groupBuy.status === 1">
      <button class="submit-order" :disabled="!detail.groupBuy.status == 1||!getTotalPrice" style="padding: 0"
              @click="handleSubmitOrderClick">
        <div class="total-price">
          <i-icon type="publishgoods_fill" size="28"/>
          合计:{{getTotalPrice}}￥ {{isEdit?'编辑':'提交'}}订单
        </div>
      </button>
    </div>

    <div class="pre_edit_group" @click="handleMainButton">
      <i-icon size="25" type="homepage"/>
      <span style="font-size: 10px">团员<br>首页</span>
    </div>

    <!--添加订单-->
    <send_order :groupBuy="detail.groupBuy" :userId="detail.user.id" v-model.lazy="detail.order" :isEditLogisticsInfo="on_off.isEditLogisticsInfo"></send_order>

    <!--物流信息-->
    <!--<div style="width: 100%;">-->
      <!--<i-drawer mode="right" :visible="on_off.isEditLogisticsInfo" mask-closable="false">-->
        <!--<view class="demo-container">-->
          <!--<i-tabs :current="detail.order.logisticsType" @change="handleTypeLogisticsChange">-->
            <!--<i-tab v-if="detail.groupBuy.canDistribution" key="1" title="配送到家"></i-tab>-->
            <!--<i-tab v-if="detail.groupBuy.canNoutoasiakas" key="2" title="自提"></i-tab>-->
          <!--</i-tabs>-->
          <!--<div v-if="detail.order.logisticsType == 1">-->
            <!--&lt;!&ndash;配送到家&ndash;&gt;-->
            <!--<i-input :value="detail.order.userName" title="联系人姓名" placeholder="请输入联系人姓名"-->
                     <!--@change="orderChange('userName', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="detail.order.phone" title="联系电话" placeholder="请输入联系电话"-->
                     <!--@change="orderChange('phone', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="detail.order.address" title="收获地址" placeholder="请输入收获完整地址,包含省市区和详细地址"-->
                     <!--@change="orderChange('address', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="detail.order.customerRemark" title="备注" placeholder="请输入备注"-->
                     <!--@change="orderChange('customerRemark', $event.mp.detail.detail.value)"></i-input>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--&lt;!&ndash;自提&ndash;&gt;-->
            <!--<i-input :value="detail.order.userName" title="联系人姓名" placeholder="请输入联系人姓名"-->
                     <!--@change="orderChange('userName', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="detail.order.phone" title="联系电话" placeholder="请输入联系电话"-->
                     <!--@change="orderChange('phone', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-panel title="在下方选择自行提取货物的地点">-->
              <!--<radio-group class="radio-group-class" @change="handleNoutoasiakasChange">-->
                <!--<div v-for="(noutoasiakas, noutoasiakasIndex) in detail.groupBuy.groupBuyNoutoasiakases"-->
                     <!--:key="noutoasiakasIndex">-->
                  <!--<radio :value="noutoasiakasIndex" :id="noutoasiakas.id+'noutoasiakasId'" :checked="false"/>-->
                  <!--<label class="text-other" :for="noutoasiakas.id+'noutoasiakasId'" style="display: inline">{{noutoasiakas.address}}</label>-->
                <!--</div>-->
              <!--</radio-group>-->
            <!--</i-panel>-->
            <!--<i-input :value="detail.order.customerRemark" title="备注" placeholder="请输入备注(可选)"-->
                     <!--@change="orderChange('customerRemark', $event.mp.detail.detail.value)"></i-input>-->
          <!--</div>-->
          <!--<i-button @click="addOrUpdateOrderClick(1)" type="primary">确定</i-button>-->
          <!--<i-button @click="addOrUpdateOrderClick(0)" type="primary">取消</i-button>-->
        <!--</view>-->
      <!--</i-drawer>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import sendOrder from '../../../components/order/sendOrder'

  export default {
    // 数据
    data: function () {
      return {
        on_off: {
          isEditLogisticsInfo: false
        },
        isEdit: false,
        id: -1,
        detail: {
          user: {
            id: 0,
            name: '',
            imageUrl: '',
            shopName: ''
          },
          groupBuy: {
            id: 0,
            status: 0,
            canNoutoasiakas: true,
            canDistribution: true,
            title: '',
            orders: [
              {
                isDelivery: false,
                logisticsType: 1,
                userName: '',
                phone: '',
                merchantRemark: '',
                customerRemark: '',
                noutoasiakasId: 0,
                noutoasiakasName: '',
                noutoasiakasAddress: '',
                address: '',
                createTime: '',
                orderProducts: []
              }
            ],
            groupBuyNoutoasiakases: [],
            groupBuyProducts: [
              {
                name: '',
                price: 0,
                descriptor: '',
                limitQuantity: false,
                number: 0,
                quantity: 0,
                sellTotalNumber: 0,
                groupBuyProductsImages: [
                  {
                    url: '',
                    id: 0
                  }
                ]
              }
            ],
            descriptor: ''
          },
          order: {
            isDelivery: false,
            logisticsType: 1,
            userName: '',
            phone: '',
            merchantRemark: '',
            customerRemark: '',
            noutoasiakasId: 1,
            noutoasiakasName: '',
            noutoasiakasAddress: '',
            address: '',
            orderProducts: [],
            userHeadImage: '',
            totalPrice: 0.0,
            groupBuyName: ''
          }
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getStatusNickname: function () {
        return this.getGroupBuyStatus[this.detail.groupBuy.status]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ]),
      getTotalPrice: function () {
        return this.detail.groupBuy.groupBuyProducts.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 1000 + (curValue.price * 1000 * curValue.number)) / 1000
          },
          0.0
        )
      }
    },
    // 函数集合
    methods: {
      // 加载数据
      getData: function (groupBuyId, orderId) {
        let that = this
        // 获取团购
        this.$portApi.groupBuy.toGroupBuyProductImage(groupBuyId).then(
          groupBuy => {
            that.$set(that.detail, 'groupBuy', groupBuy)
            // 获取团长用户信息
            this.$restfulApi.user.findByGroupBuyId(groupBuyId).then(
              (user) => {
                that.$set(that.detail, 'user', user)
              }
            )
            // 团购商品添加计数器
            that.detail.groupBuy.groupBuyProducts.forEach(
              groupBuyProduct => {
                groupBuyProduct.number = 0
              }
            )
          }
        )
        // 是否是编辑订单
        if (orderId) {
          this.isEdit = true
          this.$restfulApi.order.findById(orderId).then(
            (order) => {
              this.detail.order = order
            }
          )
        } else {
          that.detail.order.groupBuyId = that.detail.groupBuy.id
          that.detail.order.logisticsType = that.detail.groupBuy.canDistribution ? 1 : 2
        }
      },
      // 修改商品数量
      handleProductNumberChange: function ({ mp }, productIndex) {
        this.$set(this.detail.groupBuy.groupBuyProducts, productIndex, Object.assign({}, this.detail.groupBuy.groupBuyProducts[productIndex], { number: mp.detail.value }))
        // this.detail.groupBuy.groupBuyProducts[productIndex].id
        // this.detail.order.orderProducts.find()
      },
      handleSubmitOrderClick: function () { // 提交新订单
        this.on_off.isEditLogisticsInfo = true
      },
      handleUserClick: function () { // 团长详细
        wx.navigateTo({
          url: '/pages/customer/groupBuy/list/main?userId=' + this.detail.user.id
        })
      },
      // 切换物流方式
      handleTypeLogisticsChange: function ({ mp }) {
        this.detail.order.logisticsType = mp.detail.key
      },
      // 修改自提点
      handleNoutoasiakasChange: function ({ mp }) {
        let noutoasiakasIndex = parseInt(mp.detail.value)
        let noutoasiakas = this.detail.groupBuy.groupBuyNoutoasiakases[noutoasiakasIndex]
        console.log(noutoasiakasIndex, noutoasiakas)
        this.detail.order.noutoasiakasId = noutoasiakas.id
        this.detail.order.noutoasiakasName = noutoasiakas.nickName
        this.detail.order.noutoasiakasAddress = noutoasiakas.address
      },
      orderChange: function (key, value) {
        this.detail.order[key] = value
      },
      // 提交,添加或修改订单
      addOrUpdateOrderClick: function (status) {
        if (!status) {
          this.on_off.isEditLogisticsInfo = false
          return
        }
        let msg = this.verifyOrder()
        if (msg) {
          this.$tips.toast(msg, 'none', 2000)
        }
        console.log('校验通过')
        let that = this
        let totalPrice = this.detail.groupBuy.groupBuyProducts.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 1000 + (curValue.price * 1000 * curValue.number)) / 1000
          },
          0.0
        )
        // 把购买的商品数据载入到订单中
        this.detail.order.userHeadImage = this.$store.state.userInfo.avatarUrl
        this.detail.order.orderProducts = []
        this.detail.order.totalPrice = totalPrice
        this.detail.order.groupBuyName = this.detail.groupBuy.title
        console.log(this.detail.order.groupBuy)
        this.detail.groupBuy.groupBuyProducts.forEach(
          groupBuyProduct => {
            console.log(groupBuyProduct.id)
            if (groupBuyProduct.number > 0) {
              let orderProduct = {
                // imageUrl: '',
                name: groupBuyProduct.name,
                number: groupBuyProduct.number,
                price: groupBuyProduct.price,
                groupBuyProductId: groupBuyProduct.id,
                groupBuyProduct: groupBuyProduct,
                imageUrl: groupBuyProduct.groupBuyProductImages && groupBuyProduct.groupBuyProductImages[0] ? groupBuyProduct.groupBuyProductImages[0].url : ''
              }
              that.detail.order.orderProducts.push(orderProduct)
            }
          }
        )
        this.$portApi.order.save(this.detail.order, this.detail.groupBuy.id, this.detail.user.id).then(
          (response) => {
            // 跳转到支付页面
            wx.redirectTo({
              url: `/pages/customer/payment/show/main?paymentAmount=${totalPrice}&userId=${that.detail.user.id}`
            })
            this.on_off.isEditLogisticsInfo = false
          }
        )
      },
      // 跳转到首页
      handleMainButton: function () {
        wx.navigateTo({
          url: '/pages/customer/main'
        })
      },
      verifyOrder: function () {
        if (this.detail.order.name === '') return '联系人姓名不可以为空'
        if (this.detail.order.phone === '') return '联系人电话不可以为空'
        if (this.detail.order.logisticsType === 1) {
          // 配送
          if (this.detail.order.address === '') return '收货地址不可以为空'
        } else {
          // 自提
          if (this.detail.order.noutoasiakasId === 0) return '必须选择一个自行提取货物的地点'
        }
        // address: '北京省北京市王府井拉圣诞节疯阿士大夫撒旦撒地方规范狂',
        //   name: '井口拉斯科',
        //   id: 6879878
      }
    },
    // 组件注册
    component: {
      sendOrder
    },
    // 侦听属性
    watch: {},
    created: function () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad: function () { // vue 初始化加载
      // options = this.$root.$mp.query
      console.log('跳转到show携带的参数是:', this.$mp.query)
      this.groupBuyId = this.$mp.query.groupBuyId
      this.orderId = this.$mp.query.orderId
      let careAboutUserId = this.$mp.query.careAboutUserId
      let isTest = false
      let isTest2 = false
      if (isTest) {
        this.orderId = 5
      }
      if (isTest2) {
        careAboutUserId = 3
      }
      if (careAboutUserId) {
        this.$portApi.user.saveCareAboutUser(careAboutUserId).then(
          (response) => {
            console.log('成功了', response)
          }
        )
      }
      this.getData(this.groupBuyId, this.orderId)
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
  .main-panel {
    width: 100%;
    margin: 10px;
    border-radius: 15px;
    /*border: 1px solid #000000;*/
    .main-panel-up {
      display: flex;
      flex-flow: row nowrap;
      .main-panel-up-head-image {
        width: 75px;
        height: 75px;
        border-radius: 10px;
      }
      .main-panel-up-text {
        margin: 10px 20px;
      }
    }
    .main-panel-bottom {
      background-color: white;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .main-panel-bottom-desc {
        margin: 10px;
      }
      .main-panel-bottom-status-class {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        background-color: $color-theme;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        width: 85px;
        height: 35px;
        /*flex-shrink: 0;*/
        flex: none;
        .main-panel-bottom-status {
          color: white;
          // 不缩小
        }
      }
    }
  }

  .product-list {
    background-color: white;
    margin-bottom: 5px;
    /*border: 1px solid #000000;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*flex-flow: row nowrap;*/
    border-radius: 10px;
    padding: 5px;
    box-shadow: 1px 1px 1px #888888;
    .product-image {
      margin: 5px;
      flex: none;
      /*width: 80px;*/
      height: 240px;
      /*height: 80px;*/
    }
    .product-info {
      margin: 10px;
      display: flex;
      flex-flow: column nowrap;
      .product-price-and-sell-number {
        width: 100%;
        display: flow;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
    }
  }

  .submit-order {
    margin: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    .total-price {
      flex-grow: 2;
      position: fixed;
      bottom: 0%;
      width: 100%;
      opacity: 0.8;
      background-color: $color-theme;
    }
    .submit-order-text {
      /*opacity: 0.5;*/
      background-color: $color-theme;
      /*background-color: lighten($color-theme, 10);*/
      flex-grow: 1;
      /*color: black;*/
      /*width: 100%;*/
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
    }
  }

  .demo-container {
    width: 100vw;
    /*width: 80%;*/
    height: 100%;
    background: #fff;
  }

  .pre_edit_group {
    border-radius: 10px;
    background-color: $color-theme;
    opacity: 0.5;
    padding: 5px;
    width: 25px;
    position: fixed;
    top: 45%;
    right: 3%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
