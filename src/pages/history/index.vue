<template>
  <view class="page-container">
    <question-list :list="list" />
    <loading-footer :list="list" :total="total" />
  </view>
</template>

<script>
import * as Api from "@/api/question";

import LoadingFooter from "@/components/loading-footer";
import QuestionList from "@/pages/index/components/question-list";

export default {
  components: {
    LoadingFooter,
    QuestionList,
  },
  data() {
    return {
      payload: { page: 1, size: 15 },
      list: [],
      total: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  onReachBottom() {
    this.fetchMore();
  },
  methods: {
    async fetchData() {
      const { list = [], total = 0 } = await Api.historyList(this.payload);
      this.list = list;
      this.total = total;
    },
    async fetchMore() {
      const { total, list, payload = {} } = this;
      if (total <= list.length) return;
      payload.page = (payload.page || 1) + 1;
      const { list: data = [], total: t = 0 } = await Api.historyList(payload);
      this.list = [...list, ...data];
      this.total = t;
    },
  },
};
</script>
