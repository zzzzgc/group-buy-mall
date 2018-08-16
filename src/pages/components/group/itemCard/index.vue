<template>
  <div>
    <div class="item-card-block" v-for="(groupBuyInfo, groupBuyIndex) in groupBuysInfo" :key="groupbuyIndex">
      <i-swipeout :actions="swipeOutActions"  @change.stop="handleActionsChange($event, groupBuyIndex)">
        <view slot="content">
          <i-cell :title="groupBuyInfo.title" label="1.向左滑动可选择操作2.单击可以继续编辑和查看团购" @click="handleItemClick($event, groupBuyIndex)">
            <span class="text-other">团购编码: {{groupBuyInfo.groupBuyId}}</span><br>
            <span class="text-other">更新时间: {{groupBuyInfo.updateDate}}</span>
          </i-cell>
        </view>
      </i-swipeout>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      // 使用model， 这儿2个属性，
      // prop说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，
      // event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'groupBuysInfo',
      event: 'groupBuysInfoChange'
    },
    // 数据
    data: function () {
      return {
        actions: [
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
        ]
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    /**
     * groupBuysInfo的item
     * {
            title: '第一个团的团标题',
            describe: '第一个团的信息',
            updateDate: '2018-08-20',
            sellTotalPrice: 12053.5
          },
     */
    props: {
      groupBuysInfo: Array,
      swipeOutActions: Array
    },
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      change: function () { // 修改外部的属性
        this.emit('groupBuysInfoChange', this.groupBuysInfo)
      },
      handleActionsChange: function (event, groupBuyIndex) { // 处理选择动作子项
        event.mp.detail.groupBuyIndex = groupBuyIndex
        this.$emit('handleActionsChange', event)
      },
      handleItemClick: function (event, groupBuyIndex) { // 处理节点击列表子项
        event.mp.detail.groupBuyIndex = groupBuyIndex
        this.$emit('handleItemClick', event)
      }
    },
    // 组件注册
    component: {},
    // 侦听属性
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .item-card-block {
    border-radius: 20px;
    margin: 0 20px 20px 20px;
  }
</style>
