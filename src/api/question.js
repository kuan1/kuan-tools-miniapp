import request from "@/utils/request";

// 问题详情
export function detail(id) {
  return request({
    url: `/api/blog/question/${id}`
  });
}

// 问题列表
export async function list(params) {
  const { list = [], total = 0 } = await request({
    url: `/api/blog/question`,
    params: {
      page: 1,
      size: 15,
      ...params
    }
  });
  list.forEach(item => {
    item.tag = item.tag.split(",").filter(Boolean);
  });

  return { list, total };
}

// 标签
export function tags() {
  return request({
    url: "/api/blog/questionTag"
  });
}
