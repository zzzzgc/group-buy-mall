<template>
  <div class="container">
    <div class="content">
      <i-panel v-if="isEdit" title="团购信息" id="head">
        <i-input :value="groupBuySetting.title" title="团购标题" disabled/>
        <i-input :value="groupBuyId" title="团购编号" disabled/>
        <i-input :value="getStatusNickname" title="团购状态" disabled/>
      </i-panel>
      <i-panel title="基础信息" id="head">
        <i-input :value="groupBuySetting.title" @change="titleChange" title="我的标题" placeholder="请输入标题"/>
        <i-input :value="groupBuySetting.describe" @change="describeChange" title="我的描述" placeholder="请输入描述"/>
      </i-panel>
      <i-panel title="物流配置">
        <i-cell-group>
          <i-cell title="配送到家" label="团员可以填写地址由商家邮寄货物">
            <i-switch :value="groupBuySetting.distriBution" @change="distributionChange" slot="footer"/>
          </i-cell>
          <i-cell title="用户自提" label="团员可以到指定地点拿货">
            <i-switch :value="groupBuySetting.noutoasiakasBution" @change="noutoasiakasChange" slot="footer"/>
          </i-cell>
        </i-cell-group>
      </i-panel>
      <i-panel title="自提点配置" v-if="groupBuySetting.noutoasiakasBution">
        <i-cell-group>
          <i-cell v-for="(noutoasiakasInfo, index) in groupBuySetting.noutoasiakasAddresses"
                  :key="noutoasiakasInfo.addressId" :title="noutoasiakasInfo.nickName" :label="noutoasiakasInfo.address">
            <!--<span class="text-other"-->
                  <!--style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;">{{}}</span>-->
            <i-switch :value="noutoasiakasInfo.checked" @change="noutoasiakasAddressesChange(index)" slot="footer"/>
          </i-cell>
          <i-cell>
            <i-button shape="circle" size="small" @click="addNoutoasiakasOpen">+ 添加自提点</i-button>
          </i-cell>
        </i-cell-group>
      </i-panel>
      <i-drawer mode="right" :visible="on_off.addNoutoasiakasSwitch" mask-closable="false">
        <view class="demo-container">
          <i-cell-group>
            <i-cell is-link>
              <picker id="regionPicker" mode="region" @change="bindRegionChange" :value="tempNoutoasiakasInfo.region"
                      :custom-item="customItem">
                <view class="picker">
                  <div v-if="tempNoutoasiakasInfo.region[0]">
                    {{tempNoutoasiakasInfo.region[0]}}{{tempNoutoasiakasInfo.region[1]}}{{tempNoutoasiakasInfo.region[2]}}
                  </div>
                  <div class="text-button-mini" v-else>
                    点击修改省份地址
                  </div>
                </view>
              </picker>
            </i-cell>
          </i-cell-group>
          <i-input :value="tempNoutoasiakasInfo.detailAddress" @change="detailAddressChange" title="详细地址"
                   placeholder="请输入详细地址"/>
          <i-input :value="tempNoutoasiakasInfo.nickName" @change="nickNameChange" title="自提点昵称"
                   placeholder="请输入自提点昵称"/>
          <i-button @click="addNoutoasiakasStatus(1)" type="primary">确定</i-button>
          <i-button @click="addNoutoasiakasStatus(0)" type="primary">取消</i-button>
        </view>
      </i-drawer>
      <i-panel title="商品配置">
        <!--<aep v-if='groupBuySetting.products' :products="groupBuySetting.products" @infoChange="addAndEditProductChange"></aep>-->
        <aep v-if='groupBuySetting.products' v-model="groupBuySetting.products"></aep>
      </i-panel>
    </div>
    <div class="from-button">
      <i-button v-if="!isEdit" long="true" type="success" @click="addFormSubmit" id="foot">确认新建团购</i-button>
      <i-button v-else long="true" type="success" @click="editFormSubmit" id="foot">确认修改团购</i-button>
    </div>
    <!--<i-input :value="value6" type="number" right title="消费总额" mode="wrapped" placeholder="询问收银员后输入"/>-->
    <!--<i-input :value="value7" type="number" right error title="不参与优惠金额" mode="wrapped" placeholder="询问收银员后输入"/>-->

    <!--</form>-->
    <!--自提点modal-->
    <!--<i-modal i-class="modal_class" title="标题" :visible="on_off.addNoutoasiakasSwitch" @ok="addNoutoasiakasStatus(1)" @cancel="addNoutoasiakasStatus(0)">-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import map from '../../../../common/js/map.js'
  import aep from '../../../components/product/addAndEditProduct'
  // const { $Toast } = require('../../../../../static/dist/base/index')
  // import card from '../../../components/base/card'

  export default {
    // 数据
    data: {
      // userLocationInfo: {
      //   latitude: 0,
      //   longitude: 0
      // },
      isEdit: false,
      groupBuyStatus: -1,
      groupBuyId: -1,
      // 以上是编辑必备参数
      customItem: '全部',
      groupBuySetting: {
        title: '',
        describe: '',
        // 是否可以配送
        distriBution: true,
        // 是否可以自提
        noutoasiakasBution: true,
        // 自提点
        noutoasiakasAddresses: [
        ],
        products: [
          // {
          //   name: '测试商品0号',
          //   price: '120',
          //   describe: '阿里斯顿会计分录卡萨丁交付了肯德基安防监控',
          //   limitQuantity: true,
          //   quantity: 123,
          //   images: [
          //     {
          //       url: 'http://img3.imgtn.bdimg.com/it/u=1357902460,900753575&fm=27&gp=0.jpg',
          //       productImagesId: 0
          //     },
          //     {
          //       url: 'http://img4.imgtn.bdimg.com/it/u=737638649,2148164357&fm=27&gp=0.jpg',
          //       productImagesId: 1
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1208276097,1809955355&fm=27&gp=0.jpg',
          //       productImagesId: 2
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
          //       productImagesId: 3
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
          //       productImagesId: 4
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
          //       productImagesId: 5
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
          //       productImagesId: 6
          //     }
          //   ]
          // },
          // {
          //   name: '测试商品1号',
          //   price: '12.525',
          //   describe: '阿里山的房间埃里克森电话费送大礼疯狂拉速度快放假啦开始的减肥阿里山的咖啡机埃里克圣诞节福利卡时代峻峰拉克丝大姐夫拉克丝大姐夫拉克丝大姐夫拉克丝大姐夫拉客阿斯蒂芬蔚蓝',
          //   limitQuantity: true,
          //   quantity: 123,
          //   images: [
          //     {
          //       url: 'http://img3.imgtn.bdimg.com/it/u=1357902460,900753575&fm=27&gp=0.jpg',
          //       productImagesId: 0
          //     },
          //     {
          //       url: 'http://img4.imgtn.bdimg.com/it/u=737638649,2148164357&fm=27&gp=0.jpg',
          //       productImagesId: 1
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1208276097,1809955355&fm=27&gp=0.jpg',
          //       productImagesId: 2
          //     },
          //     {
          //       url: 'http://img2.imgtn.bdimg.com/it/u=1302766499,1339989639&fm=11&gp=0.jpg',
          //       productImagesId: 3
          //     }
          //   ]
          // }
        ]
      },
      on_off: {
        addNoutoasiakasSwitch: false
      },
      tempNoutoasiakasInfo: { // 临时记录自提点
        // 以后会添加定位校准,自动回填省市信息
        // latitude: 0,
        // longitude: 0,
        address: '',
        region: ['北京市', '地极限', '其他'],
        detailAddress: '拉开圣诞节福利科技',
        nickName: '家里',
        addressId: -1,
        checked: true
      },
      noutoasiakasInfoTemplate: { // 自提点模板
        address: '',
        region: [],
        detailAddress: '',
        nickName: '',
        addressId: -1,
        checked: true
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      getStatusNickname: function () {
        return this.getGroupBuyStatus[this.groupBuyStatus]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ])
    },
    // 函数集合
    methods: {
      addFormSubmit: function () { // 提交表单
        let msg = this.formSubmitVerify()
        if (msg) {
          this.$tips.toast(msg, 'none', 2000)
          return
        }
        wx.navigateTo({
          url: '../manage/main?status=0'
        })
      },
      editFormSubmit: function () { // 提交表单
        let msg = this.formSubmitVerify()
        if (msg) {
          this.$tips.toast(msg, 'none', 2000)
          return
        }
        wx.navigateTo({
          url: '../manage/main?status=0'
        })
      },
      formSubmitVerify: function (e) { // 提交表单的验证,错误就返回信息,没错就返回false
        if (this.groupBuySetting.title === '') return '标题为空'
        // if (this.describe === undefined) return '标题为空'
        if (this.groupBuySetting.noutoasiakasBution === true) {
          if (this.groupBuySetting.noutoasiakasAddresses.length < 1) return '至少需要添加一个自提点'
          // for (var num = 0; num <= this.groupBuySetting.noutoasiakasAddresses.length; num++) {
          //   if (this.groupBuySetting.noutoasiakasAddresses[num].address === undefined) return '地址'
          //   if (this.groupBuySetting.noutoasiakasAddresses[num].region.length < 3) return '请选择您的省份地址'
          //   if (this.groupBuySetting.noutoasiakasAddresses[num].region.length < 3) return '请选择您的省份地址'
          // }
        }
        if (this.groupBuySetting.products.length < 1) return '至少需要添加一个商品'
        for (let productIndex = 0; productIndex < this.groupBuySetting.products.length; productIndex++) {
          let product = this.groupBuySetting.products[productIndex]
          if (product.name === '') return '第' + (productIndex + 1) + '个商品的商品名未填写'
          if (product.price === '') return '第' + (productIndex + 1) + '个商品的价格未填写'
          if (!product.limitQuantity) {
            if (product.quantity === 0) return '第' + (productIndex + 1) + '个商品的库存数量未填写'
          }
          if (product.images.length < 1) return '第' + (productIndex + 1) + '个商品至少需要一张图片'
        }
      },
      formReset: function () { // 重置数据
        console.log('form发生了reset事件')
      },
      nameChange: function (poprsParam) {
        this.test = poprsParam
      },
      titleChange: function ({mp}) {
        this.groupBuySetting.title = mp.detail.detail.value
      },
      describeChange: function ({mp}) {
        this.groupBuySetting.describe = mp.detail.detail.value
      },
      distributionChange: function ({mp}) { // 配送订正
        this.groupBuySetting.distriBution = mp.detail.value
      },
      noutoasiakasChange: function ({mp}) { // 自提点订正
        this.groupBuySetting.noutoasiakasBution = mp.detail.value
      },
      noutoasiakasAddressesChange: function (index) { // 自提点配置订正
        this.groupBuySetting.noutoasiakasAddresses[index].checked = !this.groupBuySetting.noutoasiakasAddresses[index].checked
      },
      detailAddressChange: function ({mp}) { // 自提点配置订正
        this.tempNoutoasiakasInfo.detailAddress = mp.detail.detail.value
      },
      nickNameChange: function ({mp}) { // 自提点配置订正
        this.tempNoutoasiakasInfo.nickName = mp.detail.detail.value
      },
      addAndEditProductChange: function (index, product) { // 新增或修改的商品信息
        /**
         * 判断是否是新增商品,非新增需要直接赋值(避免出现字符串写入又因为状态更新导致键入的内容清空并且又覆盖一次[简称:抖动的字符]),
         * 新增商品需要使用$set设置到数组中.vue的数组更新的时候不会刷新状态的
         */
        // console.log('最大的索引', (this.groupBuySetting.products.length - 1 + 1), '操作索引', index, '结果', ((this.groupBuySetting.products.length - 1) < index) ? '不更新状态' : '更新状态')
        if ((this.groupBuySetting.products.length - 1) < index) {
          this.$set(this.groupBuySetting.products, index, product)
        } else {
          // this.$set(this.groupBuySetting.products, index, product)
          this.groupBuySetting.products[index] = product
        }
        // this.$set(this.groupBuySetting.products, index, product)
        // console.log('订正后组件的值', index, this.groupBuySetting.products[index])
      },
      addNoutoasiakasOpen: function () { // 添加自提点的弹框
        var that = this
        map.getUserLocation(
          location => {
            that.userLocationInfo = location
          }
        )
        this.on_off.addNoutoasiakasSwitch = true
      },
      addNoutoasiakasFilter: function () {
        if (this.tempNoutoasiakasInfo.region.length !== 3 && this.tempNoutoasiakasInfo.region[0] === undefined && this.tempNoutoasiakasInfo.region[1] === undefined && this.tempNoutoasiakasInfo.region[2] === undefined) {
          return '自提点城市地址未填写'
        }
        if (this.tempNoutoasiakasInfo.detailAddress === '') {
          return '自提点详细地址未填写'
        }
        if (this.tempNoutoasiakasInfo.nickName === '') {
          return '自提点昵称未填写'
        }
        return false
      },
      addNoutoasiakasStatus: function (status) { // 添加自提点
        if (status === 0) {
          this.on_off.addNoutoasiakasSwitch = false
        } else {
          let msg = this.addNoutoasiakasFilter()
          if (msg) {
            this.$tips.toast(msg, 'none', 2000)
            return
          }
          console.log('点击成功,获取的信息如下', this.tempNoutoasiakasInfo)
          // TODO 添加到用户的自提点信息并返回id
          // console.log(this.tempNoutoasiakasInfo.region.join(''))
          this.tempNoutoasiakasInfo.address = this.tempNoutoasiakasInfo.region.join('') + this.tempNoutoasiakasInfo.detailAddress
          this.groupBuySetting.noutoasiakasAddresses.push(this.tempNoutoasiakasInfo)
          this.tempNoutoasiakasInfo = Object.assign({}, this.noutoasiakasInfoTemplate)
          this.on_off.addNoutoasiakasSwitch = false
        }
      },
      bindRegionChange: function ({mp}) { // 选择地区
        this.tempNoutoasiakasInfo.region = mp.detail.value
        console.log('选择的地区', mp.detail.value, this.tempNoutoasiakasInfo.region)
      },
      openUserSelectMap: function () {
        var that = this
        map.getUserSelectLocation(
          location => {
            console.log(location)
            that.tempNoutoasiakasInfo = Object.assign({}, that.tempNoutoasiakasInfo, location)
          }
        )
      },
      handleClickImage: function (productIndex, imageIndex) { // 选中图片
        // this.changeShowImagesAction(true)
        this.showImagesActions = true
        // console.log(this.showImagesAction)
        this.selectImage.productIndex = productIndex
        this.selectImage.imageIndex = imageIndex
      },
      changeShowImagesAction: function (value) { // 活动列表是否显示
        this.showImagesActions = value
      },
      handleClickItem: function (e) { // 选中活动列表的子项后
        console.log('点击活动后弹出的内容', e)
        this.changeShowImagesAction(false)
      }
    },
    // 组件注册
    components: {
      aep
      // card
    },
    // 侦听属性
    watch: {},
    onShow () { // 小程序页面显示
      // console.log('onShow', this)
      // editStatus
      if (this.$mp.query.groupBuyStatus !== undefined) {
        wx.setNavigationBarTitle({
          title: '编辑团购'
        })
        this.isEdit = true
        this.groupBuyStatus = this.$mp.query.groupBuyStatus
        this.groupBuyId = this.$mp.query.groupBuyId
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-info {
    width: 100%;
    display: flex;
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }

  .content {
    width: 100%;
    margin-bottom: 25px;
  }

  .modal_class {
    view {
    }
    /*border: 1px solid #000000;*/
  }

  .partial_address {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .demo-container {
    /*width:80vw;*/
    width: 80%;
    height: 100%;
    background: #fff;
  }

  .from-button {
    width: 100%;
    position: fixed;
    bottom: 0%;
    opacity:0.8;
    /*left: 30px;*/

  }
</style>
