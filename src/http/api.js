/*
    接口配调用文件
    by:David 2018.6.14
*/
import fly from './config'
import qs from 'qs'

import config from '../config'

const host = config.host
const hostApi = config.host + '/api'
// const appKey = config.appKey
// const appid = config.appid

/**
 * 数据交互
 * 前端 json <--->  后端 json
 *
 * 异常反馈
 * 后端响应参数中的文件头附带 errMsg和errType 参数,表示有问题.
 * errMsg和errType 参数都不存在则请求正常
 * errMsg中的内容为错误信息,需要展示给用户看,展示方式由errType决定.
 *
 * 接口模版====post
 *
 * export const test = params => {return fly.post(`${root}/xx/xx`, qs.stringify(params))};
 *
 * 接口模版====get
 *
 * export const test1 = function(){return fly.get(`${root}/api/getNewsList`)}
 *
 *
 * 用法：
 * 在 页面用引入 test
 * import {test} from '../../http/api.js'
 *
 * test(params).then(res=>{ console.log(res) })
 *
 * qs.stringify是用来把数据修改为url需要的键值对的
 */

// export const test = params => {
//     return fly.post(`${host}/xx/xx`, qs.stringify(params))
// };

// 通用的get请求
export const get = url => {
  // get请求不能使用body,请求内容放到url中. ?xxx=xxx&xxx=xxx&xx.... 用qs.stringify转
  return fly.get(`${host}${url}`)
}

// 通用的post请求
export const post = params => {
  return fly.post(`${host}${params.url}`, params.data)
}

// 通用的put请求
export const put = params => {
  return fly.put(`${host}${params.url}`, params.data)
}

// 通用的put请求
export const deletePost = params => {
  return fly.delete(`${host}${params.url}`, params.data)
}
// 通用的get请求
export const apiGet = url => {
  return fly.get(`${hostApi}${url}`)
}

// 通用的post请求
export const apiPost = params => {
  return fly.post(`${hostApi}${params.url}`, qs.stringify(params.data))
}

// ---------------------------------------------------商户-----------------------------------------------------------------------
export const restfulApi = {
  order: {
    findById: function (orderId) {
      return apiGet(`/orders/${orderId}`)
    }
  },
  groupBuy: {
    findById: groupBuyId => apiGet(`/groupBuys/${groupBuyId}`),
    findByStatus: (userId, status) => {
      return apiGet(`/groupBuys/search/findByStatusAndSelfId?userId=${userId}&status=${status}`)
    },
    findByUserId: (userId) => {
      return apiGet(`groupBuys/search/findByUserId?userId=${userId}`)
    }
  },
  noutoasiakas: {
    findByUserId: userId => {
      return apiGet(`/noutoasiakases/search/findByUserId?userId=${userId}`)
    },
    findbyGrouBuyId: groupBuyId => {
      return apiGet(`/groupBuys/${groupBuyId}/groupBuyNoutoasiakases`)
      // return apiGet(`/groupBuyNoutoasiakases/search/findByGroupBuyId?groupBuyId=${groupBuyId}`)
    }
  },
  product: {
    findBuGroupBuyId: (groupBuyId) => {
      return apiGet(`/groupBuys/${groupBuyId}/groupBuyProducts`)
    }
  },
  user: {
    findByGroupBuyId: (groupBuyId) => {
      return apiGet(`/users/search/findByGroupBuyId?groupBuyId=${groupBuyId}`)
    },
    findById: (userId) => {
      return apiGet(`/users/${userId}`)
    }
  }
}
/**
 * service Api 服务
 * @type {{order: {save: (function(*=, *=, *=): *), findAll: (function(): *), findDetailById: (function(*): *)}, user: {getAllCareAboutUserGroupBuyInfo: (function(): *)}, file: {deleteFileByUrl: (function(*=): *)}, groupBuy: {save: (function(*=): *), toGroupBuyProductImage: (function(*): *), findById: (function(*): *), findByUserId: (function(*): *)}, product: {saveProducts: (function(*=, *): *), deleteProductImage: (function(*): *)}, noutoasiakas: {saveUserNoutoasiakas: (function(*=): *)}, merchant: {saveGroupBuyInfo: (function(*=): FlyPromise<any>), getAllNoutoasiakas: (function(*=): FlyPromise<any>), findById: (function(*): FlyPromise<any>), getGroupBuyProduct: (function(*=): FlyPromise<any>), getGroupBuyList: (function(*=): FlyPromise<any>), changeGroupBuyStatus: (function(*=): FlyPromise<any>), deleteGroupBuyStatus: (function(*=): FlyPromise<any>), getSearchOrder: (function(*=): FlyPromise<any>)}, customer: {getMerchantUserInfoAndShopInfo: (function(*=): FlyPromise<any>), getMerchantUserGroupBuys: (function(*=): FlyPromise<any>), getGroupBuyUserInfo: (function(*=): FlyPromise<any>), getGroupBuyAndProduct: (function(*=): FlyPromise<any>), findBuGroupBuyId: (function(*=): FlyPromise<any>), getUserLogisticsInfo: (function(*=): FlyPromise<any>), getNoutoasiakasByGroupBuyId: (function(*=): FlyPromise<any>), addNewOrder: (function(*=): FlyPromise<any>), getGroupBuyUserInfoAndGroupBuy: (function(*=): FlyPromise<any>), getPayImg: (function(*=): FlyPromise<any>), getInvitedUserByGroupBuy: (function(*=): FlyPromise<any>)}, common: {login: (function(*=): FlyPromise<any>), changeOrderDelivery: (function(*=): FlyPromise<any>), updateOrderProduct: (function(*=): FlyPromise<any>)}}}
 */
