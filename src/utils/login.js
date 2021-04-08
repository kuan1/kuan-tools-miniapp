import taro, { getOpenUserInfo } from "@tarojs/taro";
import * as Api from "@/api/user";
import authority from "@/utils/authority";

let sessioned = false;
let preCode2session;

// code换session，防止并发
export async function doCode2session(force = false, cb = () => {}, error = {}) {
  const cache = authority.get() || {};
  if ((sessioned || cache.nickname) && !force) return cache;
  try {
    const { code } = await taro.login();
    const user = await Api.code2session(code);
    authority.set(user);
    sessioned = true;
    preCode2session = null;
    cb(user);
    return user;
  } catch (e) {
    preCode2session = null;
    error(e);
    return Promise.reject(e);
  }
}
export function code2session(force = false) {
  if (preCode2session) return preCode2session;
  preCode2session = doCode2session(force);
  return preCode2session;
}

// getUserInfo
export async function getUserInfo() {
  await code2session();
  const { encryptedData, iv } = await taro.getUserInfo();
  const user = await Api.getUserInfo({ encryptedData, iv });
  authority.set(user);
  return user;
}

// getUserProfile
async function doGetUserProfile() {
  const { encryptedData, iv } = await taro.getUserProfile({
    desc: "为了更好的提供学习体验",
    lang: "zh_CN"
  });
  const user = await Api.getUserInfo({ encryptedData, iv });
  authority.set(user);
  return user;
}
export async function getUserProfile() {
  if (!taro.canIUse("getUserProfile")) return getUserInfo();
  const cache = authority.get() || {};
  // 不可以在异步方法中调用getUserProfile
  return cache.token ? doGetUserProfile() : code2session();
}
