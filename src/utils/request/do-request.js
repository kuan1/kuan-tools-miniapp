import Taro from "@tarojs/taro";
import qs from "@halobear/utils/qs";

import { apiUrl } from "@/constants/config"; // 配置文件
import authority from "../authority";

export default ({
  baseUrl = apiUrl,
  url,
  data = {},
  params = {},
  method = "get",
  header: defaultHeader = {}
}) => {
  const header = {
    "content-type": "application/json",
    ...defaultHeader
  };

  const { token } = authority.get() || {};
  if (token) header.Authorization = `Bearer ${token}`;

  return new Promise(async (resolve, reject) => {
    let search = qs.stringify(params);
    const finalUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    const options = {
      url: finalUrl + (search ? `?${search}` : search),
      data,
      method: method.toUpperCase(),
      header
    };
    Taro.request({
      ...options,
      success(result) {
        const { success, data: res, info } = result.data;
        if (!success) {
          const e = new Error(info);
          e.response = result;
          e.statusCode = result.statusCode;
          e.info = info;
          reject(e);
        } else {
          resolve(res);
        }
      },
      fail(e) {
        reject(e);
      }
    });
  });
};
