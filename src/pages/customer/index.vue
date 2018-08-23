<!--客户端首页,展示自己推荐的人在自己看过的团的下单情况,简略-->
<template>
  <div class="container">
    <span class="text-other">以下是邀请您参团团长的所有团购服务列表</span>
    <div style="width: 100%" class="group" v-for="(merchant, merchantIndex) in detail.groupBuys" :key="merchantIndex">
      <!--团长信息-->
      <div class="group-info">
        <image class="group-info-image" :src="merchant.merchantInfo.imageUrl" mode="aspectFill"></image>
        <span class="group-user-info-name">{{merchant.merchantInfo.name}}</span>
      </div>

      <!--团购服务-->
      <div class="group-item" v-for="(groupBuy, groupBuyIndex) in merchant.groupBuyInfo" :key="groupBuyIndex"
           @click="handleGroupBuyClick(merchantIndex, groupBuyIndex)">
        <!--团购信息-->
        <div class="group-buy-info">
          <span class="group-buy-info-name text-title">{{groupBuy.name}}</span>
        </div>

        <!--谁参加了团-->
        <div style="width: 100%;" class="group-buy-info-join">
          <div class="group-buy-info-join-images">
            <image class="group-buy-info-join-image" v-for="(userImage, userImageIndex) in groupBuy.useUser"
                   :key="userImageIndex" :src="userImage" mode="aspectFill"></image>
          </div>
          <span v-if="groupBuy.useUser.length>8" class="text-other" style="font-size: 10px">等{{groupBuy.useUser.length}}人参团</span>
          <span v-else class="text-other">{{groupBuy.useUser.length}}人参团</span>
        </div>

        <!--商品图片-->
        <div class="group-buy-info-product-images">
          <div class="group-buy-info-product-item" v-for="(product, productIndex) in groupBuy.products"
               :key="productIndex">
            <image class="group-buy-info-product-item-image" :src="product.firstImageUrl" mode="aspectFill"></image>
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

  export default {
    // 数据
    data: function () {
      return {
        detail: {}
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
      getData: function () {
        // TODO 服务获取数据,根据该团员被哪个团长邀请而决定
        this.detail = {
          groupBuys: [
            {
              merchantInfo: {
                imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830743219&di=205ed1cbb51ae969e0e2113509f96736&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201503%2F02%2F20150302165623_NtUCC.jpeg',
                name: '世外水果铺(潭村店)'
              },
              groupBuyInfo: [
                {
                  id: 201801056546546,
                  status: 1,
                  name: '夏季海边产品团购专场',
                  useUser: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246443&di=96fd5d3218c7e7f692efee6519bb0294&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F74%2F97%2F29G58PICS2T_1024.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png'
                  ],
                  products: [
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 123.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 456.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 12.48
                    }
                  ]
                },
                {
                  id: 2201801050545456,
                  status: 1,
                  name: '全季节海边产品团购专场',
                  useUser: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246443&di=96fd5d3218c7e7f692efee6519bb0294&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F74%2F97%2F29G58PICS2T_1024.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246439&di=3795ba864a91ae6b5ebcf680761d0332&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01efcf587dea43a801219c77199c2b.jpg'
                  ],
                  products: [
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 123.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 456.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 12.48
                    }
                  ]
                }
              ]
            },
            {
              merchantInfo: {
                imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830743219&di=205ed1cbb51ae969e0e2113509f96736&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201503%2F02%2F20150302165623_NtUCC.jpeg',
                name: '罔酿蟠桃园(潭村店)'
              },
              groupBuyInfo: [
                {
                  id: 3201801050545456,
                  status: 1,
                  name: '夏季海边产品团购专场',
                  useUser: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246443&di=96fd5d3218c7e7f692efee6519bb0294&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F74%2F97%2F29G58PICS2T_1024.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246441&di=398ee717932b3c6cc8e41db788f3bf4c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F57%2F49%2F98I58PICx7r_1024.png',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830246439&di=3795ba864a91ae6b5ebcf680761d0332&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01efcf587dea43a801219c77199c2b.jpg'
                  ],
                  products: [
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 123.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 456.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 789.54
                    },
                    {
                      firstImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534830165487&di=8ea93b92613faaab09b5b32d98ee4eb7&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F15%2F146599335677049264.JPEG',
                      price: 12.48
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      handleGroupBuyClick: function (merchantIndex, groupBuyIndex) {
        console.log('456')
        let groupBuyId = this.detail.groupBuys[merchantIndex].groupBuyInfo[groupBuyIndex].id
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
