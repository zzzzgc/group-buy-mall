<template>
  <div class="container">
    <!--确认发货-->
    <div style="width: 100%;">
      <i-cell v-if="getUserType === 1" title="发货状态" label="选中后表示确认收到货了">
        <i-switch :value="detail.orderInfo.isDelivery" size="large" @change="handleIsDeliveryChange" slot="footer">
          <view slot="open">已发</view>
          <view slot="close">未发</view>
        </i-switch>
      </i-cell>
      <i-cell v-else title="发货状态" label="选中后表示确认收到货了">
        <div>
          <!--TODO 待添加取货二维码页面-->
          <a href="/pages/customer/order/showOrderQrCode" slot="footer">
            <i-button>取货</i-button>
          </a>
        </div>
      </i-cell>
    </div>
    <!--物流信息-->
    <div style="width: 100%;">
      <i-panel title="物流信息">
        <i-input :value="detail.orderInfo.name" title="收货人" :disabled="!isEdit" @chang="detail.orderInfo.name = $event.mp.detail.value" placeholder="请输入联系人姓名"></i-input>
        <i-input :value="detail.orderInfo.phone" title="手机" :disabled="!isEdit" placeholder="请输入联系人姓名"></i-input>
        <!--选择物流方式-->
        <i-radio-group v-if="isEdit" :current="detail.orderInfo.logisticsType == 1?'配送到家':'用户自提'" @change="handleLogisticsTypeChange">
          <div v-for="(logisticsType, logisticsTypeIndex) in logisticsTypes" :key="logisticsTypeIndex">
            <i-radio position="left" :value="logisticsType.name"></i-radio>
          </div>
        </i-radio-group>
        <div class="radio-group-parent" v-if="detail.orderInfo.logisticsType === 2">
          <radio-group v-if="isEdit" class="radio-group-class" @change="handleNoutoasiakasChange">
            <div v-for="(noutoasiakas, noutoasiakasIndex) in detail.groupBuyNoutoasiakas" :key="noutoasiakasIndex">
              <radio :value="noutoasiakas.id" :id="noutoasiakas.id+'noutoasiakasId'" :checked="false"/>
              <label class="text-other" :for="noutoasiakas.id+'noutoasiakasId'" style="display: inline">{{noutoasiakas.address}}</label>
            </div>
          </radio-group>
        </div>
        <div v-if="detail.orderInfo.logisticsType === 2">
          <i-input title="取货地址" :value="detail.orderInfo.noutoasiakasAddress" disabled placeholder="请在上方选择自提点"></i-input>
        </div>
        <i-input v-else :value="detail.orderInfo.address" title="收货地址" :disabled="!isEdit" placeholder="请输入联系人姓名"></i-input>
        <i-input :value="detail.orderInfo.customerRemark" title="备注" :disabled="!isEdit"></i-input>
        <i-input title="团长备注" :value="detail.orderInfo.merchantRemark" placeholder="请输入备注(可不填)"></i-input>
      </i-panel>
    </div>
    <!--商品展示-->
    <div style="width: 80%;">
      <div class="item" v-for="(product, productIndex) in  detail.products" :key="productIndex">
        <image class="item-image" :src="product.imageUrl" lazy-load mode="aspectFill"></image>
        <div>
          <span class="item-title-name text-info">{{product.name}}</span>
          <span class="item-title-price text-other">{{product.price}}￥ * {{product.number}}</span>
          <i-cell v-if="isEdit">
            <i-input-number :value="product.number" min="0" max="10000" @change="handleProductNumberChange($event, productIndex)"></i-input-number>
          </i-cell>
        </div>
      </div>
    </div>
    <!--合计-->
    <span>合计:{{getTotalPrice}}￥</span>
    <!--团购信息-->
    <div style="width: 100%;">
      <i-panel title="团购信息">
        <i-input :value="orderId" title="订单编号" disabled></i-input>
        <i-input :value="detail.orderInfo.createTime" title="下单时间" disabled></i-input>
      </i-panel>
    </div>
    <!--编辑按钮-->
    <div v-if="!((detail.groupBuy.status === 2)||detail.orderInfo.isDelivery)" style="width: 100%;">
      <i-button v-if="!isEdit" type="primary" :long="true" @click="handleEditButtonClick">编辑团购</i-button>
      <i-button v-else type="primary" :long="true" @click="handleEditAffirmButtonClick">确认编辑结果</i-button>
    </div>
  </div>
</template>

