<template>
  <div class="container">
    <i-tabs style="width: 100%;" :current="tabKey" @change="handleTabChange">
      <i-tab :key="1" :title="groupBuyStatus[0].describe">
      </i-tab>
      <i-tab :key="2" :title="groupBuyStatus[1].describe">
      </i-tab>
    </i-tabs>

    <div style="width: 85%;margin: 10px 0" v-if="tabKey == groupBuyStatus[0].status" v-for="(groupBuySellInfo, groupBuySellInfoAIndex) in groupBuyStatus[0].groupBuySellInfoList" :key="groupBuySellInfoAIndex">
      <roundedEdges>
        <!--<div>-->
        <p>A paragraph for the main content.</p>
        <p>And another one2.</p>
        <p>And another twe.</p>
        <!--</div>-->
        <!--<template slot="footer">-->
        <!--&lt;!&ndash;<p>Here's some contact info</p>&ndash;&gt;-->
        <!--<span>Here's some contact info</span>-->
        <!--</template>-->
      </roundedEdges>
    </div>

    <div style="width: 85%;" v-if="tabKey == groupBuyStatus[1].status" v-for="(groupBuySellInfo, groupBuySellInfoAIndex) in groupBuyStatus[1].groupBuySellInfoList" :key="groupBuySellInfoAIndex">
      <roundedEdges>
        <template slot="header">
          <h1>Here might be a page title</h1>
        </template>
        <div>
          {{groupBuySellInfo.title}}
          {{groupBuySellInfo.id}}
        </div>
        <template slot="footer">
          <!--<p>Here's some contact info</p>-->
          <span>Here's some contact info</span>
        </template>
      </roundedEdges>
    </div>
  </div>
</template>

<script>
  import roundedEdges from '../../../components/border/roundedEdges'

  export default {
    // 数据
    data: function () {
      return {
        tabKey: 0,
        groupBuyStatus: [
          {
            status: 1,
            describe: '进行中的团',
            groupBuySellInfoList: []
          },
          {
            status: 2,
            describe: '已结束的团',
            groupBuySellInfoList: []
          }
        ]
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      tabChange: function (status) { // 切换标签(分离出来以复用)
        this.tabKey = status
        this.getData(status)
      },
      getData: function (status) {
        console.log('订正状态', parseInt(status))
        let that = this
        this.$portApi.groupBuy.findAllSellInfo(status).then(
          (groupBuySellInfoList) => {
            let groupBuyStatus = that.groupBuyStatus.find(groupBuy => groupBuy.status === parseInt(status))
            groupBuyStatus.groupBuySellInfoList = groupBuySellInfoList
          }
        )
      },
      // 重要的约定：标签(tabs)索引key 等于 团购status.
      handleTabChange: function ({mp}) { // 处理标签改变事件
        this.tabChange(mp.detail.key)
      }
    },
    // 组件注册
    components: {
      roundedEdges
    },
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
      console.log(this.$mp.query.status)
      this.tabKey = !this.$mp.query.status ? 1 : this.$mp.query.status
      this.tabChange(this.tabKey)
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
</style>
