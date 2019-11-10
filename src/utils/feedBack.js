import Taro from '@tarojs/taro'

// 确认
export function confirm(title = '请确认', content = '') {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      success(res) {
        if (res.confirm) {
          resolve()
        } else {
          reject(res)
        }
      }
    })
  })
}

export function toast(title) {
  if (!title) return
  Taro.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

export function toastDownload() {
  toast('请下载礼成APP')
}
