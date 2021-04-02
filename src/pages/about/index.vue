<template>
  <view class="about-page">
    <view class="title">关于我</view>
    <view>程序作者：卢忠宽</view>
    <view @tap="copy('https://github.com/kuan1/kuan-tools-miniapp')">
      项目托管：github(点击复制)
    </view>
    <view @tap="copy('https://www.luzhongkuan.cn')">
      个人博客：https://www.luzhongkuan.cn(点击复制)
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
  }
}
</style>
