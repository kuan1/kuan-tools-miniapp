import request from "@/utils/request";

// 问题详情
export function detail(id) {
  return request({
    url: `/api/blog/question/${id}`
  });
}

// 问题列表
export function list(params) {
  return request({
    url: `/api/blog/question`,
    params: {
      page: 1,
      size: 15,
      ...params
    }
  });
}

// 标签
export function tags() {
  return request({
    url: "/api/blog/questionTag"
  });
}
