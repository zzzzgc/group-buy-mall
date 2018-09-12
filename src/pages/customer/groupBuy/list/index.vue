<template>
  <div class="container">
    <!--用户信息-->
    <!--<div class="user-info">-->

    <!--用户基础信息-->
    <div class="user-info-base">
      <image class="user-info-base-image" :src="detail.user.imageUrl"></image>
      <div class="user-info-base-name">
        <span class="text-other">{{detail.user.nickName}}</span>
        <span class="text-title-main">{{detail.user.userShop?detail.user.userShop.shopName:'未绑定店铺'}}</span>
      </div>
    </div>

    <!--用户详细信息-->
    <div class="user-info-detail">
      <div class="user-info-detail-contact">
        <div>
          <i-icon type="mobilephone" size="28"/>
          <span class="text-other">{{detail.user.userShop?detail.user.userShop.phone:'未绑定店铺'}}</span>
        </div>
        <div>
          <i-icon type="businesscard" size="28"/>
          <span class="text-other">{{detail.user.weChatName}}</span>
        </div>
      </div>
      <div class="user-info-detail-address">
        <i-icon type="flag" size="28"/>
        <span class="text-other">{{detail.user.userShop?detail.user.userShop.address:'未绑定店铺'}}</span>
      </div>
    </div>

    <!--</div>-->

    <!--团购服务简介-->
    <div class="group-service">
      <div class="list-item" v-for="(groupBuySetting, groupBuyIndex) in detail.groupBuys" :key="groupBuyIndex" @click="handleGroupClick(groupBuyIndex)">
        <div class="group-item-info">
          <div class="text-title">{{groupBuySetting.title}}</div>
          <div class="group-item-info-other">
            <div class="text-other">创建时间:{{groupBuySetting.createAt}}</div>
            <div class="text-other">团购状态:{{getGroupBuyStatus[groupBuySetting.status]}}</div>
          </div>
        </div>
        <div class="group-item-image">
          <image class="group-item-image-item" v-for="(image, imageIndex) in groupBuySetting.groupBuyProductsImages" :key="imageIndex" :src="image.url"></image>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    // 数据
    data: function () {
      return {
        userId: -1,
        detail: {
          groupBuys: []
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getStatusNickname: function () {
        return this.getGroupBuyStatus[this.status]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ])
    },
    // 函数集合
    methods: {
      // 请求数据
      getData: function (userId) {
        this.$portApi.user.toUserShop(userId).then(
          (user) => {
            // this.detail.user = user
            this.$set(this.detail, 'user', user)
          }
        )
        // this.$restfulApi.user.findById(userId).then(
        //   (user) => {
        //     // this.detail.user = user
        //     this.$set(this.detail, 'user', user)
        //   }
        // )
        // this.detail.user = {
        //   phone: 18718840426,
        //   name: '用户昵称',
        //   wechatName: '微信名称',
        //   imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535357610&di=ffea7ccd1758882bcf7af2d24fdd708d&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.vxinhao.cn%2FPublic%2Fnews%2Fimage%2F20160317%2F20160317011219_42773.jpg',
        //   shopName: '豪大大店铺',
        //   address: '广东省广州市某个山卡拉的地方'
        // }
        this.$portApi.groupBuy.toGroupBuyProductImageByUserId(userId).then(
          groupBuys => {
            this.$set(this.detail, 'groupBuys', groupBuys)
          }
        )
        // this.detail.groupBuys = [
        //   {
        //     id: 654987987,
        //     status: 1,
        //     title: '夏秋国产专场',
        //     createTime: Date.now(),
        //     descriptor: '这是长长的描述信息,长长的,长长的,长长的,长长的,长长的',
        //     groupBuyProductsImages: [
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'}
        //     ]
        //   },
        //   {
        //     id: 165498798,
        //     status: 0,
        //     title: '秋季越南专场',
        //     createTime: Date.now(),
        //     descriptor: '这是长长的描述信息,长长的,长长的,长长的,长长的,长长的',
        //     groupBuyProductsImages: [
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'}
        //     ]
        //   },
        //   {
        //     id: 96574687,
        //     status: 2,
        //     title: '夏季泰国专场',
        //     createTime: Date.now(),
        //     descriptor: '这是长长的描述信息,长长的,长长的,长长的,长长的,长长的',
        //     groupBuyProductsImages: [
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'},
        //       {url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3582343643,1105585195&fm=11&gp=0.jpg'}
        //     ]
        //   }
        // ]
      },
      handleGroupClick: function (groupBuyIndex) { // 团购服务被单击
        let groupBuyId = this.detail.groupBuys[groupBuyIndex].id
        wx.navigateTo({
          url: '../show/main?id=' + groupBuyId
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
      // console.log('page index onLoad', this)
    },
    mounted: function () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow: function () { // 小程序页面显示
      // options = this.$root.$mp.appOptions
      this.userId = this.$mp.query.userId
      this.getData(this.userId)
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
  .user-info-base {
    background-color: $color-theme;
    padding: 20px 0 80px 0;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    .user-info-base-image {
      background-color: #888888;
      margin: 5px 0;
      width: 80px;
      height: 80px;
    }
    .user-info-base-name {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  }

  .user-info-detail {
    border-radius: 10px;
    margin-top: -60px;
    width: 80%;
    background-color: white;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    .user-info-detail-contact {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-around;
    }
    .user-info-detail-address {

    }
  }

  .group-service {
    margin-top: 10px;
    /*.group-item {*/
    /*box-shadow: 0 0 12px #888888;*/
    /*border-radius: 10px;*/
    /*padding: 10px;*/
    /*margin: 10px;*/
    .group-item-info {
      .group-item-info-other {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
      }
    }
    .group-item-image {
      .group-item-image-item {
        width: 76px;
        height: 76px;
        margin: 3px;
      }
    }
    /*}*/
  }

</style>
