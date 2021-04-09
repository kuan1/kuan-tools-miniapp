<template>
  <view class="index-page">
    <search-header />
    <question-list :list="list" />

    <loading-footer :list="list" :total="total" :text="text" />
  </view>
</template>

<script>
import { mapState } from "vuex";

import LoadingFooter from "@/components/loading-footer";
import SearchHeader from "./components/search-header";
import QuestionList from "./components/question-list";

export default {
  components: {
    LoadingFooter,
    SearchHeader,
    QuestionList,
  },
  computed: {
    ...mapState({
      list: (state) => state.question.list,
      payload: (state) => state.question.payload,
      total: (state) => state.question.total,
    }),
    text() {
      const { list = [], payload } = this;
      return payload.title && !list.length ? "没有搜索到内容～" : "已经到底～";
    },
  },
  mounted() {
    this.$store.dispatch("fetchQuestion");
  },
  onReachBottom() {
    this.$store.dispatch("fetchMoreQuestion");
  },
  onShareAppMessage() {
    return { title: "前端面试" };
  },
};
</script>

<style lang="less">
.index-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
