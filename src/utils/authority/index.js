import Taro from '@tarojs/taro'
import store from '@/store'
import { updateUser, clearUser } from '@/actions/user'
import { cacheKey as key } from '@/constants/config'

const maxAge = 1000 * 60 * 60 * 24 * 60

const authority = {
  get() {
    try {
      const user = Taro.getStorageSync(key)
      if (!user || user.time + maxAge < new Date().getTime()) return {}
      return user || {}
    } catch (e) {
      return {}
    }
  },
  set(user) {
    if (!user) return null
    user.time = new Date().getTime()
    const oldUser = this.get() || {}
    const newUser = { ...oldUser, ...user }
    Taro.setStorageSync(key, newUser)
    store.dispatch(updateUser(newUser))
    return newUser
  },
  clear() {
    const { city = {}, code = '' } = this.get()
    Taro.removeStorageSync(key)
    this.set({ city, code })
    store.dispatch(clearUser())
    return {}
  }
}

export default authority