export const deepClone = function (obj) {
  // 通过序列化来达到深度辅助的效果,不用递归.因为JSON包含了递归方法序列化的能力
  return JSON.parse(JSON.stringify(obj))
}
