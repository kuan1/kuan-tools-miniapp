import * as USER from '@/constants'

export function updateUser(payload) {
  return {
    type: USER.UPDATE_USER,
    payload
  }
}

export function clearUser() {
  return {
    type: USER.CLEAR_USER
  }
}
