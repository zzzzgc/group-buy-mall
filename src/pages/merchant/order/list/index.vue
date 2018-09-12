<template>
  <div class="container">
    <div style="width: 100%;">
      <div style="font-size: 15px;">
        <i-cell title="搜索">
          <i-input type="text" :placeholder="'请输入需要搜索的' + searchType"></i-input>
        </i-cell>
      </div>
      <span class="text-other">搜索类型:</span>
      <radio-group class="radio-group-class" @change="handleRadioClick">
        <radio value="订单号" id="orderId" :checked="true"/>
        <label class="text-other" for="orderId" style="display: inline-block">订单号</label>
        <radio value="关键字" id="keyword" :checked="false"/>
        <label class="text-other" for="keyword" style="display: inline-block">关键字</label>
      </radio-group>
      <i-button type="primary" long="true" @click="">搜索</i-button>

      <div style="box-shadow: 0 0 10px #888888;border-radius: 20px" v-for="(order, orderIndex) in detail.orders" :key="orderIndex" class="item-card-block">
        <a :href="'/pages/common/order/detail/main?orderId=' + order.id + '&createDate=' + order.createAt + '&isCustomer=false'">
          <i-cell :title="order.groupBuyName" is-link>
            <!--<i-cell :title="'[' + getGroupBuyStatus[order.groupInfo.status] + ']' + order.groupBuyName" is-link>-->
            <div class="left-right">

              <div class="up-bottom">
                <image style="width: 20px;height: 20px;margin: 0 3px" lazy-load :src="order.userHeadImage" mode="aspectFit"></image>
                <span class="text-other">{{order.userName}} </span>
              </div>
              <div class="show-phone">
                <i-icon type="mobilephone" size="25" id="phone" @click.stop="handleCellPhone(orderIndex, order.phone)"/>
                <label class="text-other" @click.stop="handleCellPhone(orderIndex, order.phone)">联系手机</label>
                <!--<label class="text-other" @click.stop="handleCellPhone(orderIndex, order.user.phone)">联系手机 <span v-if="order.user.cellPhoneCount">{{order.user.cellPhoneCount}}次</span></label>-->
              </div>

            </div>
            <div style="display: flex;flex-flow: row nowrap;justify-content: space-between">
              <span class="text-other" style="display: block">订单编号: &nbsp;{{order.id}}</span>
              <span :class="{red:order.isDelivery==0}">发货状态:{{order.isDelivery == 1?'已发货':'未发货'}}</span>
            </div>
            <span class="text-other" style="display: block">下单时间: &nbsp;{{order.createAt}}</span>
          </i-cell>
        </a>

        <i-collapse name="ceshi">
          <div class="text-info" style="background-color: white">
            <i-collapse-item title="查看商品详细">
              <view slot="content">
                <div v-for="(product, productIndex) in order.orderProducts" :key="productIndex">
                  <span class="text-other">{{product.name}} &nbsp;</span>
                  <span class="text-other">{{product.price}}￥ * {{product.number}}</span>
                </div>
                <span>总价格: {{order.totalPrice}}</span>
              </view>
            </i-collapse-item>
          </div>
        </i-collapse>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    // 数据  订单状态 0已下单 1已通知 2已收货
    data: function () {
      return {
        search: 'search',
        searchText: '',
        searchType: '订单号',
        detail: {
          orders: {
            id: '',
            createAt: '',
            address: '',
            customerRemark: '',
            groupBuyName: '',
            isDelivery: '',
            logisticsType: '',
            merchantRemark: '',
            noutoasiakasAddress: '',
            noutoasiakasId: '',
            noutoasiakas_name: '',
            pay_price: '',
            total_price: '',
            user_head_image: '',
            user_name: '',
            group_buy_id: '',
            user_id: '',
            status: '',
            phone: '',
            merchant_user_id: '',
            cellPhoneCount: ''
          }
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      ...mapGetters('group', [
        'getGroupBuyStatus',
        'getOrderDeliverStatus'
      ])
    },
    // 函数集合
    methods: {
      handleRadioClick: function (e) { // 处理radio控件,修改搜索类型
        this.searchType = e.mp.detail.value
      },
      handleSearchConfirm: function (e) { // 处理单击搜索
        console.log('处理搜索确定', e)
        this.getData()
      },
      getData: function (searchText, searchType) { //  获取服务数据
        this.$portApi.order.findAllIsMerchant(searchText, searchType).then(
          (orders) => {
            this.detail.orders = orders
          }
        )
      },
      handleCellPhone: function (orderIndex, phone) { // 拨打电话
        let that = this
        wx.makePhoneCall({
          phoneNumber: phone,
          success: function (response) {
            // console.log('打电话成功', response)
            let num = 0
            if (that.detail.orders[orderIndex].user.cellPhoneCount) {
              num = that.detail.orders[orderIndex].user.cellPhoneCount + 1
            } else {
              num = 1
            }
            // console.log(that.detail.orders[orderIndex].user + '计数值:' + that.detail.orders[orderIndex].user.cellPhoneCount + '-->' + num)
            that.$set(that.detail.orders[orderIndex].user, 'cellPhoneCount', num)
          },
          fail: function (response) {
            console.log('打电话失败', response)
          },
          complete: function (response) {
            console.log('打电话', response)
          }
        })
      }
    },
    // 组件注册
    components: {},
    // 侦听属性
    watch: {},
    created: function () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad: function () { // vue 初始化加载
      // options = this.$mp.query.
      this.getData()
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
  .radio-group-class {
    display: inline;
    background-color: white;
  }

  .item-card-block {
    border-radius: 20px;
    margin: 0 20px 20px 20px;
  }

  .left-right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .up-bottom {
    width: 100%;
    /*background-color: #ffcd32;*/
    display: flex;
    flex-flow: row nowrap;
  }

  .show-phone {
    border-radius: 5px;
    background-color: #ffcd32;
    color: white;
    height: 25px;
    width: 150px;
    /*flex: none;*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    /*border: 1px solid #100000;*/
    label {
      color: white;
      /*margin: 5px;*/
    }
  }

  .red {
    color: red;
  }
</style>
