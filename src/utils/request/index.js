import { isDev } from "@/constants/config"

import doRequest from "./do-request"
import loading from "./loading"
import { toast } from "../feedback"
import { code2session } from "../login"
import authority from '../authority'

// 错误尝试次数
const maxCount = 2

const cache = {}

// 最终求情封装
export default async (
  options,
  { shouldLoading = false, shouldToast = true, shouldCache = false } = {}
) => {
  if (shouldCache && !isDev && cache[options.url]) return cache[options.url]

  // 是否需要loading
  if (shouldLoading) loading.show()

  const user = authority.get()
  if (!user.id) {
    await code2session()
  }

  for (let i = 0;i < maxCount;i++) {
    try {
      const data = await doRequest(options)
      if (shouldLoading) loading.hide()
      if (shouldCache) cache[options.url] = data
      return data
    } catch (err) {
      const e = err || {}
      console.log(e)
      // 再次尝试
      if (i < maxCount - 1) {
        const { info = "网络异常", statusCode } = e
        let errMsg = info
        // 401重新登录
        if (statusCode === 401) {
          // await code2session(true);
          continue
        }
        loading.hide(true)
        if (shouldToast) {
          setTimeout(() => {
            toast(errMsg)
          }, 100)
        }
      }
      // 返回最终错误
      if (shouldLoading) loading.hide()
      return Promise.reject(e)
    }
  }
}
