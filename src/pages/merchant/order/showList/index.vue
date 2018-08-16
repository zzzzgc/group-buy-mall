<template>
  <div class="container">
    <div style="width: 100%;">
      <div style="font-size: 15px;">
        <mp-search confirmType="search" @confirm="handleSearchClick" @change="handleSearchChange"
                   :placeholder="'请输入需要搜索的' + searchType"/>
      </div>
      <radio-group class="radio-group-class" @change="handleRadioClick">
        <radio value="订单号" id="orderId" :checked="true"/>
        <label class="text-other" for="orderId" style="display: inline-block">订单号</label>
        <radio value="关键字" id="keyword" :checked="false"/>
        <label class="text-other" for="keyword" style="display: inline-block">关键字</label>
      </radio-group>

      <div v-for="(order, orderIndex) in orders" :key="orderIndex" class="item-card-block">
        <!--<i-avatar :src="order.user_head_url" size="small" shape="square"></i-avatar>-->
        <div @click="handleOrderClick($event, order.orderId, order.createDate)">
          <i-cell is-link>
            <!--<i-cell :title="'[' + order.groupInfo.status + ']' + ' ' + order.groupInfo.name" is-link>-->
            <span class="text-info" style="display: inline-block">{{'[' + getGroupBuyStatus[order.groupInfo.status] + ']' + order.groupInfo.name}}&nbsp;</span>
            <!--<span class="text-info" style="display: inline-block">{{'[' + order.groupInfo.status + ']' + order.groupInfo.name}}&nbsp;</span>-->
            <div style="display: inline-block">
              <image style="width: 20px;height: 20px;" lazy-load :src="order.userInfo.user_head_url"
                     mode="aspectFit">&nbsp;
              </image>
              <span class="text-info">{{order.userInfo.nickName}} </span>
            </div>
            <span class="text-other" style="display: block">订单号:{{order.orderId}}</span>
            <span class="text-other" style="display: block">创建时间:{{order.createDate}}</span>
          </i-cell>
        </div>
        <i-collapse name="ceshi">
          <div class="text-info" style="background-color: white">
            <i-collapse-item title="查看商品详细">
              <view slot="content">
                <div v-for="(product, productIndex) in order.products" :key="productIndex">
                  <span>{{product.name}} &nbsp;</span>
                  <span>{{product.price}}￥ * {{product.number}}</span>
                </div>
                <span>总价格: {{order.orderTotalPrice}}</span>
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
  import MpSearch from 'mp-weui/packages/search'

  export default {
    // 数据  订单状态 0已下单 1已通知 2已收货
    data: function () {
      return {
        search: 'search',
        searchText: '',
        searchType: '订单号',
        orders: []
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ])
    },
    // 函数集合
    methods: {
      handleRadioClick: function (e) { // 处理radio控件,修改搜索类型
        this.searchType = e.mp.detail.value
      },
      handleSearchClick: function (e) { // 处理单击搜索
        console.log('处理单击搜索', e)
      },
      handleSearchChange: function (e) { // 处理变更搜索
        this.searchText = e
        console.log('处理变更搜索', e)
      },
      handleOrderClick: function (e, orderId, createDate) { // 处理订单单击事件
        console.log('处理订单单击事件', e)
        wx.navigateTo({
          url: '../detail/main?orderId=' + orderId + '&createDate=' + createDate
        })
      },
      getData: function (searchText, searchType) { //  获取服务数据
        // TODO 获取服务端数据
        return [
          {
            createDate: '2018-07-20 16:34',
            groupInfo: {
              status: 0,
              name: '良品店'
            },
            orderTotalPrice: 1654654.5445,
            orderStatus: 0,
            orderId: '123465ds9a87f98a7dsf',
            userInfo: {
              user_head_url: 'http://img.zcool.cn/community/011d1159784366a8012193a3e7da5c.jpg@1280w_1l_2o_100sh.jpg',
              nickName: '非常长的名字非常长的名字非常长的名字非常长的名字非常长的名字'
            },
            products: [
              {
                name: '良品店一号商品',
                price: 12.5,
                number: 456
              },
              {
                name: '良品店二号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店三号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店四号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店5号商品',
                price: 12.54,
                number: 15
              }
            ]
          },
          {
            createDate: '2018-07-20 16:34',
            groupInfo: {
              status: 1,
              name: '非常长的名字非常长的名字非常长的名字非常长的名字非常长的名字非常长的名字'
            },
            orderTotalPrice: 1654654.5445,
            orderStatus: 0,
            orderId: 'a6sd8f798ew7qr3',
            userInfo: {
              user_head_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534993508&di=b81629161642e88f9634e6bdd87aaca4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg07.tooopen.com%2Fimages%2F20170508%2Ftooopen_sy_208631868843.jpg',
              nickName: '年少大客'
            },
            products: [
              {
                name: '良品店一号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店二号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店三号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店四号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店5号商品',
                price: 12.54,
                number: 15
              }
            ]
          },
          {
            createDate: '2018-07-20 16:34',
            groupInfo: {
              status: 2,
              name: '良品店'
            },
            orderTotalPrice: 1654654.5445,
            orderId: 'wqer87eq4r',
            orderStatus: 0,
            userInfo: {
              user_head_url: 'http://img1.imgtn.bdimg.com/it/u=3496940105,3255527640&fm=27&gp=0.jpg',
              nickName: '低调as来得快'
            },
            products: [
              {
                name: '良品店一号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店二号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店三号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店四号商品',
                price: 12.54,
                number: 15
              },
              {
                name: '良品店5号商品',
                price: 12.54,
                number: 15
              }
            ]
          }
        ]
      }
    },
    // 组件注册
    components: {
      MpSearch
    },
    // 侦听属性
    watch: {},
    created: function () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad: function () { // vue 初始化加载
      // options = this.$root.$mp.query
      this.orders = this.getData()
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
    background-color: white;
  }

  .item-card-block {
    border-radius: 20px;
    margin: 0 20px 20px 20px;
  }
</style>
