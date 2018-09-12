<template>
  <div class="container">
    <div style="width: 100%;" class="group-info">
      <i-icon type="createtask" size="35"/>
      <!--<i-icon type="home" size="25px"></i-icon>-->
      <!--<image class="group-info-image" :src="groupBuy.merchantInfo.imageUrl" mode="aspectFill"></image>-->
      <span>所有订单</span>
    </div>
    <!--<div style="width: 100%;" class="group" v-for="(order, orderIndex) in detail.orders" :key="groupBuyIndex">-->
    <div style="width: 100%;" class="group">
      <div class="group-item" v-for="(order, orderIndex) in detail.orders" :key="orderIndex" @click="handleOrderClick(orderIndex)">
        <div>
          <div>{{order.groupBuyName}}</div>
          <div><span style="color: red">{{order.totalPrice}}</span>￥</div>
        </div>
        <div>
          <div class="text-other">创建时间:{{order.createAt}}</div>
        </div>
      </div>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        detail: {
          orders: [
            {
              id: '',
              create_at: '',
              update_at: '',
              address: '',
              customer_remark: '',
              group_buy_name: '',
              is_delivery: '',
              logistics_type: '',
              merchant_remark: '',
              noutoasiakas_address: '',
              noutoasiakas_id: '',
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
              createAt: ''
            }
          ]
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      getData: function () {
        this.$portApi.order.findAll().then(
          (orders) => {
            this.detail.orders = orders
          }
        )
        // this.detail = {
        //   groupBuys: [
        //     {
        //       merchantInfo: {
        //         imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830743219&di=205ed1cbb51ae969e0e2113509f96736&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201503%2F02%2F20150302165623_NtUCC.jpeg',
        //         shopName: '世外水果铺(潭村店)'
        //       },
        //       orderInfo: [
        //         {
        //           id: 1654687987,
        //           groupBuyName: '冗余的团购名称',
        //           status: '0',
        //           payPrice: 1564.10,
        //           createTime: '2018-12-05 15:55:77'
        //         },
        //         {
        //           id: 657,
        //           groupBuyName: '冗余的团购名称2',
        //           status: '0',
        //           payPrice: 78.10,
        //           createTime: '2018-12-01 15:55:77'
        //         }
        //       ]
        //     },
        //     {
        //       merchantInfo: {
        //         imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830743219&di=205ed1cbb51ae969e0e2113509f96736&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201503%2F02%2F20150302165623_NtUCC.jpeg',
        //         shopName: '万国蟠桃园(潭村店)'
        //       },
        //       orderInfo: [
        //         {
        //           id: 786,
        //           groupBuyName: '冗余的团购名称3',
        //           status: '0',
        //           payPrice: 654.10,
        //           createTime: '2018-01-05 15:55:77'
        //         },
        //         {
        //           id: 786786,
        //           groupBuyName: '冗余的团购名称4',
        //           status: '0',
        //           payPrice: 657.11,
        //           createTime: '2018-05-01 15:55:77'
        //         }
        //       ]
        //     }
        //   ]
        // }
      },
      // 处理订单点击事件
      handleOrderClick: function (orderIndex) {
        let order = this.detail.orders[orderIndex]
        let orderId = order.id
        let createAt = order.createAt
        wx.navigateTo({
          url: '/pages/common/order/detail/main?orderId=' + orderId + '&createAt=' + createAt + '&isCustomer=true'
        })
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
  .group {
    .group-user-info {
      border-left: 3px solid $color-theme;
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-items: center;
      .group-user-info-image {
        width: 35px;
        height: 35px;
        border-radius: 100%;
        margin: 5px;
      }
    }
    .group-order-item {
      border-radius: 10px;
      width: 80%;
      margin: 10px 0 20px 0px;
      padding: 15px;
      box-shadow: 0 0 5px #888888;

    }
  }
</style>
