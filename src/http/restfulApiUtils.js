import fly from './config'
import Vue from 'vue'
// groupBuy -> groupBuyProducts -> groupBuyProductImages
// const groupBuyTogGoupBuyProductImages = function (groupBuy) {
//   this.$http.get(groupBuy._links.groupBuyProducts.href).then(
//     (groupBuyProducts) => {
//       // // console.log(groupBuyProducts)
//       this.$set(this.groupBuy, 'groupBuyProducts', groupBuyProducts._embedded.groupBuyProducts)
//       this.groupBuy.groupBuyProducts.forEach(
//         (groupBuyProduct, groupBuyProductsIndex) => {
//         }
//       )
//     }
//   )
// }
//
// const groupBuyProductTogroupBuyProductImage = function (groupBuyProduct) {
//   this.$http.get(groupBuyProduct._links.groupBuyProductImages.href).then(
//     (groupBuyProductImages) => {
//       // // // console.log(groupBuyProductImages)
//       // this.groupBuy.groupBuyProducts[groupBuyProductsIndex].groupBuyProductImages = []
//       this.$set(this.groupBuy.groupBuyProducts[groupBuyProductsIndex], 'groupBuyProductImages', groupBuyProductImages._embedded.groupBuyProductImages)
//     }
//   )
// }

// groupBuyId -> groupBuy -> groupBuyProducts -> groupBuyProductImages
// const groupBuyIdTogGoupBuyProductImages = function (groupBuy) {
//   this.$http.get(groupBuy._links.groupBuyProducts.href).then(
//     (groupBuyProducts) => {
//       // // console.log(groupBuyProducts)
//       this.$set(this.groupBuy, 'groupBuyProducts', groupBuyProducts._embedded.groupBuyProducts)
//       this.groupBuy.groupBuyProducts.forEach(
//         (groupBuyProducts, groupBuyProductsIndex) => {
//           this.$http.get(groupBuyProducts._links.groupBuyProductImages.href).then(
//             (groupBuyProductImages) => {
//               // // // console.log(groupBuyProductImages)
//               // this.groupBuy.groupBuyProducts[groupBuyProductsIndex].groupBuyProductImages = []
//               this.$set(this.groupBuy.groupBuyProducts[groupBuyProductsIndex], 'groupBuyProductImages', groupBuyProductImages._embedded.groupBuyProductImages)
//             }
//           )
//         }
//       )
//     }
//   )
// }
/**
 * 获取实体的关联集合
 * 形式: 一对多
 * 注意: 不可以是多对一
 * @param entity
 * @param sonEntitysName
 * @return 关联集合
 */
var entityGetEntity = function (entity, sonEntitysName, callback) {
  fly.get(entity._links[sonEntitysName].href).then(
    (response) => {
      Vue.set(entity, sonEntitysName, response._embedded[sonEntitysName])
      // entity[sonEntitysName] = response._embedded[sonEntitysName]
      callback(response._embedded[sonEntitysName])
    }
  )
}
// TODO 递归嵌套 简化代码 未完成
// const entityToEntut = function (entity, sonEntityNameSet) {
//   sonEntityNameSet.forEach(
//     sonEntityName => {
//       var  = entityGetEntity(entity, sonEntityName);
//     }
//   )
// }

/**
 * 轻量级封装
 */
// user -> groupBuys
const userGetGroupBuys = function (user, callback) {
  entityGetEntity(user, 'groupBuys', callback)
}
// groupBuy -> groupBuyProducts
const groupBuyGetGroupBuyProducts = function (groupBuy, callback) {
  return entityGetEntity(groupBuy, 'groupBuyProducts', callback)
}
// groupBuy -> groupBuyNoutoasiakases
const groupBuyGetGroupBuyNoutoasiakases = function (groupBuy, callback) {
  return entityGetEntity(groupBuy, 'groupBuyNoutoasiakases', callback)
}
// groupBuyProduct -> groupBuyProductImages
const groupBuyProductGetGroupBuyProductImages = function (groupBuyProduct, callback) {
  return entityGetEntity(groupBuyProduct, 'groupBuyProductImages', callback)
}

/**
 * 常用组合封装
 */
// groupBuy -> groupBuyProducts -> groupBuyProductImages
const groupBuyToGroupBuyProductImages = function (groupBuy, callback) {
  // groupBuy -> groupBuyProducts
  groupBuyGetGroupBuyProducts(groupBuy,
    (groupBuyProducts) => {
      for (let groupBuyProductIndex in groupBuyProducts) {
        groupBuyProductGetGroupBuyProductImages(groupBuyProducts[groupBuyProductIndex], callback)
      }
    }
  )
}

// user -> groupBuys -> groupBuyProducts -> groupBuyProductImages
const userToGroupBuyProductImages = function (user, callback) {
  userGetGroupBuys(user,
    (groupBuys) => {
      for (let groupBuyIndex in groupBuys) {
        // console.log(groupBuyIndex, groupBuys, groupBuys[groupBuyIndex])
        groupBuyToGroupBuyProductImages(groupBuys[groupBuyIndex], callback)
      }
    }
  )
}
/**
 * resful获取嵌套集合工具类
 * 传入的参数大多数是由spring data rest查出来
 * @type {{groupBuyTogGoupBuyProductImages: groupBuyTogGoupBuyProductImages}}
 */
const restfulApiSet = {
  // 获取一层 xxx get xxx
  get: {
    userGetGroupBuys,
    groupBuyGetGroupBuyProducts,
    groupBuyGetGroupBuyNoutoasiakases,
    groupBuyProductGetGroupBuyProductImages
  },
  // 获取多层 xxx to xxx
  to: {
    groupBuyToGroupBuyProductImages,
    userToGroupBuyProductImages
  }
  // groupBuyTogGoupBuyProductImages,
  // groupBuyIdTogGoupBuyProductImages
}
export default restfulApiSet
