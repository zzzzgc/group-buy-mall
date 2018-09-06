<template>
  <div class="container">
    <div style="width: 100%;">
      <i-tabs :current="tabKey" @change="handleTabChange">
        <!--约定 0未开团  1开团了-->
        <i-tab :key="0" title="未开始">
        </i-tab>
        <i-tab :key="1" title="进行中">
        </i-tab>
        <i-tab :key="2" title="已结束">
        </i-tab>
      </i-tabs>
      <div v-if="tabKey == groups[0].status">
        <item v-model="groups[0].groupBuy" :swipeOutActions="swipeOutActionsByOn" @handleActionsChange="handleActionsChange($event, groups[0].status)" @handleItemClick="handleItemClick($event, groups[0].status)">
        </item>
      </div>
      <div v-if="tabKey == groups[1].status">
        <item v-model="groups[1].groupBuy" :swipeOutActions="swipeOutActionsByOff" @handleActionsChange="handleActionsChange($event, groups[1].status)" @handleItemClick="handleItemClick($event, groups[1].status)">
        </item>
      </div>
      <div v-if="tabKey == groups[2].status">
        <item v-model="groups[2].groupBuy" :swipeOutActions="swipeOutActionsByOther" @handleActionsChange="handleActionsChange($event, groups[2].status)" @handleItemClick="handleItemClick($event, groups[2].status)">
        </item>
      </div>
    </div>
  </div>
</template>

<script>
  import item from '../../../components/group/itemCard'
  import card from '../../../components/base/card'

  export default {
    // 数据
    data: function () {
      return {
        count: 0,
        tabKey: '0',
        groups: [
          {
            status: '0',
            groupBuy: []
          },
          {
            status: 1,
            groupBuy: []
          },
          {
            status: 2,
            groupBuy: []
          }
        ],
        swipeOutActionsByOn: [
          {
            name: '开团',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'flag',
            background: '#2d8cf0'
          },
          {
            name: '删除',
            width: 100,
            color: '#fff',
            fontsize: '20',
            icon: 'close',
            background: '#ff0000'
          }
        ],
        swipeOutActionsByOff: [
          {
            name: '关团',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'flag',
            background: '#2d8cf0'
          },
          {
            name: '删除',
            width: 100,
            color: '#fff',
            fontsize: '20',
            icon: 'close',
            background: '#ff0000'
          }
        ],
        swipeOutActionsByOther: [
          {
            name: '删除',
            width: 100,
            color: '#fff',
            fontsize: '20',
            icon: 'close',
            background: '#ff0000'
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
      // 重要的约定：标签(tabs)索引key 等于 团购status.
      handleTabChange: function ({mp}) { // 处理标签改变事件
        this.tabChange(mp.detail.key)
      },
      tabChange: function (status) { // 切换标签(分离出来以复用)
        this.tabKey = status
        this.getData(status)
        // this.$set(this.groups, this.tabKey, Object.assign({}, {groupBuy: this.getData(this.tabKey)}))
      },
      getData: function (status) { // 获取团购列表
        this.count += 1
        this.$restfulApi.groupBuy.findByStatus(this.$store.state.userId, status).then(
          (groupBuys) => {
            console.log(groupBuys._embedded.groupBuys)
            this.$set(this.groups[this.tabKey], 'groupBuy', groupBuys._embedded.groupBuys)
          }
        )
      },
      handleActionsChange: function (event, status) { // 选择滑动菜单的子项后
        // x 坐标 status   y坐标  groupBuyIndex   z坐标  actionIndex
        let actionIndex = event.mp.detail.index
        let groupBuyIndex = event.mp.detail.groupBuyIndex
        // 团购编码
        let groupBuyId = this.groups[status].groupBuy[groupBuyIndex].id
        let groupBuy = this.groups[status].groupBuy[groupBuyIndex]
        // let that = this
        switch (actionIndex) {
          case 0:
            // 开启/关闭团购
            switch (status) {
              case this.groups[0].status:
                // 0 -> 1
                groupBuy.status = this.groups[1].status
                console.log('开启团购', groupBuyIndex, '团购编码:', groupBuyId)
                break
              case this.groups[1].status:
                // 1 -> 2
                groupBuy.status = this.groups[2].status
                console.log('关闭团购', groupBuyIndex, '团购编码:', groupBuyId)
                break
              default:
                // 2 -> 3
                groupBuy.status = 3
                console.log('删除团购', groupBuyIndex, '团购编码:', groupBuyId)
            }
            break
          case 1:
            // ? -> 3
            groupBuy.status = 3
            console.log('删除团购', groupBuyIndex, '团购编码:', groupBuyId)
            break
          default:
            console.log('异常的值')
        }
        this.$portApi.groupBuy.saveGroupBuy(groupBuy).then(
          (response) => {
            this.tabChange(status)
          }
        )
        // 重新加载一次
      },
      handleItemClick: function ({mp}, status) { // 列表子项被选中
        let groupBuyIndex = mp.detail.groupBuyIndex
        // 团购编码
        let groupBuyId = this.groups[status].groupBuy[groupBuyIndex].id
        console.log(groupBuyId)
        // 团购名称
        let title = this.groups[status].groupBuy[groupBuyIndex].title
        wx.navigateTo({
          url: `/pages/merchant/groupBuy/detail/main?groupBuyId=${groupBuyId}&status=${status}&title=${title}`
        })
      }
    },
    // 组件注册
    // component: {
    //   item
    // },
    components: {
      item,
      card
    },
    // 侦听属性
    watch: {},
    created () { // vue实例创建
      // console.log('page index created', this)
    },
    onLoad () { // vue 初始化加载
      // console.log('page index onLoad', this)
      // this.tabKey = this.$mp.query.status
      // this.tabKey = this.$mp.query.status
      // this.$set(this.groups, this.tabKey, Object.assign({}, this.groups[this.tabKey], {groupBuy: this.getData(this.tabKey)}))
    },
    mounted () { // vue加载完毕
      // console.log('mounted', this)
    },
    onShow () { // 小程序页面显示
      if (this.$mp.query.status !== undefined) {
        this.tabKey = this.$mp.query.status
      }
      this.tabChange(this.tabKey)
    },
    onUnload () { // 小程序页面出栈
      // console.log('onUnload', this)
    },
    onHide () { // 小程序页面隐藏
      // console.log('onHide', this)
    }
  }
</script>

<style lang="scss" scoped>
</style>
