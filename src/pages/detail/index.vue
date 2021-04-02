<template>
  <view class="detail-container">
    <template v-if="data.id">
      <view class="detail-title">{{ data.title }}</view>
      <view v-if="data.brief" class="brief-wrap">
        <wemark :highlight="true" :md="data.brief" />
      </view>

      <button v-if="!visible" class="answer-btn" @tap="visible = true">
        显示答案
      </button>
      <view v-else class="answer">
        <view class="answer-title">答案：</view>
        <wemark :highlight="true" :md="data.content" />
      </view>
    </template>
  </view>
</template>

<script>
import * as Api from "@/api/question";
import router from "@/utils/router";

export default {
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
    padding: 30px;
    background-color: #fff;
    font-size: 36px;
    margin-bottom: 30px;
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
  }
}
</style>