export const portApi = {
  order: {
    save: function (order, groupBuyId, merchantUserId) {
      return post({
        url: '/order',
        data: {order: order, groupBuyId: groupBuyId, merchantUserId: merchantUserId}
      })
    },
    findAll: function () {
      return get(`/order/customer`)
    },
    findDetailById: function (orderId) {
      return get(`/order/detail/${orderId}`)
    },
    findAllIsMerchant: function (searchText, searchType) {
      return get(`/order/merchant`)
    }
  },
  user: {
    getAllCareAboutUserGroupBuyInfo: function () {
      return get('/user/allCareAboutUserGroupBuyInfo')
    },
    findPayQrCodeByUserId: function (userId) {
      return get(`/user/payQrCodeById/${userId}`)
    },
    toUserShop: function (userId) {
      return get(`/user/${userId}`)
    }
  },
  file: {
    deleteFileByUrl: function (fileUrl) {
      return put({
        url: `/file`,
        data: fileUrl
      })
    }
  },
  groupBuy: {
    save: function (groupBuy) {
      return post({
        url: '/groupBuy',
        data: groupBuy
      })
    },
    toGroupBuyProductImage: function (groupBuyId) {
      return get(`/groupBuy/toGroupBuyProductImage/${groupBuyId}`)
    },
    toGroupBuyProductImageByUserId: function (userId) {
      return get(`/groupBuy/toGroupBuyProductImage/userId/${userId}`)
    },
    findById: function (groupBuyId) {
      return get(`/groupBuy/${groupBuyId}`)
    },
    findByUserId: function (userId) {
      return get(`/groupBuy/findByUserId/${userId}`)
    }
  },
  product: {
    saveProducts: function (groupBuyProducts, groupBuyId) {
      return post({
        url: `/product`,
        data: groupBuyProducts
      })
    },
    deleteProductImage: function (groupBuyProductId) {
      return deletePost({
        url: `/product/image/${groupBuyProductId}`
      })
    }
  },
  noutoasiakas: {
    saveUserNoutoasiakas: noutoasiakas => {
      return post({
        url: `/noutoasiakas`,
        data: noutoasiakas
      })
      // return fly.post(`${host}/noutoasiakas`, noutoasiakas)
    }
  },
  merchant: {
    /**
     *(124, 12) // TODO 保存团购信息 saveGroupBuyInfo(groupBuy)
     * @param params
     * @returns {FlyPromise<any>}
     */
    saveGroupBuyInfo: params => {
      return fly.post(`${host}/groupBuy/saveGroupBuyInfo`, qs.stringify(params))
    },
    /**
     *(225, 14) // TODO 加载团长用户所有自提点 getAllNoutoasiakas()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getAllNoutoasiakas: params => {
      return fly.post(`${host}/merchant/groupBuy/addAndEdit/getAllNoutoasiakas`, qs.stringify(params))
    },
    /**
     *(243, 17) // 编辑,TODO 加载团购服务信息 findById(groupId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    findById: params => {
      return fly.get(`${host}/groupBuy`)
    },
    // /**
    //  *(336, 17) // 新增,TODO 加载团购服务信息 getGroupBuySetting(null)
    //  * @param params
    //  * @returns {FlyPromise<any>}
    //  */
    // getGroupBuySetting: params => {
    //   return fly.post(`${host}/merchant/groupBuy/addAndEdit/getGroupBuySetting`, qs.stringify(params))
    // },
    /**
     *(81, 12) // TODO 获取团长团购商品详细 getGroupBuyProduct(id)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getGroupBuyProduct: params => {
      return fly.post(`${host}/merchant/groupBuy/detail/getGroupBuyProduct`, qs.stringify(params))
    },
    /**
     *(117, 12) // TODO 服务器获取指定状态的团购服务数据 getGroupBuyList(status)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getGroupBuyList: params => {
      return fly.post(`${host}/merchant/groupBuy/manage/getGroupBuyList`, qs.stringify(params))
    },
    /**
     *(153, 20) // TODO 订正团购状态 changeGroupBuyStatus(id,status)
     * @param params
     * @returns {FlyPromise<any>}
     */
    changeGroupBuyStatus: params => {
      return fly.post(`${host}/merchant/groupBuy/manage/changeGroupBuyStatus`, qs.stringify(params))
    },
    // /**
    //  *(157, 20) // TODO 订正团购状态 changeGroupBuyStatus(id,status)
    //  * @param params
    //  * @returns {FlyPromise<any>}
    //  */
    // changeGroupBuyStatus: params => {
    //   return fly.post(`${host}/merchant/groupBuy/manage/changeGroupBuyStatus`, qs.stringify(params))
    // }
    /**
     *(161, 20) // TODO 设置团购为删除状态 deleteGroupBuyStatus(id,status)
     * @param params
     * @returns {FlyPromise<any>}
     */
    deleteGroupBuyStatus: params => {
      return fly.post(`${host}/merchant/groupBuy/manage/deleteGroupBuyStatus`, qs.stringify(params))
    },
    /**
     *(92, 12) // TODO 获取服务端数据 getSearchOrder(searchText || undefined, searchType || undefined)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getSearchOrder: params => {
      return fly.post(`${host}/merchant/order/list/getSearchOrder`, qs.stringify(params))
    }
  },

  customer: {
    /**
     * (80, 12) // TODO 获取团长用户的用户信息 getMerchantUserInfoAndShopInfo()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getMerchantUserInfoAndShopInfo: params => {
      return fly.post(`${host}/customer/groupBuy/list/getMerchantUserInfoAndShopInfo`, qs.stringify(params))
    },
    /**
     * (89, 12) // TODO 获取团长的所有团购服务(部分) getMerchantUserGroupBuys()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getMerchantUserGroupBuys: params => {
      return fly.post(`${host}/customer/groupBuy/list/getMerchantUserGroupBuys`, qs.stringify(params))
    },
    /**
     * (140, 12) // TODO 从后台获取团长用户信息 getGroupBuyUserInfo(groupBuyId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getGroupBuyUserInfo: params => {
      return fly.post(`${host}/customer/groupBuy/show/getGroupBuyUserInfo`, qs.stringify(params))
    },
    /**
     * (146, 12) // TODO 团购信息 getGroupBuyAndProduct(groupBuyId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getGroupBuyAndProduct: params => {
      return fly.post(`${host}/customer/groupBuy/show/getGroupBuyAndProduct`, qs.stringify(params))
    },
    /**
     * (155, 12) // TODO 获取团购商品信息  findBuGroupBuyId(groupBuyId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    findBuGroupBuyId: params => {
      return fly.post(`${host}/customer/groupBuy/show/getGroupBuyProducts`, qs.stringify(params))
    },
    /**
     * (272, 12) // TODO 获取团员默认物流设置 getUserLogisticsInfo()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getUserLogisticsInfo: params => {
      return fly.post(`${host}/customer/groupBuy/show/getUserLogisticsInfo`, qs.stringify(params))
    },
    /**
     *(283, 14) // TODO 获取该团购的自提点getNoutoasiakasByGroupBuyId(GroupBuyId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    getNoutoasiakasByGroupBuyId: params => {
      return fly.post(`${host}/customer/groupBuy/show/getNoutoasiakasByGroupBuyId`, qs.stringify(params))
    },
    /**
     *(331, 12) // TODO 提交新订单到服务器  addNewOrder(this.detail)
     * @param params
     * @returns {FlyPromise<any>}
     */
    addNewOrder: params => {
      return fly.post(`${host}/customer/groupBuy/show/addNewOrder`, qs.stringify(params))
    },
    /**
     * (39, 12) // TODO 获取用户的所有团长的部分信息和所有团购服务信息 getGroupBuyUserInfoAndGroupBuy()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getGroupBuyUserInfoAndGroupBuy: params => {
      return fly.post(`${host}/customer/order/list/getGroupBuyUserInfoAndGroupBuy`, qs.stringify(params))
    },
    /**
     * (110, 12) // TODO 服务端加载支付图片地址过来 getPayImg()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getPayImg: params => {
      return fly.post(`${host}/customer/payment/show/getPayImg`, qs.stringify(params))
    },
    /**
     * (69, 12) // TODO 服务获取数据,获取邀请参团团长的所有团购展示 getInvitedUserByGroupBuy()
     * @param params
     * @returns {FlyPromise<any>}
     */
    getInvitedUserByGroupBuy: params => {
      return fly.post(`${host}/customer/getInvitedUserByGroupBuy`, qs.stringify(params))
    }
  },

  common: {
    /**
     * TODO 提交订正结果到服务 updateOrderProduct(this.detail)
     * @param params
     * @returns {FlyPromise<any>}
     */
    login: params => {
      return fly.get(`${host}/user/login`, qs.stringify(params))
    },
    /**
     * TODO 请求后端修改发货状态 changeOrderDelivery(orderStatus, orderId)
     * @param params
     * @returns {FlyPromise<any>}
     */
    changeOrderDelivery: params => {
      return fly.post(`${host}/common/changeOrderDelivery`, qs.stringify(params))
    },
    /**
     * TODO 提交订正结果到服务 updateOrderProduct(this.detail)
     * @param params
     * @returns {FlyPromise<any>}
     */
    updateOrderProduct: params => {
      return fly.post(`common/updateOrderProduct`, qs.stringify(params))
    }
  }
}

export default {
  portApi,
  restfulApi
}
