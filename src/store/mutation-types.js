/**
 * 该js是用来存储mutations修改方法的方法名称的.用于避免同名方法.用于解耦,使得方法名可以随意更改,书写以及检测
 * @type {string}
 *
 * 使用常量替代 Mutation 事件类型
 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
 */

/**
 * 微信类-函数名
 * @type {string}
 */
// 设置微信用户openId
export const SET_OPEN_ID = 'SET_OPEN_ID'
export const SET_USER_INFO = 'SET_USER_INFO'

/**
 * 测试类-函数名
 * @type {string}
 */
// 编辑测试字段
export const SET_TEST_TEXT = 'SET_TEST_TEXT'
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
