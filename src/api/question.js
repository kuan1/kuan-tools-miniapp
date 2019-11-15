import request from "@/utils/request";

// 问题详情
export function detail(id) {
  return request({
    url: `/api/question/${id}`
  });
}

// 问题列表
export function list() {
  return request({
    url: `/api/question`
  });
}
