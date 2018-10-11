<template>
  <div style="padding-top: 80px" class="container main">
    <div>
      <text class="home-title text-title-main">水果社区团购</text>
    </div>
    <div class="userInfo">
      <div v-if="!hasUserInfo&&canIUse">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取头像昵称</button>
      </div>
      <div v-else class="userInfo">
        <image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
        <!--<image @tap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl"></image>-->
        <text class="userinfo-nickname text-info">{{userInfo.nickName}}</text>
      </div>
      <!--预防微信关闭wx获取用户信息的功能,做的控件获取用户信息的方案-->
      <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="userLogin">点击登录</button>-->
    </div>
    <div v-if="userInfo.avatarUrl" class="button-bolck" style="width: 250px;">
      <i-button :disabled="!userInfo.avatarUrl" size="large" shape="circle" inline type='success' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><span class="text-title">我是团长</span></i-button>
      <i-button :disabled="!userInfo.avatarUrl" size="large" shape="circle" inline type='primary' @click='gotoCustomerConfig'><span class="text-title">我是团员</span></i-button>
    </div>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'

  export default {
    data: function () {
      return {
        radioValue: '',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    components: {},
    computed: {
      openId: {
        get: function () {
          return this.$store.state.openId
        },
        set: function (openId) {
          this.$store.commit(types.SET_OPEN_ID, openId)
        }
      }
    },
    methods: {
      bindViewTap: function () {
        const url = '../logs/main'
        wx.navigateTo({url})
      },
      gotoMerchantConfig: function () {
        this.$store.commit(types.SET_USER_TYPE, 1)
        wx.navigateTo({
          url: '/pages/merchant/main'
        })
      },
      gotoCustomerConfig: function () {
        this.$store.commit(types.SET_USER_TYPE, 2)
        wx.navigateTo({
          url: '/pages/customer/main'
        })
      },
      // 获取手机号码回调,用于团长权限判断
      getPhoneNumber: function (e) {
        // console.log(e)
        this.gotoMerchantConfig()
        // if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        //   console.log(e.mp.detail.errMsg)
        //   console.log(e.mp.detail.iv)
        //   console.log(e.mp.detail.encryptedData)
        //   let that = this
        //   this.$portApi.user.merchantLogin(e.mp.detail.iv, e.mp.detail.encryptedData).then(
        //     () => {
        //       that.gotoMerchantConfig()
        //     }
        //   )
        // }
      },
      getUserInfo: function () {
        let that = this
        // 调用登录接口
        wx.login({
          success: (loginResponse) => {
            wx.getUserInfo({
              success: userInfoResponse => {
                if (loginResponse.code) {
                  that.login(loginResponse.code, userInfoResponse.userInfo)
                }
              }
            })
          },
          fail: function (loginError) {
            // that.$tips.toast('登录失败', 'none')
          }
        })
      },
      login: function (code, userInfo) {
        let that = this
        userInfo.weChatName = userInfo.nickName
        userInfo.imageUrl = userInfo.avatarUrl
        this.$portApi.common.login({code: code, ...userInfo}).then(
          (response) => {
            wx.setStorage({key: 'sessionId', data: 'JSESSIONID=' + response.sessionId})
            that.$store.commit(types.SET_USER_ID, response.userId)
            that.userInfo = userInfo
            that.hasUserInfo = true
            that.$store.commit(types.SET_USER_INFO, userInfo)
            that.$tips.toast('登录成功')
            return true
          },
          (response) => {
            return false
          }
        )
      },
      userLogin: function (e) {
        let that = this
        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            // 授权信息里有用户信息
            if (res.authSetting['scope.userInfo']) {
              // 检查用户登录是否过期
              wx.checkSession({
                success: function () {
                  // 没过期 直接成功
                  that.userInfo = e.mp.detail.userInfo
                  that.$tips.toast('自动登录成功', 'success', 1000)
                },
                fail: function () {
                  that.getUserInfo()
                }
              })
            } else {
              that.$tips.toast('用户未授权', 'none')
            }
          },
          error: function (res) {
            console.log('获取失败', res)
          }
        })
      }
    },
    created: function () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  page {
    .main {
      height: 100%;
      width: 100%;
      /*background:url("http://localhost:8100/images/main.jpg") no-repeat 10px center;*/
      /*vertical-align: middle;*/
      /*background-image: url("http://localhost:8100/images/main.jpg");*/
      /*background-size: contain;*/
    }
    width: 100%;
    height: 100%;
    overflow: hidden;
    .userInfo {
      margin: rpx(50) 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .userinfo-avatar {
        width: rpx(128);
        height: rpx(128);
        margin: rpx(30) 0;
        border-radius: 5px;
      }
      .userinfo-nickname {
        color: black;
        margin: 0;
        display: block;
      }
    }

    .home-title {
      font-weight: 900
    }

    .button-bolck {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .home-button {
        font-weight: 900;
        width: rpx(500);
        margin: 0;
      }
      .button-hover {
        opacity: 0.2;
      }
    }
  }
</style>
