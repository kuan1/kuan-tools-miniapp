import Taro from '@tarojs/taro'
import * as USER from '@/constants'
import { cacheKey as key } from '@/constants/config'

const INITIAL_STATE = Taro.getStorageSync(key) || {}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER.UPDATE_USER:
      return {
        ...state,
        ...action.payload
      }
    case USER.CLEAR_USER:
      const { city = {} } = state
      return { city }
    default:
      return state
  }
}
