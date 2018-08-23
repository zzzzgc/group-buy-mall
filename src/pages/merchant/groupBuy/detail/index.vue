<template>
  <div class="container">
    <!--<div class="base-info text-other">-->
    <!--<span>团购编号: {{groupBuyId}}</span>-->
    <!--<span>团购状态: {{getStatusNickname}}</span>-->
    <!--</div>-->
    <div style="width: 100%;">
      <i-panel title="团购信息">
        <i-input :value="groupBuyTitle" title="团购标题" disabled/>
        <i-input :value="groupBuyId" title="团购编号" disabled/>
        <i-input :value="getStatusNickname" title="团购状态" disabled/>
      </i-panel>
    </div>
    <div style="width: 100%;">
      <i-panel title="商品与销售信息">
        <div style="width: 100%;margin-bottom: 20px" v-for="(info, index) in products" :key="index">
          <div>
            <i-cell-group>
              <i-cell url="" link-type="navigateTo">
                <div class="item">
                  <span class="title text-title">{{info.name}}</span><br/>
                  <div class="inline-info">
                    <span>商品单价:{{info.price}}￥</span>
                    <span v-if="groupBuyStatus != 0">销售数量:{{info.sellTotalNumber}}</span>
                    <span v-if="groupBuyStatus != 0">销售额:{{info.sellTotalNumber * (info.price)}}￥</span>
                  </div>
                </div>
              </i-cell>
            </i-cell-group>
          </div>
        </div>
      </i-panel>
      <button class="share_button" open-type="share" id="share" type="primary">分享团购</button>
    </div>
    <label for="share">
      <div class="pre_share_group">
        <i-icon size="25" type="share"/>
        <span style="font-size: 10px">分享<br>团购</span>
      </div>
    </label>
    <div class="pre_edit_group" @click="handleEtidButton">
      <i-icon size="25" type="setup"/>
      <span style="font-size: 10px">编辑<br>团购</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    // 数据
    data: function () {
      return {
        groupBuyId: -1,
        groupBuyStatus: -1,
        groupBuyTitle: '',
        products: [
          {
            name: '',
            price: -1,
            sellTotalNumber: -1
          }
        ]
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getStatusNickname: function () {
        return this.getGroupBuyStatus[this.groupBuyStatus]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ])
    },
    // 函数集合
    methods: {
      getData: function (groupBuyId) {
        // TODO 获取团长团购商品详细 getGroupBuyProduct(groupBuyId)
        this.products = [
          {
            name: '第一个商品',
            price: 12.5,
            sellTotalNumber: 12
          },
          {
            name: '第二个商品',
            price: 12.5,
            sellTotalNumber: 12
          },
          {
            name: '第三个商品',
            price: 12.5,
            sellTotalNumber: 12
          },
          {
            name: '第四个商品',
            price: 12.5,
            sellTotalNumber: 12
          },
          {
            name: '第五个商品',
            price: 12.5,
            sellTotalNumber: 12
          },
          {
            name: '第六个商品',
            price: 12.5,
            sellTotalNumber: 12
          }
        ]
      },
      handleEtidButton: function () { // 处理编辑按钮单击事件
        // this.groupBuyStatus
        console.log('编辑请求请求:', '../addAndEdit/main?groupBuyId=' + this.groupBuyId + '&groupBuyStatus=' + this.groupBuyStatus)
        wx.navigateTo({
          url: '/pages/merchant/groupBuy/addAndEdit/main?groupBuyId=' + this.groupBuyId + '&groupBuyStatus=' + this.groupBuyStatus + '&groupBuyTitle=' + this.groupBuyTitle
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
    onShareAppMessage: function (object) { // 编辑转发内容
      console.log(object.from)
      console.log(object.target)
      console.log(object.webViewUrl)
      // TODO 转发url订正为客户商品展示. title修改为商家店铺和我们的商标
      return {
        title: '转发标题',
        path: 'pages/customer/groupBuys/show/main?groupBuyId' + this.groupBuyId,
        imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3587317807,2844810836&fm=27&gp=0.jpg'
      }
    },
    onLoad: function () { // vue 初始化加载
      this.groupBuyId = this.$mp.query.groupBuyId
      this.groupBuyStatus = this.$mp.query.groupBuyStatus
      this.groupBuyTitle = this.$mp.query.groupBuyTitle
      wx.setNavigationBarTitle({
        title: this.groupBuyTitle
      })
      this.getData(this.groupBuyId)
    },
    mounted: function () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow: function () { // 小程序页面显示
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
  .base-info {
    width: 100%;
    display: flex;
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }

  .text {
    margin: 15px;
  }

  .item {
    display: flex;
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    flex-flow: column wrap;
    align-content: space-around;
    justify-content: center;
    /*justify-content: space-around;*/
    align-items: center;
    .title {

    }

    .inline-info {
      /*margin: auto 10px;*/
      width: 100%;
      display: flex;
      /*flex-direction: row;*/
      /*flex-wrap: wrap;*/
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
    }
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

  .pre_share_group {
    border-radius: 10px;
    background-color: $color-theme;
    opacity: 0.5;
    padding: 5px;
    width: 25px;
    position: fixed;
    top: 28%;
    right: 3%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .share_button {
    background-color: $color-theme;
  }


</style>
