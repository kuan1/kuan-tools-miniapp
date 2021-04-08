<template>
  <view class="detail-container">
    <template v-if="data.id">
      <view class="detail-title">{{ data.title }}</view>
      <view class="subwrap">
        <view v-for="tag in data.tag" :key="tag" class="tags">
          <view class="tag">{{ tag }}</view>
        </view>
        <view class="action">
          <like-icon class="icon-item" />
          <share-icon :share="data.id" class="icon-item" />
        </view>
      </view>
      <view v-if="data.brief" class="brief-wrap">
        <wemark :highlight="true" :md="data.brief" />
      </view>

      <button v-if="!visible" class="answer-btn" @tap="visible = true">
        显示答案
      </button>
      <view v-else class="answer">
        <view class="answer-title">
          <view class="text">答案：</view>
          <view class="feedback">
            <text>问题反馈</text>
            <button class="contact-bg" open-type="contact"></button>
          </view>
        </view>
        <wemark :highlight="true" :md="data.content" />
      </view>
    </template>
  </view>
</template>

<script>
import * as Api from "@/api/question";
import router from "@/utils/router";

import LikeIcon from "@/components/like-icon";
import ShareIcon from "@/components/share-icon";

export default {
  components: {
    LikeIcon,
    ShareIcon,
  },
  data() {
    return {
      data: {},
      visible: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { id } = router.query;
      const data = await Api.detail(id);
      data.tag = data.tag.split(",").filter(Boolean);
      this.data = data;
      console.log(data);
    },
  },
};
</script>

<style lang="less">
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  overflow: hidden;
  .detail-title {
    padding: 30px 30px 0;
    background-color: #fff;
    font-size: 36px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.012);
  }
  .brief-wrap {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 690px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .answer-btn {
    width: 690px;
    display: block;
    margin: 30px auto;
    background-color: #4e6ef2;
    color: white;
  }
  .answer {
    margin: 30px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
  }
  .answer-title {
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .feedback {
      position: relative;
      color: #666;
      font-size: 0.8em;
    }
    .contact-bg {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .subwrap {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 30px;
    background-color: #fff;
    margin-bottom: 30px;
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
        background-color: rgba(0, 0, 0, 0.12);
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
}
</style>
