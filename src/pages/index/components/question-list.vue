<template>
  <view class="question-list">
    <view
      v-for="item in list"
      :key="item.id"
      class="card"
      @tap="toDetail(item.id)"
    >
      <view class="card-title">{{ item.id }}. {{ item.title }}</view>
      <wemark :highlight="true" :md="item.brief" class="brief" />

      <view class="footer">
        <view v-for="tag in item.tag" :key="tag" class="tags">
          <view class="tag">{{ tag }}</view>
        </view>
        <view class="action">
          <views-icon :text="item.view_count" class="icon-item" />
          <like-icon
            :value="!!item.is_like"
            :text="item.like_count"
            class="icon-item"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";

import LikeIcon from "@/components/like-icon";
import ViewsIcon from "@/components/views-icon";

export default {
  components: {
    LikeIcon,
    ViewsIcon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
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
.question-list {
  overflow: hidden;
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
    pointer-events: none;
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
}
</style>
