<template>
  <div class="container">
    <!--主面板-->
    <div class="main-panel">
      <!--上半部分-->
      <i-cell is-link>
        <div class="main-panel-up">
          <image class="main-panel-up-head-image" :src="detail.imageUrl"></image>
          <div>
            <div class="main-panel-up-text">
              <i-icon type="addressbook" size="17"/><span>{{detail.nickName}}</span>
            </div>
            <div class="main-panel-up-text">
              <i-icon type="shop_fill" size="17"/><span>{{detail.shopName}}</span>
            </div>
          </div>
        </div>
      </i-cell>
      <!--下半部分-->
      <div class="main-panel-bottom">
        <span class="main-panel-bottom-desc text-other">公告: {{detail.groupBuySetting.describe}}</span>
        <div class="main-panel-bottom-status-class">
          <span class="main-panel-bottom-status text-other">团购{{getStatusNickname}}</span>
        </div>
      </div>
    </div>

    <div style="width: 80%;">
      <div class="product-list" v-for="(product, productIndex) in detail.groupBuySetting.products" :key="productIndex">
        <image class="product-image"  :src="product.images[0].url"></image>
        <div class="product-info">
          <span class="text-info">{{product.name}}</span>
          <span class="text-other">{{product.describe}}</span>
          <span class="text-info">价格:{{product.price}}￥</span><i-input-number v-if="detail.groupBuyStatus === 1" :value="product.number" min="1" max="10000" @change="handleProductNumberChange($event, productIndex)"/>
        </div>
      </div>
    </div>

    <div style="width: 100%;">
      <button class="submit-order" :disabled="!detail.groupBuyStatus == 1" style="padding: 0" @click="handleSubmitOrderClick">
        <div class="total-price">
          <i-icon type="publishgoods_fill" size="28"/>合计:{{getTotalPrice}}￥ 提交订单
        </div>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    // 数据
    data: function () {
      return {
        detail: {
          nickName: '我是xxx',
          imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534514942363&di=e061488f47e604bcd44200ce59811134&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fm1%2FM04%2F0E%2F40%2FwKhQcFQlIAaELPsiAAAAAN1e96w230.jpg',
          shopName: '豪大大店铺',
          groupBuyId: 163546749879,
          groupBuyStatus: 1,
          groupBuySetting: {
            title: '团长的团购标题',
            describe: '团长的描述信息拉斯柯达解放路卡接收到了房间爱里的水开放接口时代峻峰阿拉萨的看风景阿来得快分阿流口水的房间拉的说法甲方as来得快就',
            products: [
              {
                name: '测试商品0号',
                price: 13.55,
                describe: '阿里斯顿会计分录卡萨丁交付了肯德基安防监控',
                limitQuantity: true,
                number: 12,
                quantity: 123,
                images: [
                  {
                    url: 'http://img3.imgtn.bdimg.com/it/u=1357902460,900753575&fm=27&gp=0.jpg',
                    productImagesId: 0
                  },
                  {
                    url: 'http://img4.imgtn.bdimg.com/it/u=737638649,2148164357&fm=27&gp=0.jpg',
                    productImagesId: 1
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1208276097,1809955355&fm=27&gp=0.jpg',
                    productImagesId: 2
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 3
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 4
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 5
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 6
                  }
                ]
              },
              {
                name: '测试商品0号',
                price: 13.55,
                describe: '阿里斯顿会计分录卡萨丁交付了肯德基安防监控',
                limitQuantity: true,
                number: 45,
                quantity: 123,
                images: [
                  {
                    url: 'http://img3.imgtn.bdimg.com/it/u=1357902460,900753575&fm=27&gp=0.jpg',
                    productImagesId: 0
                  },
                  {
                    url: 'http://img4.imgtn.bdimg.com/it/u=737638649,2148164357&fm=27&gp=0.jpg',
                    productImagesId: 1
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1208276097,1809955355&fm=27&gp=0.jpg',
                    productImagesId: 2
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 3
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 4
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 5
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 6
                  }
                ]
              },
              {
                name: '测试商品0号',
                price: 13.30,
                describe: '阿里斯顿会计分录卡萨丁交付了肯德基安防监控',
                limitQuantity: true,
                number: 1,
                quantity: 123,
                images: [
                  {
                    url: 'http://img3.imgtn.bdimg.com/it/u=1357902460,900753575&fm=27&gp=0.jpg',
                    productImagesId: 0
                  },
                  {
                    url: 'http://img4.imgtn.bdimg.com/it/u=737638649,2148164357&fm=27&gp=0.jpg',
                    productImagesId: 1
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1208276097,1809955355&fm=27&gp=0.jpg',
                    productImagesId: 2
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 3
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 4
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 5
                  },
                  {
                    url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
                    productImagesId: 6
                  }
                ]
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
      getStatusNickname: function () {
        return this.getGroupBuyStatus[this.detail.groupBuyStatus]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ]),
      getTotalPrice: function () {
        return this.detail.groupBuySetting.products.reduce(
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
      handleProductNumberChange: function ({mp}, productIndex) {
        this.$set(this.detail.groupBuySetting.products, productIndex, Object.assign({}, this.detail.groupBuySetting.products[productIndex], {number: mp.detail.value}))
      },
      handleSubmitOrderClick: function () { // 提交订单
        // TODO 提交到服务端
        let totalPrice = this.detail.groupBuySetting.products.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 1000 + (curValue.price * 1000 * curValue.number)) / 1000
          },
          0.0
        )
        // 跳转到支付页面
        wx.navigateTo({
          url: '../../payment/show/main?paymentAmount=' + totalPrice
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
  .main-panel{
    width: 80%;
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
        margin:10px 20px;
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
    margin-bottom: 5px;
    /*border: 1px solid #000000;*/
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    border-radius: 10px;
    .product-image {
      margin: 5px;
      flex: none;
      width: 80px;
      height: 80px;
    }
    .product-info {
      margin: 10px;
      display: flex;
      flex-flow: column nowrap;
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
</style>
