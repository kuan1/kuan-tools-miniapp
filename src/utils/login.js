import taro from "@tarojs/taro";
import * as Api from "@/api/user";
import authority from "@/utils/authority";

let preCode2session;

// code换session，防止并发
export async function doCode2session(force = false, cb = () => {}, error = {}) {
  const cache = authority.get() || {};
  if (cache.nickname && !force) return cache;
  try {
    const { code } = await taro.login();
    const user = await Api.code2session(code);
    authority.set(user);
    preCode2session = null;
    cb(user);
    return user;
  } catch (e) {
    preCode2session = null;
    error(e);
    return Promise.reject(e);
  }
}

export function code2session(force = false, cb) {
  if (preCode2session) return preCode2session;
  preCode2session = doCode2session(force, cb);
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
async function doGetUserProfile(callback) {
  const { encryptedData, iv } = await taro.getUserProfile({
    desc: "为了更好的提供学习体验",
    lang: "zh_CN"
  });
  const user = await Api.getUserInfo({ encryptedData, iv });
  authority.set(user);
  callback(user);
  return user;
}
export function getUserProfile(callback) {
  if (!taro.canIUse("getUserProfile")) return getUserInfo();
  const cache = authority.get() || {};
  // 不可以在异步方法中调用getUserProfile
  return cache.token
    ? doGetUserProfile(callback)
    : code2session(false, callback);
}

export async function check() {
  taro.checkSession({
    fail() {
      console.log(1234);
      code2session(true);
    }
  });
}
