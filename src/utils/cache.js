import Taro from "@tarojs/taro";

function createCache(key = `question-cache`) {
  return {
    get() {
      return Taro.getStorageSync(key);
    },
    set(data) {
      Taro.setStorageSync(key, data);
    },
    clear() {
      Taro.removeStorageSync(key);
    }
  };
}

export const tagsCache = createCache("tagsCache");

export const likeCache = createCache("likeCache");
