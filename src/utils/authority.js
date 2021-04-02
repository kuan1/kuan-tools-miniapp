import Taro from "@tarojs/taro";

import { isDev } from "@/constants/config";

const key = `kuan-tools-miniapp-${isDev ? "dev" : "production"}`;
const maxAge = 1000 * 60 * 60 * 24 * 29;

export default {
  get() {
    try {
      const user = Taro.getStorageSync(key);
      if (!user || user.time + maxAge < new Date().getTime()) return {};
      return user || {};
    } catch (e) {
      return {};
    }
  },
  set(user, refresh = false) {
    if (!user) return null;
    refresh && (user.time = new Date().getTime());
    const oldUser = this.get() || {};
    const newUser = { ...oldUser, ...user };
    Taro.setStorageSync(key, newUser);
    return newUser;
  },
  clear() {
    const { city = {}, code = "" } = this.get();
    Taro.removeStorageSync(key);
    this.set({ city, code });
    return {};
  }
};
