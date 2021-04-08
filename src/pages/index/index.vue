<template>
  <view class="index-page">
    <search-header />
    <view class="list">
      <view
        v-for="(item, i) in list"
        :key="item.id"
        class="card"
        @tap="toDetail(item.id)"
      >
        <view class="card-title">{{ i + 1 }}. {{ item.title }}</view>
        <wemark :highlight="true" :md="item.brief" class="brief" />

        <view class="footer">
          <view v-for="tag in item.tag" :key="tag" class="tags">
            <view class="tag">{{ tag }}</view>
          </view>
          <view class="action">
            <views-icon text="100" class="icon-item" />
            <like-icon text="10" class="icon-item" />
          </view>
        </view>
      </view>
    </view>
    <view v-if="total > currentTotal" class="index-footer">
      <view class="halo-circle-loading">
        <view class="loading-dot"></view>
      </view>
      <view class="text">加载中...</view>
    </view>
    <view v-else class="index-footer">
      <view v-if="payload.title && !currentTotal">没有搜索了～</view>
      <view v-else-if="currentTotal"> 已经到底～ </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import Taro from "@tarojs/taro";

import LikeIcon from "@/components/like-icon";
import ViewsIcon from "@/components/views-icon";
import SearchHeader from "./components/search-header";

export default {
  components: {
    LikeIcon,
    ViewsIcon,
    SearchHeader,
  },
  computed: {
    ...mapState({
      list: (state) => state.question.list,
      payload: (state) => state.question.payload,
      total: (state) => state.question.total,
    }),
    currentTotal() {
      return this.list.length;
    },
  },
  mounted() {
    this.$store.dispatch("fetchQuestion");
  },
  onReachBottom() {
    this.$store.dispatch("fetchMoreQuestion");
  },
  onShareAppMessage(e) {
    return { title: "前端面试" };
  },
  methods: {
    toDetail(id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`,
      });
    },
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
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.012);
  }
  .card-title {
    font-size: 34px;
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
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
      height: 34px;
      line-height: 34px;
      font-size: 24px;
      border-radius: 4px;
      padding: 0 10px;
      margin-right: 10px;
      transform-origin: left center;
      transform: scale(0.9);
    }
  }

  .index-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    color: #999;
    font-size: 30px;
    .text {
      padding-left: 15px;
    }
  }
}
</style>
