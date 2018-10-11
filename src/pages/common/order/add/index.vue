<!--<template>-->
  <!--<div class="container">-->
    <!--&lt;!&ndash;物流信息&ndash;&gt;-->
    <!--<div style="width: 100%;">-->
      <!--<i-drawer mode="right" :visible="isEditLogisticsInfo" mask-closable="false">-->
        <!--<view class="demo-container">-->
          <!--<i-tabs :current="order.logisticsType" @change="handleTypeLogisticsChange">-->
            <!--<i-tab v-if="groupBuy.canDistribution" key="1" title="配送到家"></i-tab>-->
            <!--<i-tab v-if="groupBuy.canNoutoasiakas" key="2" title="自提"></i-tab>-->
          <!--</i-tabs>-->
          <!--<div v-if="order.logisticsType == 1">-->
            <!--&lt;!&ndash;配送到家&ndash;&gt;-->
            <!--<i-input :value="order.userName" title="联系人姓名" placeholder="请输入联系人姓名"-->
                     <!--@change="orderChange('userName', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="order.phone" title="联系电话" placeholder="请输入联系电话"-->
                     <!--@change="orderChange('phone', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="order.address" title="收获地址" placeholder="请输入收获完整地址,包含省市区和详细地址"-->
                     <!--@change="orderChange('address', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="order.customerRemark" title="备注" placeholder="请输入备注"-->
                     <!--@change="orderChange('customerRemark', $event.mp.detail.detail.value)"></i-input>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--&lt;!&ndash;自提&ndash;&gt;-->
            <!--<i-input :value="order.userName" title="联系人姓名" placeholder="请输入联系人姓名"-->
                     <!--@change="orderChange('userName', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-input :value="order.phone" title="联系电话" placeholder="请输入联系电话"-->
                     <!--@change="orderChange('phone', $event.mp.detail.detail.value)"></i-input>-->
            <!--<i-panel title="在下方选择自行提取货物的地点">-->
              <!--<radio-group class="radio-group-class" @change="handleNoutoasiakasChange">-->
                <!--<div v-for="(noutoasiakas, noutoasiakasIndex) in groupBuy.groupBuyNoutoasiakases"-->
                     <!--:key="noutoasiakasIndex">-->
                  <!--<radio :value="noutoasiakasIndex" :id="noutoasiakas.id+'noutoasiakasId'" :checked="false"/>-->
                  <!--<label class="text-other" :for="noutoasiakas.id+'noutoasiakasId'" style="display: inline">{{noutoasiakas.address}}</label>-->
                <!--</div>-->
              <!--</radio-group>-->
            <!--</i-panel>-->
            <!--<i-input :value="order.customerRemark" title="备注" placeholder="请输入备注(可选)" @change="orderChange('customerRemark', $event.mp.detail.detail.value)"></i-input>-->
          <!--</div>-->
          <!--<i-button @click="addOrUpdateOrderClick(1)" type="primary">确定</i-button>-->
          <!--<i-button @click="addOrUpdateOrderClick(0)" type="primary">取消</i-button>-->
        <!--</view>-->
      <!--</i-drawer>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--model: {-->
      <!--// 使用model， 这儿2个属性，-->
      <!--// prop说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，-->
      <!--// event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。-->
      <!--prop: 'order',-->
      <!--event: 'orderChange'-->
    <!--},-->
    <!--// 数据-->
    <!--data: function () {-->
      <!--return {-->
        <!--detail: {}-->
      <!--}-->
    <!--},-->
    <!--// 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props-->
    <!--props: [-->
      <!--// groupBuy 需要包含groupBuyProduct和groupBuyNoutoasiakases, 并且groupBuyProduct需要包含groupBuyProductImage.-->
      <!--'groupBuy',-->
      <!--'userId',-->
      <!--'isEditLogisticsInfo'-->
    <!--],-->
    <!--// 计算属性-->
    <!--computed: {},-->
    <!--// 函数集合-->
    <!--methods: {-->
      <!--// 切换物流方式-->
      <!--handleTypeLogisticsChange: function ({ mp }) {-->
        <!--this.order.logisticsType = mp.detail.key-->
      <!--},-->
      <!--// 修改订单-->
      <!--orderChange: function (key, value) {-->
        <!--this.order[key] = value-->
      <!--},-->
      <!--// 修改自提点-->
      <!--handleNoutoasiakasChange: function ({ mp }) {-->
        <!--let noutoasiakasIndex = parseInt(mp.detail.value)-->
        <!--let noutoasiakas = this.groupBuy.groupBuyNoutoasiakases[noutoasiakasIndex]-->
        <!--console.log(noutoasiakasIndex, noutoasiakas)-->
        <!--this.order.noutoasiakasId = noutoasiakas.id-->
        <!--this.order.noutoasiakasName = noutoasiakas.nickName-->
        <!--this.order.noutoasiakasAddress = noutoasiakas.address-->
      <!--},-->
      <!--// 提交,添加或修改订单-->
      <!--addOrUpdateOrderClick: function (status) {-->
        <!--if (!status) {-->
          <!--this.isEditLogisticsInfo = false-->
          <!--return-->
        <!--}-->
        <!--let msg = this.verifyOrder()-->
        <!--if (msg) {-->
          <!--this.$tips.toast(msg, 'none', 2000)-->
        <!--}-->
        <!--let that = this-->
        <!--let totalPrice = this.groupBuy.groupBuyProducts.reduce(-->
          <!--(preValue, curValue, index, array) => {-->
            <!--// 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数-->
            <!--return (preValue * 1000 + (curValue.price * 1000 * curValue.number)) / 1000-->
          <!--},-->
          <!--0.0-->
        <!--)-->
        <!--// 把购买的商品数据载入到订单中-->
        <!--this.order.userHeadImage = this.$store.state.userInfo.avatarUrl-->
        <!--this.order.orderProducts = []-->
        <!--this.order.totalPrice = totalPrice-->
        <!--this.order.groupBuyName = this.groupBuy.title-->
        <!--console.log(this.order.groupBuy)-->
        <!--this.groupBuy.groupBuyProducts.forEach(-->
          <!--groupBuyProduct => {-->
            <!--console.log(groupBuyProduct.id)-->
            <!--if (groupBuyProduct.number > 0) {-->
              <!--let orderProduct = {-->
                <!--// imageUrl: '',-->
                <!--name: groupBuyProduct.name,-->
                <!--number: groupBuyProduct.number,-->
                <!--price: groupBuyProduct.price,-->
                <!--groupBuyProductId: groupBuyProduct.id,-->
                <!--groupBuyProduct: groupBuyProduct,-->
                <!--imageUrl: groupBuyProduct.groupBuyProductImages && groupBuyProduct.groupBuyProductImages[0] ? groupBuyProduct.groupBuyProductImages[0].url : ''-->
              <!--}-->
              <!--that.order.orderProducts.push(orderProduct)-->
            <!--}-->
          <!--}-->
        <!--)-->
        <!--let thar = this-->
        <!--this.$portApi.order.save(this.order, this.groupBuy.id, this.detail.user.id).then(-->
          <!--(response) => {-->
            <!--// 跳转到支付页面-->
            <!--wx.redirectTo({-->
              <!--url: `/pages/customer/payment/show/main?paymentAmount=${totalPrice}&userId=${thar.userId}`-->
            <!--})-->
            <!--this.isEditLogisticsInfo = false-->
          <!--}-->
        <!--)-->
      <!--}-->
    <!--},-->
    <!--// 组件注册-->
    <!--component: {},-->
    <!--// 侦听属性-->
    <!--watch: {},-->
    <!--created: function () { // vue实例创建-->
      <!--// console.log('page index created', this)-->
    <!--},-->
    <!--onLoad: function () { // vue 初始化加载-->
      <!--this.getData()-->
      <!--// options = this.$root.$mp.query-->
      <!--// options = this.$mp.query.xxx-->
      <!--// console.log('page index onLoad', this)-->
    <!--},-->
    <!--mounted: function () { // vue加载完毕-->
      <!--// console.log('mounted', this)-->
    <!--},-->
    <!--onShow: function () { // 小程序页面显示-->
      <!--// options = this.$root.$mp.appOptions-->
      <!--// console.log('onShow', this)-->
    <!--},-->
    <!--onUnload: function () { // 小程序页面出栈-->
      <!--// console.log('onUnload', this)-->
    <!--},-->
    <!--onHide: function () { // 小程序页面隐藏-->
      <!--// console.log('onHide', this)-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--</style>-->


