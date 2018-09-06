<template>
  <div class="container">
    <div class="content">
      <i-panel v-if="isEdit" title="团购信息(不可改)" id="head">
        <i-input :value="groupBuy.title" title="团购标题" disabled/>
        <i-input :value="groupBuyId" title="团购编号" disabled/>
        <i-input :value="getStatusNickname" title="团购状态" disabled/>
      </i-panel>
      <i-panel title="基础信息" id="head">
        <i-input :value="groupBuy.title" @change="groupBuyChang('title', $event, true)" title="我的标题" placeholder="请输入标题"/>
        <i-input :value="groupBuy.descriptor" @change="groupBuyChang('descriptor', $event, true)" title="我的描述" placeholder="请输入描述"/>
      </i-panel>
      <i-panel title="物流配置">
        <i-cell-group>
          <i-cell :disabled="isEdit" title="配送到家" label="团员可以填写地址由商家邮寄货物">
            <i-switch :value="groupBuy.canDistribution" @change="groupBuyChang('canDistribution', $event)" slot="footer"/>
          </i-cell>
          <i-cell :disabled="isEdit" title="用户自提" label="团员可以到指定地点拿货">
            <i-switch :value="groupBuy.canNoutoasiakas" @change="groupBuyChang('canNoutoasiakas', $event)" slot="footer"/>
          </i-cell>
        </i-cell-group>
      </i-panel>
      <i-panel title="自提点配置" v-if="groupBuy.canNoutoasiakas">
        <i-cell-group v-if="!isEdit">
          <i-cell v-for="(noutoasiakasInfo, index) in noutoasiakas" :key="index" :title="noutoasiakasInfo.nickName" :label="noutoasiakasInfo.address">
            <i-switch :value="noutoasiakasInfo.checked" @change="noutoasiakasAddressesChange(index)" slot="footer"/>
          </i-cell>
          <i-cell>
            <i-button shape="circle" size="small" @click="addNoutoasiakasOpen">+ 添加自提点</i-button>
          </i-cell>
        </i-cell-group>
        <i-cell-group v-else>
          <i-cell v-for="(noutoasiakasInfo, index) in groupBuy.groupBuyNoutoasiakases" :key="index" :title="noutoasiakasInfo.nickName" :label="noutoasiakasInfo.address">
          </i-cell>
        </i-cell-group>
      </i-panel>

      <i-drawer mode="right" :visible="on_off.addNoutoasiakasSwitch" mask-closable="false">
        <view class="demo-container">
          <i-cell-group>
            <i-cell is-link>
              <picker id="regionPicker" mode="region" @change="noutoasiakasChange($event,'region')" :value="tempNoutoasiakasInfo.region" :custom-item="customItem">
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
          <i-input :value="tempNoutoasiakasInfo.detailAddress" @change="noutoasiakasChange($event,'detailAddress',true)" title="详细地址" placeholder="请输入详细地址"/>
          <i-input :value="tempNoutoasiakasInfo.nickName" @change="noutoasiakasChange($event,'nickName',true)" title="自提点昵称" placeholder="请输入自提点昵称"/>
          <i-button @click="addNoutoasiakasStatus(1)" type="primary">确定</i-button>
          <i-button @click="addNoutoasiakasStatus(0)" type="primary">取消</i-button>
        </view>
      </i-drawer>

      <i-panel title="商品配置">
        <div class="aep-class">
          <div class="aep-item" v-for="(product, productIndex) in groupBuy.groupBuyProducts" :key="productIndex">
            <i-cell-group>
              <i-input :value="product.name" title="商品名称" @change="productChange($event, productIndex, 'name', true)" placeholder="请输入新增商品的名称"/>
              <i-cell title="无限供应">
                <i-switch :value="product.limitQuantity" @change="productChange($event, productIndex, 'limitQuantity')" slot="footer"/>
              </i-cell>
              <i-cell title="商品库存" v-if="!product.limitQuantity">
                <i-input-number :value="product.quantity" min="1" max="9999" @change="productChange($event, productIndex, 'quantity')" slot="footer"/>
              </i-cell>
              <i-cell title="商品价格">
                <i-input-number :value="product.price" min="0.01" max="9999.99" @change="productChange($event, productIndex, 'price')" slot="footer"/>
              </i-cell>
              <i-cell title="商品描述">
                <i-input :value="product.descriptor" type="textarea" @change="productChange($event, productIndex, 'descriptor', true)" placeholder="请输入商品描述(最多150字)(可选)" maxlength="150"/>
              </i-cell>
              <i-cell title="商品图片">
                <div class="aep-product-images-block">
                  <!-- 图片展示-->
                  <div v-for="(img, imgIndex) in product.groupBuyProductImages" :key="imgIndex">
                    <div>
                      <div @click="deleteImage(productIndex, imgIndex)" class="image-close">
                        <i-icon type="close" color="#ffffff" size="20"/>
                      </div>
                      <image class="img" :src="img.url" mode="aspectFit"></image>
                    </div>
                  </div>
                  <!--添加图片-->
                  <div style="display: block">
                    <div class="update" @click="chooseImage(productIndex)">
                      <i-icon class="update-icon" size="50" type="add"/>
                    </div>
                  </div>
                </div>
              </i-cell>
            </i-cell-group>
          </div>
          <i-cell>
            <i-button shape="circle" size="small" @click="addProduct">+ 添加商品</i-button>
          </i-cell>
        </div>
        <!--<aep v-if='groupBuy.products' v-model="groupBuy.products"></aep>-->
      </i-panel>
    </div>
    <div class="from-button">
      <i-button v-if="!isEdit" long="true" type="success" @click="formSubmit" id="foot">确认新建团购</i-button>
      <i-button v-else long="true" type="success" @click="formSubmit" id="foot">确认修改团购</i-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {deepClone} from '../../../../utils/common'
  // import map from '../../../../common/js/map.js'
  // import aep from '../../../components/product/addAndEditProduct'

  export default {
    // 新增和修改自提点是直接改库的,  图片,商品数据和团购数据是提交后再做修改的
    // 数据
    data: {
      isEdit: false,
      status: 0,
      groupBuyId: 0,
      // 以上是编辑必备参数
      customItem: '全部',
      // 用户自提点
      noutoasiakas: [
        {
          address: '',
          region: [],
          detailAddress: '',
          nickName: '',
          addressId: -1,
          checked: true
        }
      ],
      // 用户团购
      groupBuy: {
        groupBuyProducts: [
          // {
          //   address: '',
          //   region: [],
          //   detailAddress: '',
          //   nickName: '',
          //   addressId: -1
          // }
        ],
        groupBuyNoutoasiakases: [
          // {
          //   name: '测试商品',
          //   price: 1,
          //   descriptor: '测试描述',
          //   limitQuantity: true,
          //   quantity: 123,
          //   groupBuyProductImages: [
          //     {
          //       url: ''
          //     }
          //   ]
          // }
        ],
        title: '回填标题',
        descriptor: '回调描述',
        canDistribution: true,
        canNoutoasiakas: true
      },
      on_off: {
        addNoutoasiakasSwitch: false
      },
      // 临时记录自提点
      tempNoutoasiakasInfo: {
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
        return this.getGroupBuyStatus[this.status]
      },
      ...mapGetters('group', [
        'getGroupBuyStatus'
      ])
    },
    // 函数集合
    methods: {
      formSubmit: function () {
        if (!this.formSubmitVerify()) {
          return
        }
        this.uploadImageInit(
          (cellbackParam) => {
            // 等待图片上传完毕后再提交团购信息
            console.log('提交数据', this.groupBuy)
            this.$portApi.groupBuy.save(this.groupBuy).then(
              (groupBuy) => {
                console.log(groupBuy)
                // 重置团购
                this.groupBuy = {
                  groupBuyProducts: [],
                  groupBuyNoutoasiakases: [],
                  title: '',
                  descriptor: '',
                  canDistribution: true,
                  canNoutoasiakas: true
                }
                // // console.log('提交的信息', groupBuy)
                wx.redirectTo({
                  url: '/pages/merchant/groupBuy/manage/main?status=' + this.status
                })
              }
            )
          }
        )
      },
      // 上传图片
      uploadImageInit: function (cellback) {
        let that = this
        // 声明: 只要执行两次循环的速度比上传一张图片快,那么就绝对可行,否则另外想办法实现 递归串行化执行批量异步请求
        let initCount = 0
        let uploadGroupBuyProductImages = []
        this.groupBuy.groupBuyProducts.forEach(
          groupBuyProducts => {
            groupBuyProducts.groupBuyProductImages.forEach(
              groupBuyProductImages => {
                // 根据图片对象是否包含 isNew 来判断是否新增
                if (groupBuyProductImages.isNew) {
                  initCount += 1
                  that.uploadImage(groupBuyProductImages, function () {
                    if (--initCount) {
                      cellback()
                      console.log(initCount)
                    } else {
                      console.log(initCount)
                    }
                  })
                  uploadGroupBuyProductImages.push(groupBuyProductImages)
                }
              }
            )
          }
        )
        if (!initCount) {
          cellback()
        }
      },
      uploadImage: function (groupBuyProductImages, callback) {
        let that = this
        wx.uploadFile({
          url: that.$config.fileUpdateUrl,
          filePath: groupBuyProductImages.url,
          name: 'file',
          formData: {
            'fileType': 0
          },
          success: function (res) {
            callback()
            that.$set(groupBuyProductImages, 'url', JSON.parse(res.data)[0])
            // do something
          }
        })
      },
      // 提交表单的验证,错误就返回信息,没错就返回false
      formSubmitVerify: function () {
        let msg = ''
        if (this.groupBuy.title === '') msg = '标题为空'
        if (!(this.groupBuy.canDistribution || this.groupBuy.canNoutoasiakas)) msg = '至少选择一种物流方式.\'物流配送\' 或者 \'用户自提\''
        if (this.groupBuy.canNoutoasiakas === true) {
          // // console.log(this.groupBuy.groupBuyNoutoasiakases.length < 1)
          if (this.groupBuy.groupBuyNoutoasiakases.length < 1) msg = '至少需要添加一个自提点'
        }
        if (this.groupBuy.groupBuyProducts.length < 1) msg = '至少需要添加一个商品'
        for (let productIndex = 0; productIndex < this.groupBuy.groupBuyProducts.length; productIndex++) {
          let product = this.groupBuy.groupBuyProducts[productIndex]
          if (product.name === '') msg = '第' + (productIndex + 1) + '个商品的商品名未填写'
          if (product.price === '') msg = '第' + (productIndex + 1) + '个商品的价格未填写'
          if (!product.limitQuantity) {
            if (product.quantity === 0) msg = '第' + (productIndex + 1) + '个商品的库存数量未填写'
          }
          if (product.groupBuyProductImages.length < 1) msg = '第' + (productIndex + 1) + '个商品至少需要一张图片'
        }
        if (msg && msg !== '') {
          this.$tips.toast(msg, 'none', 2000)
          return false
        }
        return true
      },
      // 重置数据
      formReset: function () {
      },
      // 订正团购信息
      groupBuyChang: function (changParamName, {mp}, isInputType) {
        if (isInputType) {
          this.groupBuy[changParamName] = mp.detail.detail.value
        } else {
          this.groupBuy[changParamName] = mp.detail.value
        }
      },
      // 自提点订正
      noutoasiakasChange: function ({mp}, paramName, isInput) {
        if (isInput) {
          this.tempNoutoasiakasInfo[paramName] = mp.detail.detail.value
        } else {
          this.tempNoutoasiakasInfo[paramName] = mp.detail.value
        }
      },
      // 自提点开关被触发
      noutoasiakasAddressesChange: function (noutoasiakasIndex) {
        let noutoasiakas = this.noutoasiakas[noutoasiakasIndex]
        let newCheckedStatic = !noutoasiakas.checked
        if (newCheckedStatic) { // 选中用户自提点,添加到团购自提点
          let groupBuyNoutoasiakases = deepClone(noutoasiakas)
          delete groupBuyNoutoasiakases.id
          this.groupBuy.groupBuyNoutoasiakases.push(groupBuyNoutoasiakases)
        } else { // 取消自提点
          let index = -1
          // // console.log(this.groupBuy.groupBuyNoutoasiakases)
          this.groupBuy.groupBuyNoutoasiakases.forEach(
            (groupBuyNoutoasiakases, userNoutoasiakasIndex) => {
              // // console.log('ceshi', groupBuyNoutoasiakases.nickName, groupBuyNoutoasiakases.address, noutoasiakas.nickName, noutoasiakas.address, index, '改为', userNoutoasiakasIndex)
              if (groupBuyNoutoasiakases.nickName === noutoasiakas.nickName) {
                if (groupBuyNoutoasiakases.address === noutoasiakas.address) {
                  // // console.log('找到了', groupBuyNoutoasiakases.nickName, groupBuyNoutoasiakases.address, noutoasiakas.nickName, noutoasiakas.address, index, '改为', userNoutoasiakasIndex)
                  index = userNoutoasiakasIndex
                }
              }
            }
          )
          if (index !== -1) {
            // // console.log('删除指定下标的自提点', index)
            this.$delete(this.groupBuy.groupBuyNoutoasiakases, index)
          }
        }
        this.$set(noutoasiakas, 'checked', !noutoasiakas.checked)
      },
      // 新增或修改的商品信息
      addAndEditProductChange: function (index, product) {
        /**
         * 判断是否是新增商品,非新增需要直接赋值(避免出现字符串写入又因为状态更新导致键入的内容清空并且又覆盖一次[简称:抖动的字符]),
         * 新增商品需要使用$set设置到数组中. vue的数组更新的时候不会刷新状态的
         */
        if ((this.groupBuy.groupBuyProducts.length - 1) < index) {
          this.$set(this.groupBuy.groupBuyProducts, index, product)
        } else {
          this.groupBuy.groupBuyProducts[index] = product
        }
      },
      // 新增自提点的弹框
      addNoutoasiakasOpen: function () {
        this.on_off.addNoutoasiakasSwitch = true
      },
      // 新增自提点校验
      addNoutoasiakasFilter: function () {
        if (this.tempNoutoasiakasInfo.region.length !== 3 && this.tempNoutoasiakasInfo.region[0] === undefined && this.tempNoutoasiakasInfo.region[1] === undefined && this.tempNoutoasiakasInfo.region[2] === undefined) {
          return '自提点城市地址未填写'
        }
        if (this.tempNoutoasiakasInfo.detailAddress === '') {
          return '自提点详细地址未填写'
        }
        if (this.tempNoutoasiakasInfo.name === '') {
          return '自提点昵称未填写'
        }
        return false
      },
      // 新增自提点,只有新增团购状态才能增加自提点
      addNoutoasiakasStatus: function (status) {
        if (status === 0) {
          this.on_off.addNoutoasiakasSwitch = false
        } else {
          // 开始添加自提点
          let msg = this.addNoutoasiakasFilter()
          if (msg) {
            this.$tips.toast(msg, 'none', 2000)
            return
          }
          // // console.log(this.tempNoutoasiakasInfo)
          // 获取完整地址和省市区
          this.tempNoutoasiakasInfo.address = this.tempNoutoasiakasInfo.region.join('') + this.tempNoutoasiakasInfo.detailAddress
          this.tempNoutoasiakasInfo.province = this.tempNoutoasiakasInfo.region[0]
          this.tempNoutoasiakasInfo.city = this.tempNoutoasiakasInfo.region[1]
          this.tempNoutoasiakasInfo.district = this.tempNoutoasiakasInfo.region[2]
          // // console.log(this.tempNoutoasiakasInfo)
          // 添加到库
          this.$portApi.noutoasiakas.saveUserNoutoasiakas(this.tempNoutoasiakasInfo).then(
            (noutoasiakas) => {
              // // console.log(noutoasiakas)
              noutoasiakas.checked = false
              // 添加到用户自提点
              this.noutoasiakas.push(noutoasiakas)
              // 自提点模板置空
              this.tempNoutoasiakasInfo = Object.assign({}, this.noutoasiakasInfoTemplate)
              this.on_off.addNoutoasiakasSwitch = false
            }
          )
        }
      },
      // 选中活动列表的子项后
      handleClickItem: function (e) {
        this.changeShowImagesAction(false)
      },
      // 加载自提点
      getNoutoasiakasData: function () {
        let that = this
        if (that.isEdit) {
          // 用户编辑团购,回填团购自提点 TODO 有可能不用了.靠groupBuy
          that.$restfulApi.noutoasiakas.findbyGrouBuyId(that.id).then(
            (groupBuyNResponse) => {
              that.noutoasiakas = groupBuyNResponse._embedded.groupBuyNoutoasiakases
            }
          )
        } else {
          // 用户新增团购加载用户自提点
          this.$restfulApi.noutoasiakas.findByUserId(this.$store.state.userId).then(
            (userNResponse) => {
              let userN = userNResponse._embedded.noutoasiakases
              // 附加checked属性,好让按钮能使用
              // // console.log(userNResponse, userN)
              for (let n of userN) {
                n.checked = false
              }
              that.noutoasiakas = userN
            }
          )
        }
      },
      // 获取商品数据
      getProductDate: function (groupBuyId) {
        this.$restfulApi.product.findBuGroupBuyId(groupBuyId).then(
          (response) => {
            // // // console.log('团购商品', response._embedded.groupBuyProduct)
            this.groupBuy.groupBuyProducts = response._embedded.groupBuyProduct
            for (let productsIndex in this.groupBuy.groupBuyProducts) {
              let products = this.groupBuy.groupBuyProducts
              this.$http.get(products[productsIndex]._links.groupBuyProductImages.href).then(
                (response) => {
                  this.$set(products, productsIndex, Object.assign({}, products[productsIndex], response._embedded))
                }
              )
            }
          }
        )
      },
      // 获取团购数据
      getGroupBuyData: function (groupBuyId) {
        let that = this
        this.$portApi.groupBuy.toGroupBuyProductImage(groupBuyId).then(
          (groupBuy) => {
            that.groupBuy = groupBuy
          }
        )
        // this.$restfulApi.groupBuy.findById(groupBuyId).then(
        //   (groupBuy) => {
        //     this.groupBuy = groupBuy
        //     // // console.log(groupBuy)
        //     this.$http.get(groupBuy._links.groupBuyNoutoasiakases.href).then(
        //       (groupBuyNoutoasiakases) => {
        //         // // console.log(groupBuyNoutoasiakases)
        //         // // console.log(groupBuyNoutoasiakases._embedded.groupBuyNoutoasiakases)
        //         this.$set(this.groupBuy, 'groupBuyNoutoasiakases', groupBuyNoutoasiakases._embedded.groupBuyNoutoasiakases)
        //       }
        //     )
        //     this.$http.get(groupBuy._links.groupBuyProducts.href).then(
        //       (groupBuyProducts) => {
        //         // // console.log(groupBuyProducts)
        //         this.$set(this.groupBuy, 'groupBuyProducts', groupBuyProducts._embedded.groupBuyProducts)
        //         this.groupBuy.groupBuyProducts.forEach(
        //           (groupBuyProducts, groupBuyProductsIndex) => {
        //             this.$http.get(groupBuyProducts._links.groupBuyProductImages.href).then(
        //               (groupBuyProductImages) => {
        //                 // // // console.log(groupBuyProductImages)
        //                 // this.groupBuy.groupBuyProducts[groupBuyProductsIndex].groupBuyProductImages = []
        //                 this.$set(this.groupBuy.groupBuyProducts[groupBuyProductsIndex], 'groupBuyProductImages', groupBuyProductImages._embedded.groupBuyProductImages)
        //               }
        //             )
        //           }
        //         )
        //       }
        //     )
        //   }
        // )
      },
      // 获取数据汇总
      getData: function (groupBuyId) {
        if (groupBuyId) {
          this.getGroupBuyData(groupBuyId)
          // this.getProductDate(groupBuyId)
          // this.getNoutoasiakasData()
        } else {
          this.getNoutoasiakasData()
        }
      },
      // 添加商品
      addProduct: function () {
        // var newIndex = this.groupBuy.groupBuyProducts.length - 1 + 1
        // let newProduct = Object.assign({}, this.productTemplate)
        // this.change(newIndex, newProduct)
        this.groupBuy.groupBuyProducts.push(
          { // 添加商品的模板
            name: '',
            price: '1',
            descriptor: '',
            limitQuantity: true,
            quantity: 1,
            groupBuyProductImages: []
          }
        )
        // this.$set(this.groupBuy.groupBuyProducts, newIndex, Object.assign({}, { // 添加商品的模板
        //   name: '',
        //   price: '1',
        //   descriptor: '',
        //   limitQuantity: true,
        //   quantity: 1,
        //   groupBuyProductImages: []
        // }))
        // // // console.log('products', this.groupBuy.groupBuyProducts)
      },
      // 添加图片
      chooseImage: function (productIndex) {
        let that = this
        wx.chooseImage({
          success: function (e) {
            // // // console.log('获取到的文件', e.tempFilePaths)
            for (let tempFilePath of e.tempFilePaths) {
              // 添加商品图片 并附带 isNew
              that.groupBuy.groupBuyProducts[productIndex].groupBuyProductImages.push({url: tempFilePath, isNew: true})
            }
          }
        })
      },
      // 删除图片
      deleteImage: function (productIndex, imageIndex) {
        let images = this.groupBuy.groupBuyProducts[productIndex].groupBuyProductImages
        if (images[imageIndex].isNew) {
          // 不存在服务器的图片直接删除
          this.$delete(images, imageIndex)
        } else {
          this.$portApi.file.deleteFileByUrl([images[imageIndex].url]).then(
            (response) => {
              this.$portApi.product.deleteProductImage(images[imageIndex].id).then(
                (response) => {
                  this.$delete(images, imageIndex)
                }
              )
            }
          )
        }
      },
      // 商品信息订正
      productChange: function ({mp}, index, nodeName, isInput) {
        if (isInput) {
          this.$set(this.groupBuy.groupBuyProducts[index], nodeName, mp.detail.detail.value)
        } else {
          this.$set(this.groupBuy.groupBuyProducts[index], nodeName, mp.detail.value)
        }
      }
    },
    // 组件注册
    components: {
      // aep
      // card
    },
    // 侦听属性
    watch: {},
    // 小程序页面显示
    onShow: function () {
    },
    onLoad: function () {
      console.log('页面传参', this.$mp.query)
      let isNotTest = true
      if (isNotTest) {
        if (this.$mp.query.groupBuyId) {
          // // // console.log(this.$mp.query.status)
          wx.setNavigationBarTitle({
            title: '编辑团购'
          })
          this.isEdit = true
          this.static = this.$mp.query.status
          this.groupBuyId = this.$mp.query.groupBuyId
          this.title = this.$mp.query.title
        }
      } else {
        // // TODO 模拟进行中团购
        this.isEdit = true
        this.status = 1
        this.groupBuyId = 1
        this.title = '模拟进行中团购'
      }
      this.getData(this.groupBuyId)
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
    width: 100vw;
    /*width: 80%;*/
    height: 100%;
    background: #fff;
  }

  .from-button {
    width: 100%;
    position: fixed;
    bottom: 0%;
    opacity: 0.8;
    /*left: 30px;*/

  }

  .aep-class {
    background-color: $color-background;
  }

  .aep-item {
    margin-top: 20px;
    border: 1px solid #dddddd;
  }

  .aep-product-images-block {
    /*border: 1px solid #000000;*/
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    /*justify-content: center;*/
    justify-content: space-between;
    background-color: white;
  }

  .img {
    height: 100px;
    width: 100px;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 2px 10px 15px #888888;
    /*overflow: hidden;*/
  }

  .image-close {
    opacity: 0.4;
    background-color: #888888;
    width: 25px;
    height: 25px;
    position: absolute;
    margin-left: 85px;
    border-radius: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .update {
    /*height: 100%;*/
    /*width: 100%;*/
    height: 100px;
    width: 100px;
    margin: 5px;
    border-radius: 10px;
    /*border: 1px solid #000000;*/

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-shadow: 2px 10px 15px #888888;
    .update-icon {
    }
  }
</style>
