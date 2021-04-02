<template>
  <view class="index-page">
    <search-header />
    <view class="list">
      <view v-for="(item, i) in list" :key="item.id" class="card">
        <view class="card-title">{{ i + 1 }}. {{ item.title }}</view>
        <wemark :highlight="true" :md="item.brief" class="brief" />

        <view class="footer">
          <view v-for="tag in item.tag" :key="tag" class="tags">
            <view class="tag">{{ tag }}</view>
          </view>
          <view class="action">
            <like-icon class="icon-item" />
            <share-icon :share="item.id" class="icon-item" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

import LikeIcon from "@/components/like-icon";
import ShareIcon from "@/components/share-icon";
import SearchHeader from "./components/search-header";

export default {
  components: {
    LikeIcon,
    ShareIcon,
    SearchHeader,
  },
  computed: {
    ...mapState({
      list: (state) => state.question.list,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchQuestion");
  },
  onReachBottom() {
    this.$store.dispatch("fetchMoreQuestion");
  },
  onShareAppMessage(e) {
    if (e.from === "button") {
      const id = e.target.dataset.share;
      const { title } = this.list.find((item) => item.id == id) || {};
      return { title, path: `/pages/detail/index?id=${id}` };
    }
    return { title: "前端面试" };
  },
};
</script>

<style lang="less">
.index-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  .list {
    overflow: hidden;
  }
  .card {
    margin: 26px;
    padding: 26px 30px;
    border-radius: 15px;
    background-color: #fff;
  }
  .card-title {
    font-size: 32px;
    padding: 10px 0;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #eee;
    padding-top: 20px;
    margin-top: 20px;
  }
  .action {
    display: flex;
    align-items: center;
  }
  .icon-item {
    margin-left: 25px;
  }
  .tags {
    display: flex;
    align-items: center;
    .tag {
      background-color: #ccc;
      color: white;
      height: 34px;
      line-height: 34px;
      font-size: 24px;
      border-radius: 4px;
      padding: 0 10px;
      margin-right: 10px;
    }
  }
}
</style>
