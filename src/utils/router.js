import qs from "@halobear/utils/qs";
import Taro from "@tarojs/taro";

// 防止多次跳转
let lastToTime = 0;

/**
 * @description: 路由完整路径
 * @return: String
 */
function getFullPath() {
  // eslint-disable-next-line
  const pages = Taro.getCurrentPages(); // 获取加载的页面
  const { route = "", options = {} } = pages[pages.length - 1]; // 获取当前页面的对象
  let search = "";
  Object.keys(options).forEach(key => {
    const value = options[key];
    // 过滤到refresh、back
    if (!["back", "refresh"].includes(key)) {
      search += `&${key}=${value}`;
    }
  });
  return search.substr(1) ? `/${route}?${search.substr(1)}` : `/${route}`;
}

/**
 * @description: 获取小程序当前路由参数
 */
export function getQuery() {
  // eslint-disable-next-line
  const pages = Taro.getCurrentPages(); // 获取加载的页面
  const { options = {} } = pages[pages.length - 1]; // 获取当前页面的对象
  return options;
}

/**
 * @description: 路由跳转
 * @param {String} name 路由名字
 * @param {Object} query 路由参数
 * @param {String} action 跳转方法
 * @return: null
 */
export function to(options, force = false) {
  // 防止多次跳转
  if (!force) {
    const now = new Date().getTime();
    if (lastToTime > now - 1000) return console.warn("跳转频繁");
    lastToTime = now;
  }
  let { name = "", query = {} } = options;
  if (typeof options === "string") name = options;
  const route = `/pages/${name}/index`;
  const search = qs.stringify(query);
  Taro.navigateTo({
    url: search ? `${route}?${search}` : route
  });
}

export default {
  get fullPath() {
    return getFullPath();
  },
  get query() {
    return getQuery();
  }
};
