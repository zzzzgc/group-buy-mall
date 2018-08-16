<template>
  <div style="padding-top: 100px" class="container">
    <div>
      <text class="home-title text-title-main">水果社区团购</text>
    </div>
    <div class="userinfo">
      <div v-if="!hasUserInfo&&canIUse">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取头像昵称</button>
      </div>
      <div v-else class="userinfo">
        <image @tap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
        <text class="userinfo-nickname text-info">{{userInfo.nickName}}</text>
      </div>
      <!--预防微信关闭wx获取用户信息的功能,做的控件获取用户信息的方案-->
      <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="userLogin">点击登录</button>-->
    </div>
    <div class="button-bolck" style="width: 250px;">
      <i-button class='home-button text-button' type='success' @click='gotoMerchantConfig'>我是团长</i-button>
      <i-button class='home-button text-button' type='ghost'>我是团员</i-button>
    </div>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        radioValue: '',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    components: {
    },
    computed: {
      openId: {
        get () {
          return this.$store.state.openId
        },
        set (openId) {
          this.$store.commit(types.SET_OPEN_ID, openId)
        }
      }
    },
    methods: {
      bindViewTap () {
        const url = '../logs/main'
        wx.navigateTo({url})
      },
      gotoMerchantConfig: function () {
        wx.navigateTo({
          // wx.redirectTo({
          url: '/pages/merchant/main'
        })
      },
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: res => {
                // console.log('获取userInfo', res)
                this.userInfo = res.userInfo
                this.hasUserInfo = true
                this.$store.commit(types.SET_USER_INFO, res.userInfo)
              }
            })
          }
        })
      },
      userLogin (e) {
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
                  that.$tips.toast('重新登录成功', 'success', 1000)
                },
                fail: function () {
                  // 过期了 重新登录 先清楚登录的状态
                  // qcloud.clearSession()
                  // 登录态已过期，需重新登录
                  var options = {
                    // 登录需要的加密信息
                    encryptedData: e.mp.detail.encryptedData,
                    iv: e.mp.detail.iv,
                    userinfo: e.mp.detail.userInfo
                  }
                  that.getWxLogin(options)
                }
              })
            } else {
              that.$tips.toast('用户未授权', 'none')
            }
          }
        })
      },
      getWxLogin: function ({encryptedData, iv, userinfo}) {
        let that = this
        wx.login({
          success: function (loginResult) {
            // console.log('loginResult', loginResult)
            that.$tips.toast('登录成功', 'none')
            wx.getUserInfo({
              success: res => {
                // console.log('获取userInfo', res)
                that.userInfo = res.userInfo
              }
            })
          },
          fail: function (loginError) {
            that.$tips.toast('登录失败', 'none')
          }
        })
      }
    },
    created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .userinfo {
      margin: rpx(50) 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .userinfo-avatar {
        width: rpx(128);
        height: rpx(128);
        margin: rpx(30) 0;
        border-radius: 50%;
      }
      .userinfo-nickname {
        margin: 0;
        display: block;
      }
    }

    .home-title {
    }

    .button-bolck {
      .home-button {
        width: rpx(500);
        margin: 0;
      }
      .button-hover {
        opacity: 0.2;
      }
    }
  }
</style>
