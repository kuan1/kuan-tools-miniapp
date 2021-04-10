<template>
  <view class="about-page">
    <view class="title">关于项目</view>
    <view @tap="copy('https://github.com/kuan1/kuan-tools-miniapp')">
      托管地址： github<text class="copy">(复制)</text>
    </view>
    <view @tap="copy('https://github.com/kuan1/kuan-tools-miniapp')">
      这里的题目大部分来自github和掘金，作为一个业余前端面试官，后续还会整理更多前端的面试。如果答案有问题的或者不够全面的话，欢迎反馈，我会在第一时间更正。希望和大家一块学习一块进步。
    </view>
    <view class="title">关于我</view>
    <view>程序作者：卢忠宽</view>
    <view @tap="copy('https://www.luzhongkuan.cn')">
      个人博客：www.luzhongkuan.cn<text class="copy">(复制)</text>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { toast } from "@/utils/feedback";

export default {
  methods: {
    async copy(text) {
      if (!text) return;
      await Taro.setClipboardData({ data: text });
      toast(`已复制${text}`);
    },
  },
};
</script>

<style lang="less">
.about-page {
  min-height: 100vh;
  padding: 30px;
  background-color: #fff;
  line-height: 2;
  color: #666;
  font-size: 28px;
  .title {
    font-size: 38px;
    font-weight: bold;
    padding-top: 20px;
  }
  .copy {
    color: #4e6ef2;
  }
}
</style>
