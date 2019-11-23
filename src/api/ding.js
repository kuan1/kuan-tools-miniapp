import request from "@/utils/request";

// 发送钉钉消息
export function detail(id) {
  return request({
    url: `/api/blog/question/${id}`
  });
}
