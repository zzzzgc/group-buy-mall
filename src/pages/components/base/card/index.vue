<!--
具有相同模板的 滑动菜单
-->
<template>
  <div class="item-card-block" @click="handleItemClick">
    <i-swipeout :actions="swipeOutActions"  @change="handleActionsChange($event)">
      <view slot="content">
        <slot></slot>
      </view>
    </i-swipeout>
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
      swipeOutActions: Array
    },
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      handleActionsChange: function (event) { // 处理选择动作子项
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
  .card-content {
    border: 1px solid #000000;
    width: 95%;
    height: 100%;
    border-radius: 10px;
  }
</style>
