<template>
  <div class="container">

    <!--
      on_off.isEdit LogisticsInfo = isEditLogisticsInfo
      detail.logistics  Info = orderInfo

    -->
    <div>
      <i-drawer mode="right" :visible="isEditLogisticsInfo" mask-closable="false">
        <view class="demo-container">
          <!--可能商家只开通其中一个物流渠道,导致没得选-->
          <i-tabs :current="getLogisticsType" @change="handleTypeLogisticsChange">
            <i-tab key="1" title="配送到家"></i-tab>
            <i-tab key="2" title="自提"></i-tab>
          </i-tabs>
          <div v-if="getLogisticsType">
            <!--配送到家-->
            <i-input :value="orderInfo.name" title="联系人姓名" placeholder="请输入联系人姓名"></i-input>
            <i-input :value="orderInfo.phone" title="联系电话" placeholder="请输入联系电话"></i-input>
            <i-input :value="orderInfo.address" title="收获地址" placeholder="请输入收获完整地址,包含省市区和详细地址"></i-input>
            <i-input :value="orderInfo.customerRemark" title="备注" placeholder="请输入备注"></i-input>
          </div>
          <div v-else>
            <!--自提-->
            <i-input :value="orderInfo.name" title="联系人姓名" placeholder="请输入联系人姓名"></i-input>
            <i-input :value="orderInfo.phone" title="联系电话" placeholder="请输入联系电话"></i-input>
            <i-panel title="在下方选择自行提取货物的地点">
              <i-radio-group :current="orderInfo.noutoasiakasId" @change="handleNoutoasiakasChange">
                <div v-for="(noutoasiakas, noutoasiakasIndex) in detail.allNoutoasiakas" :key="noutoasiakasIndex">
                  <i-radio position="left" :value="noutoasiakas.address"></i-radio>
                </div>
              </i-radio-group>
            </i-panel>
            <i-input :value="orderInfo.customerRemark" title="备注" placeholder="请输入备注(可选)"></i-input>
          </div>
          <i-button @click="addOrUpdateOrderClick(1)" type="primary">确定</i-button>
          <i-button @click="addOrUpdateOrderClick(0)" type="primary">取消</i-button>
        </view>
      </i-drawer>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      // 使用model， 这儿2个属性，
      // prop说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，
      // event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'orderInfo',
      event: 'infoChange'
    },
    // 数据
    data: function () {
      return {
        detail: {}
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: {
      isEditLogisticsInfo: Boolean,
      canDistribution: Boolean,
      canNoutoasiakas: Boolean
    },
    // 计算属性
    computed: {
      getLogisticsType: function () {
        return this.orderInfo.logisticsType ? this.orderInfo.logisticsType : (this.canDistribution ? 1 : 2)
      }
    },
    // 函数集合
    methods: {
      getData: function () {
        this.detail = {}
        // TODO 通过服务加载数据,根据openId(研发中)
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
      this.getData()
      // options = this.$root.$mp.query
      // options = this.$mp.query.xxx
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
</style>
