import authority from '@/utils/authority'
import * as USER from '../constants'

const defaults = {
  openid: '',
  nickname: '',
  avatar: '',
  province: '',
  city: '',
  phone: '',
  token: '',
  city: {
    shop_level: ''
  }
}

const INITIAL_STATE = authority.get() || defaults

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
