// 地图组件需要用到的

export var location = {
  latitude: 0,
  longitude: 0
}

export var isOk = {
  isGetInfo: false,
  getInfoTimestamp: 0
}

/**
 * 获取用户的当前gcj02位置
 * @param callBack
 * response内容:
 * latitude 纬度，浮点数，范围为-90~90，负数表示南纬
 * longitude 经度，浮点数，范围为-180~180，负数表示西经
 * speed 速度，浮点数，单位m/s
 * accuracy 位置的精确度
 * altitude 高度，单位 m
 * verticalAccuracy 垂直精度，单位 m（Android 无法获取，返回 0）
 * horizontalAccuracy 水平精度，单位 m
 */
export function getUserLocation (callBack) {
  if (isOk.isGetInfo === false) {
    var param = {
      // map 组件使用的经纬度是火星坐标系，调用 wx.getLocation 接口需要指定 type 为 gcj02
      type: 'gcj02',
      success: function (res) {
        location = res
        isOk.isGetInfo = true
        isOk.getInfoTimestamp = Date.now()
        // 由于该请求是异步调用的,所以需要调用回调信息
        callBack(res)
      },
      fail: function (res) {
        console.warn('地址信息获取失败')
        // 由于该请求是异步调用的,所以需要调用回调信息
        callBack(null)
      },
      complete: function (res) {
        console.info('调用获取地址的接口getLocation')
      }
    }
    wx.getLocation(param)
  } else {
    // 使用缓存
    callBack(location)
  }
}

/**
 * 用户打开地图选择地址(需要用户授权),调用本方法返回回调
 * @param callBack
 * response内容:
 * name 位置名称
 * address 详细地址
 * latitude 纬度，浮点数，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系
 * longitude 经度，浮点数，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系
 */
export function getUserSelectLocation (callBack) {
  var param = {
    // map 组件使用的经纬度是火星坐标系，调用 wx.getLocation 接口需要指定 type 为 gcj02
    success: function (res) {
      // 由于该请求是异步调用的,所以需要调用回调信息
      callBack(res)
    },
    fail: function (res) {
      console.warn('地址信息获取失败')
      // 由于该请求是异步调用的,所以需要调用回调信息
      callBack(null)
    },
    complete: function (res) {
      console.info('chooseLocation')
    }
  }
  wx.chooseLocation(param)
}

export default {
  getUserLocation,
  getUserSelectLocation,
  location,
  isOk
}
