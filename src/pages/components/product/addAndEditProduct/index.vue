<template>
  <div class="aep-class">
    <div class="aep-item" v-for="(product, productIndex) in products" :key="productIndex">
      <i-cell-group>
        <i-input :value="product.name" title="商品名称" @change="nameChange($event, productIndex)"
                 placeholder="请输入新增商品的名称"/>
        <i-cell title="无限供应">
          <i-switch :value="product.limitQuantity" @change="limitQuantityChange($event, productIndex)" slot="footer"/>
        </i-cell>
        <i-cell title="商品库存" v-if="!product.limitQuantity">
          <i-input-number :value="product.quantity" min="1" max="9999" @change="quantityChange($event, productIndex)"
                          slot="footer"/>
        </i-cell>
        <i-cell title="商品价格">
          <i-input-number :value="product.price" min="0.01" max="9999.99" @change="priceChange($event, productIndex)"
                          slot="footer"/>
        </i-cell>
        <i-cell title="商品描述">
          <i-input :value="product.describe" type="textarea" @change="describeChange($event, productIndex)"
                   placeholder="请输入商品描述(最多150字)(可选)" maxlength="150"/>
        </i-cell>
        <i-cell title="商品图片">
          <div class="aep-product-images-block">
            <!-- 图片展示-->
            <div v-for="(img, imgIndex) in product.images" :key="imgIndex">
              <div>
                <div @click="deleteImage(productIndex, imgIndex)" class="image-close">
                  <i-icon type="close" color="#ffffff" size="20"/>
                </div>
                <!--<button style="position:absolute;" @click="deleteImage(productIndex, imgIndex)">123456</button>-->
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
</template>
<script>
  export default {
    model: {
      // 使用model， 这儿2个属性，
      // prop说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，
      // event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'products',
      event: 'infoChange'
    },
    // 数据
    data: function () {
      return {
        status: 0
      }
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: {
      products: Array
    },
    // 计算属性
    computed: {},
    // 函数集合
    methods: {
      nameChange: function ({mp}, index) {
        // let product = Object.assign({}, this.products[index], {name: mp.detail.detail.value})
        // this.change(index, product)
        Object.assign(this.products[index], {name: mp.detail.detail.value})
        this.change()
      },
      describeChange: function ({mp}, index) {
        // console.log('描述内容', mp.detail.detail.value)
        // let product = Object.assign({}, this.products[index], {describe: mp.detail.detail.value})
        // this.change(index, product)
        Object.assign(this.products[index], {describe: mp.detail.detail.value})
        this.change()
      },
      quantityChange: function ({mp}, index) {
        // let product = Object.assign({}, this.products[index], {quantity: mp.detail.value})
        // this.change(index, product)
        Object.assign(this.products[index], {quantity: mp.detail.value})
        this.change()
      },
      priceChange: function ({mp}, index) {
        // let product = Object.assign({}, this.products[index], {price: mp.detail.value})
        // this.change(index, product)
        Object.assign(this.products[index], {price: mp.detail.value})
        this.change()
      },
      limitQuantityChange: function ({mp}, index) {
        // let product = Object.assign({}, this.products[index], {limitQuantity: mp.detail.value})
        // this.change(index, product)
        Object.assign(this.products[index], {limitQuantity: mp.detail.value})
        this.change()
      },
      change: function () { // 改变父组件的商品集合
        this.$emit('infoChange', this.products)
      },
      addProduct: function () { // 添加商品
        var newIndex = this.products.length - 1 + 1
        // let newProduct = Object.assign({}, this.productTemplate)
        // this.change(newIndex, newProduct)
        this.$set(this.products, newIndex, Object.assign({}, { // 添加商品的模板
          name: '',
          price: '0.01',
          describe: '',
          limitQuantity: true,
          quantity: 1,
          images: []
        }))
        // this.$set(this.products, newIndex, Object.assign({}, this.productTemplate))
        console.log('products', this.products)
        this.change()
      },
      chooseImage: function (productIndex) { // 添加图片
        let that = this
        console.log('开始获取图片')
        wx.chooseImage({
          success: function (e) {
            console.log('获取到的文件', e.tempFilePaths)
            for (let tempFilePath of e.tempFilePaths) {
              that.products[productIndex].images.push({url: tempFilePath, productImagesId: Date.now()})
              console.log('addImage', that.products[productIndex].images)
            }
          },
          fail: function (e) {
            console.log('调用失败', e)
          },
          complete: function () {
            console.log('调用结束')
          }
        })
      },
      deleteImage: function (productIndex, imageIndex) { // 删除图片
        this.$delete(this.products[productIndex].images, imageIndex)
      }
    },
    // 组件注册
    component: {},
    // 侦听属性
    watch: {},
    mounted: function () {
      // console.log('获取products', this.products)
    }
  }
</script>

<style lang="scss" scoped>
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