<script>
  export default {
    // 数据
    data: function () {
      return {
        on_off: {
          isEditorderInfo: false
        },
        logisticsTypes: [
          {
            id: 1,
            name: '配送到家',
            disabled: false
          },
          {
            id: 2,
            name: '用户自提',
            disabled: false
          }
        ],
        isEdit: false,
        isCustomer: true,
        orderId: '',
        createTime: '',
        detail: {
          orderInfo: {
            isDelivery: false,
            logisticsType: 0,
            name: '',
            phone: '',
            merchantRemark: '',
            customerRemark: '',
            noutoasiakasId: 0,
            noutoasiakasName: '',
            address: ''
          },
          orderProduct: [
            {
              id: 0,
              productId: 0,
              name: '',
              imageUrl: '',
              price: 0,
              number: 0
            }
          ],
          groupBuy: {
            id: 0,
            status: 0,
            canNoutoasiakas: false,
            canDistribution: false,
            title: '',
            descriptor: ''
          },
          groupBuyNoutoasiakas: [
            {
              address: '',
              name: '',
              id: 0
            }
          ]
        }
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getTotalPrice: function () {
        return this.detail.products.reduce(
          (preValue, curValue, index, array) => {
            // 由于除的是100 不会产生无限循环小数,不用四舍五入到2位小数
            return (preValue * 100 + (curValue.price * 100 * curValue.number)) / 100
          },
          0.0
        )
      },
      // 获取用户类型
      getUserType: function () {
        return this.$store.state.userType
      }
    },
    // 函数集合
    methods: {
      getData: function (orderId) {
        // TODO 加载数据 getDate()
        this.detail = {
          orderInfo: {
            isDelivery: false,
            logisticsType: 1,
            name: 'asdf',
            phone: '18718840426',
            merchantRemark: '',
            customerRemark: '客户备注',
            noutoasiakasId: 0,
            noutoasiakasName: '自提点a',
            noutoasiakasAddress: '广州市白云区拉斯卡的解放军拉萨打开解放流口水的房间拉萨的看风景拉萨的看风景拉斯达克放假',
            address: '广州市白云区拉斯卡的解放军拉萨打开解放流口水的房间拉萨的看风景拉萨的看风景拉斯达克放假',
            createTime: '2018-08-23 04:45:65'
          },
          products: [
            {
              id: 65498765416879,
              productId: 0,
              name: '测试商品',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535021904&di=6cae6a92af3fb1a00894770a957feec7&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ffd039245d688d43f1bec8dd7771ed21b0ef43b49.jpg',
              price: 12.55,
              number: 12
            },
            {
              id: 65498765416879,
              productId: 65498765416879,
              name: '测试商品3',
              imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534427185838&di=f7395e7da2c8423af6b7d8e0066ae609&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20140920%2Fsy_71382031999.jpg',
              price: 12.55,
              number: 12
            }
          ],
          groupBuy: {
            id: 163546749879,
            status: 1,
            canNoutoasiakas: true,
            canDistribution: true,
            title: '团长的团购标题',
            descriptor: '团长的描述信息拉斯柯达解放路卡接收到了房间爱里的水开放接口时代峻峰阿拉萨的看风景阿来得快分阿流口水的房间拉的说法甲方as来得快就'
          },
          groupBuyNoutoasiakas: [
            {
              address: '北京省北京市王府井拉圣诞节疯阿士大夫撒旦撒地方规范狂',
              name: '井口拉斯科',
              id: 6545
            },
            {
              address: '上海省上海市陆家嘴拉萨的看风景卡加水电费离开静安寺地方',
              name: '日撒地方',
              id: 687987
            }
          ]
        }
      },
      handleIsDeliveryChange: function ({mp}) {
        // TODO 请求后端修改发货状态 changeOrderDelivery(orderStatus, orderId)
        this.detail.orderInfo.isDelivery = mp.detail.value
        // let orderStatus = this.detail.isDelivery
      },
      handleEditButtonClick: function () {
        // 进入编辑状态
        this.isEdit = true
      },
      handleEditAffirmButtonClick: function () { // 团长编辑结束,团员还需要编辑物流信息才能结束
        // TODO 提交订正结果到服务 updateOrderProduct(this.detail)
        this.isEdit = false
      },
      handleProductNumberChange: function ({mp}, productIndex) { // 处理商品数量变更
        this.$set(this.detail.products, productIndex, Object.assign({}, this.detail.products[productIndex], {number: mp.detail.value}))
      },
      handleLogisticsTypeChange: function ({mp}) {
        if (mp.detail.value === '配送到家') {
          this.detail.orderInfo.logisticsType = 1
        } else {
          this.detail.orderInfo.logisticsType = 2
        }
      },
      handleNoutoasiakasChange: function ({mp}) {
        console.log(mp.detail.value)
        this.detail.orderInfo.noutoasiakasId = mp.detail.value
        console.log(this.detail.orderInfo.noutoasiakasId)
        let noutoasiakas = this.detail.groupBuyNoutoasiakas.find(
          (noutoasiakas) => {
            console.log(noutoasiakas.id, this.detail.orderInfo.noutoasiakasId)
            return noutoasiakas.id === parseInt(this.detail.orderInfo.noutoasiakasId)
          }
        )
        console.log(noutoasiakas)
        this.detail.orderInfo.noutoasiakasName = noutoasiakas.name
        this.detail.orderInfo.noutoasiakasAddress = noutoasiakas.address
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
      // TODO 临时修改
      if (this.$mp.query.orderId) {
        this.orderId = this.$mp.query.orderId
        this.isCustomer = (/^true$/).test(this.$mp.query.isCustomer)
        console.log(this.isCustomer)
        this.getData(this.orderId)
      } else {
        this.getData(this.orderId)
      }
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
  .item {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px #888888;
    .item-image {
      margin: 2px;
      width: 80px;
      height: 80px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .item-title-name {
      /* !*display: inline-block;*!
       position: relative;
       top: -55px;
       !*top: -55px;*!
       left: 0px;*/
    }
    .item-title-price {
      display: block;
      /*position: relative;
      top: -18px;
      !*top: -55px;*!
      left: -90px;*/
    }
  }

  .radio-group-parent {
    margin-left: 35px;
    .radio-group-class {
      display: inline;
      background-color: white;
    }
  }

</style>
