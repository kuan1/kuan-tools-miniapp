import request from "@/utils/request/do-request";

export function code2session(code) {
  return request({
    url: "/api/miniapp/code2session",
    params: { code }
  });
}

export function getUserInfo(data) {
  return request({
    url: "/api/miniapp/getuserinfo",
    method: "post",
    data
  });
}
