import Taro from '@tarojs/taro'

const type = Taro.getEnv()

// 是微信
export const isWx = type === Taro.ENV_TYPE.WEAPP
// 是百度
export const isSwan = type === Taro.ENV_TYPE.SWAN


// 是否是手机号
export function isPhone(phone) {
  return /^1[3456789]\d{9}$/.test(phone)
}