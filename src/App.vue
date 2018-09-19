<script>
  import 'mp-weui/lib/style.css'
  export default {
    created () {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      // console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style lang="scss">
  // 页面基础风格, 元素主轴为垂直分布,
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*justify-content: center;*/
    justify-content: center;
    /*justify-content: space-between;*/
    /*padding: rpx(200) 0 0 0;*/
    box-sizing: border-box;
  }

  image {
    background-color: #eeeeee;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
