<!--客户端首页,展示自己推荐的人在自己看过的团的下单情况,简略-->
<template>
  <div class="container">
    <span class="text-other">以下是邀请您参团团长的所有团购服务列表</span>
    <div style="width: 100%" class="group" v-for="(merchantUser, merchantUserIndex) in detail" :key="merchantUserIndex">
      <!--团长信息-->
      <div class="group-info">
        <image class="group-info-image" :src="merchantUser.imageUrl" mode="aspectFill"></image>
        <span class="group-user-info-name">{{merchantUser.nickName}}</span>
      </div>
      <!--团购服务-->
      <div class="group-item" v-for="(groupBuy, groupBuyIndex) in merchantUser.groupBuys" :key="groupBuyIndex" @click="handleGroupBuyClick(merchantUserIndex, groupBuyIndex)">
        <!--团购信息-->
        <div class="group-buy-info">
          <span class="group-buy-info-name text-title">{{groupBuy.title}}</span>
        </div>

        <!--谁参加了团-->
        <!--<div style="width: 100%;" class="group-buy-info-join">-->
        <!--<div class="group-buy-info-join-images">-->
        <!--<image class="group-buy-info-join-image" v-for="(userImage, userImageIndex) in groupBuy.useUser" :key="userImageIndex" :src="userImage" mode="aspectFill"></image>-->
        <!--</div>-->
        <!--<span v-if="groupBuy.useUser.length>8" class="text-other" style="font-size: 10px">等{{groupBuy.useUser.length}}人参团</span>-->
        <!--<span v-else class="text-other">{{groupBuy.useUser.length}}人参团</span>-->
        <!--</div>-->

        <!--商品图片-->
        <div class="group-buy-info-product-images">
          <div class="group-buy-info-product-item" v-for="(product, productIndex) in groupBuy.groupBuyProducts" :key="productIndex">
            <image class="group-buy-info-product-item-image" :src="product.groupBuyProductImages[0]?product.groupBuyProductImages[0].url:'#'" mode="aspectFill"></image>
            <span class="group-buy-info-product-item-price text-other">{{product.price}}￥</span>
          </div>
        </div>


      </div>
    </div>

    <div class="pre_order" @click="showOrderList">
      <i-icon size="25" type="service"/>
      <span style="font-size: 10px">所有<br>订单</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  // import restfulApiSet from '../../http/restfulApiUtils'
  export default {
    // 数据
    data: function () {
      return {
        detail: []
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
      getData: function (userId) {
        this.$portApi.user.getAllCareAboutUserGroupBuyInfo().then(
          users => {
            this.detail = users
          }
        )
      },
      handleGroupBuyClick: function (merchantIndex, groupBuyIndex) {
        let groupBuyId = this.detail[merchantIndex].groupBuys[groupBuyIndex].id
        wx.navigateTo({
          url: 'groupBuy/show/main?groupBuyId=' + groupBuyId
        })
      },
      showOrderList: function () {
        wx.navigateTo({
          url: 'order/list/main'
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
      // options = this.$root.$mp.query
      // options = this.$mp.query.xxx
      // console.log('page index onLoad', this)
    },
    mounted: function () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow: function () { // 小程序页面显示
      this.getData(this.$store.state.userId)
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

  .group-buy-info-join {
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: center;
    .group-buy-info-join-images {
      flex: none;
      display: inline-block;
      width: 75%;
      height: 35px;
      /*border: 1px solid #000;*/
      overflow: hidden;
      text-overflow: ellipsis;
      .group-buy-info-join-image {
        border-radius: 100%;
        margin: 0 3px;
        width: 20px;
        height: 20px;
      }
    }
  }

  .group-buy-info-product-images {
    display: flex;
    flex-flow: row wrap;
    .group-buy-info-product-item {
      display: flex;
      flex-flow: column wrap;
      margin: 0 2px 2px 0;
      .group-buy-info-product-item-image {
        width: 70px;
        height: 70px;
      }
      .group-buy-info-product-item-price {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        display: block;
        background-color: #888888;
      }
    }
  }

  .pre_order {
    border-radius: 10px;
    background-color: $color-theme;
    opacity: 0.5;
    padding: 5px;
    width: 25px;
    position: fixed;
    top: 80%;
    right: 3%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
