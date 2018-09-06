<template>
  <div class="container">
    <span style="margin: 50px">支付金额: <span class="text-max" style="color: red">{{paymentAmount}}</span>￥<span class="text-button-mini" style="display: block" @click="copyPaymentAmount">复制金额</span></span>
    <!--<span class="text-other" style="width: 90%;">-->
      <!--显示二维码图片后,长按识别二维码.支付指定上面描述的金额.支付完毕后截图.选择下方的"联系客服"联系团长客服.-->
    <!--</span>-->
    <i-steps direction="vertical">
      <i-step status="">
        <view slot="title">
          选择支付类型
        </view>
        <view slot="content">
          可选支付宝二维码支付或微信二维码支付.
        </view>
      </i-step>
      <i-step status="">
        <view slot="title">
          显示支付二维码图片
        </view>
        <view slot="content">
          长按显示菜单,选择保存图片保存图片到本地.
        </view>
      </i-step>
      <i-step status="">
        <view slot="title">
          用微信的扫描二维码的功能读取保存到本地手机相册的二维码
        </view>
        <view slot="content">
          就会弹出支付页面,<span style="color: red">请先复制支付金额,防止临时忘记.</span>
        </view>
      </i-step>
      <i-step status="">
        <view slot="title">
          支付"支付金额"指定的金额.
        </view>
        <view slot="content">
          支付完毕后记得保存截图作为凭证.
        </view>
      </i-step>
      <i-step status="">
        <view slot="title">
          联系团客服,说明订单和打款金额.
        </view>
        <view slot="content">
          也可以通过已知微信联系.
        </view>
      </i-step>
      <i-step status="">
        <view slot="title">
          订单操作完毕.团长会订正订单的,
        </view>
        <view slot="content">
          请稍后,如果时间太长可以之后再来查看.
        </view>
      </i-step>
    </i-steps>

    <div class="pre_wechat" @click="showWechatImg">
      <i-icon size="25" type="service"/>
      <span style="font-size: 10px">微信<br>支付</span>
    </div>

    <div class="pre_alipay" @click="showAlipayImg">
      <i-icon size="25" type="service"/>
      <span style="font-size: 10px">阿里<br>支付</span>
    </div>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        paymentAmount: 0.00,
        id: '',
        wechatPayUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534586112036&di=5594992704d10d7b42e9e248ceae26f5&imgtype=0&src=http%3A%2F%2Fsrc.onlinedown.net%2Fimages%2Fxcs%2F10%2F2017-06-07_59375a6f90e1f.jpg',
        AlipayUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534589009424&di=efff4a9a2927321fe65f6f9163167dd0&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1458111359%2C4067554592%26fm%3D214%26gp%3D0.jpg'
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      showWechatImg: function () {
        wx.previewImage(
          {
            urls: [this.wechatPayUrl]
          }
        )
      },
      showAlipayImg: function () {
        wx.previewImage(
          {
            urls: [this.AlipayUrl]
          }
        )
      },
      copyPaymentAmount: function () { // 复制金额到用户剪贴板
        let that = this
        wx.setClipboardData({
          data: that.paymentAmount,
          success: function (res) {
          }
        })
      },
      getData: function () {
        // TODO 服务端加载支付图片地址过来 getPayImg()
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
      this.paymentAmount = this.$mp.query.paymentAmount
      this.groupBuyId = this.$mp.query.id
      console.log('获取paymentAmount', this.paymentAmount + ' ,id', this.id)
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
  .pre_wechat {
    border-radius: 10px;
    background-color: $color-theme;
    opacity: 0.5;
    padding: 5px;
    width: 25px;
    position: fixed;
    top: 20%;
    right: 3%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .pre_alipay {
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
