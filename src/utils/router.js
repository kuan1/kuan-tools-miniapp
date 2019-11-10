import Taro from '@tarojs/taro'
import qs from 'kuan-utils/lib/qs'
import { isWx } from './validate'
import authority from './authority'

const tabPages = []

/**
 * @description: 路由完整路径
 * @return: String
 */
export function fullPath() {
  // eslint-disable-next-line
  const pages = Taro.getCurrentPages() // 获取加载的页面
  if (isWx) {
    const { route = '', options = {} } = pages[pages.length - 1] // 获取当前页面的对象
    let search = ''
    Object.keys(options).forEach(key => {
      const value = options[key]
      // 过滤到refresh、back
      if (['back', 'refresh'] !== key) {
        search += `&${key}=${value}`
      }
    })
    return search.substr(1) ? `/${route}?${search.substr(1)}` : `/${route}`
  } else {
    const { path = '', params = {} } =
      (pages[pages.length - 1] && pages[pages.length - 1].router) || {} // 获取当前页面的对象
    let search = ''
    Object.keys(params).forEach(key => {
      const value = params[key]
      // 过滤到refresh、back
      if (['back', 'refresh'] !== key) {
        search += `&${key}=${value}`
      }
    })
    return search.substr(1) ? `/${path}?${search.substr(1)}` : `/${path}`
  }
}

/**
 * @description: 获取小程序当前路由参数
 */
export function query() {
  if (isWx) {
    // eslint-disable-next-line
    const pages = Taro.getCurrentPages() // 获取加载的页面
    const { options = {} } = pages[pages.length - 1] || {} // 获取当前页面的对象
    return options
  } else {
    // eslint-disable-next-line
    const pages = Taro.getCurrentPages() // 获取加载的页面
    const { params = {} } = pages[pages.length - 1].$route || {} // 获取当前页面的对象
    return params
  }
}

/**
 * @description: 路由跳转
 * @param {String} name 路由名字
 * @param {Object} query 路由参数
 * @param {String} action 跳转方法
 * @return: null
 */
export function to({
  name = '',
  query: queryData = {},
  action = 'navigateTo'
}) {
  const route = `/pages/${name}/index`
  const search = qs.stringify(queryData)
  if (tabPages.includes(name)) action = 'switchTab'
  if (action === 'switchTab' && !isWx) action = 'navigateTo'
  Taro[action]({
    url: search ? `${route}?${search}` : route
  })
}

/**
 * @description: 重定向登录
 */
export function redirectLogin(custom) {
  const url = fullPath()

  const name = custom || 'login'

  const isLoginPage = url.startsWith(`/pages/${name}/index`)
  if (!isLoginPage) {
    to({
      name,
      query: {
        back: encodeURIComponent(url)
      },
      action: 'redirectTo'
    })
    return Promise.reject(`redirect ${name}`)
  }
}

// 返回
export function goBack(name) {
  let pages = Taro.getCurrentPages() // 获取加载的页面
  pages = [...pages].reverse()

  const delta = pages.findIndex(item =>
    item.route.startsWith(`pages/${name}/index`)
  )
  if (delta > 0) {
    Taro.navigateBack({
      delta
    })
  } else {
    redirectBack()
  }
}

// 重定向返回
export function redirectBack() {
  let { back } = query()
  if (back === 'undefined') back = '/pages/index/index'
  const path = decodeURIComponent(decodeURIComponent(back))
  const url = back ? path : '/pages/index/index'
  // 需要使用switchTab的页面
  const pages = tabPages
  const action =
    isWx && pages.some(item => url.includes(`pages/${item}/`))
      ? 'switchTab'
      : 'redirectTo'
  Taro[action]({
    url
  })
}

export function toHotel({ id, shop_level }) {
  if (!id) return
  if (!shop_level) {
    const { city = {} } = authority.get()
    shop_level = city.shop_level || 1
  }
  const name = shop_level == 1 ? 'hotelDetail' : 'join/hotelDetail'
  to({ name, query: { id, shop_level } })
}

export function toHall({ id, shop_level }) {
  if (!id) return
  if (!shop_level) {
    const { city = {} } = authority.get()
    shop_level = city.shop_level || 1
  }
  const name = shop_level == 1 ? 'hallDetail' : 'join/hallDetail'
  to({ name, query: { id, shop_level } })
}

export function toWedding({ id, shop_level, hall_id = '' }) {
  if (!id) return
  if (!shop_level) {
    const { city = {} } = authority.get()
    shop_level = city.shop_level || 1
  }
  const name = shop_level == 1 ? 'weddingDetail' : 'join/weddingDetail'
  to({ name, query: { id, shop_level, hall_id } })
}

export default {
  get fullPath() {
    return fullPath()
  },
  get query() {
    return query()
  },
  to,
  toHotel,
  toHall,
  goBack,
  redirectLogin,
  redirectBack
}
