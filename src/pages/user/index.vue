<template>
  <view class="user-outer page-container">
    <view class="flex1">
      <view class="user-header">
        <view class="avatar">
          <open-data type="userAvatarUrl" />
        </view>
        <view class="name">
          <open-data type="userNickName" />
        </view>
      </view>

      <view class="user-action">
        <view class="user-card">
          <view class="item" @tap="toCollect">
            <view class="value">{{ statistics.collectTotal }}</view>
            <view class="label">我的收藏</view>
          </view>
          <view class="item" @tap="toHistory">
            <view class="value">{{ statistics.historyTotal }}</view>
            <view class="label">阅读历史</view>
          </view>
        </view>

        <view class="actions">
          <view class="action" @tap="to('about')">
            <view>关于更多</view>
            <view class="arrow-right" />
          </view>
          <view class="action">
            <view>意见反馈</view>
            <view class="arrow-right" />
            <button class="coverfix" open-type="contact" />
          </view>
        </view>
      </view>
    </view>

    <view
      class="user-tips"
      @tap="copy('https://github.com/kuan1/kuan-tools-miniapp')"
    >
      项目github源码地址<text class="copy">(复制)</text>
    </view>
  </view>
</template>

<script>
import taro from "@tarojs/taro";
import { mapState } from "vuex";
import { to } from "@/utils/router";
import { toast } from "@/utils/feedback";

export default {
  computed: {
    ...mapState({
      statistics: (state) => state.question.statistics,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchStatistics");
  },
  methods: {
    to,
    toCollect() {
      if (this.statistics.collectTotal) {
        to("collect");
      } else {
        toast("你还没有收藏~");
      }
    },
    toHistory() {
      if (this.statistics.historyTotal) {
        to("history");
      } else {
        toast("你还没有阅读~");
      }
    },
    async copy(text) {
      if (!text) return;
      await taro.setClipboardData({ data: text });
      toast(`已复制${text}`);
    },
  },
};
</script>

<style lang="less">
.user-outer {
  display: flex;
  flex-direction: column;
}

.user-header {
  height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    width: 100%;
    padding: 100%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background: linear-gradient(60deg, #4e6ef2, rgba(#4e6ef2, 0.5));
    border-radius: 50%;
  }
  .avatar {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
    border: 4px solid rgba(255, 255, 255, 0.5);
  }
  .name {
    position: relative;
    color: white;
    padding: 20px;
  }
}

.user-card {
  border-radius: 10px;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.03);
  height: 158px;
  width: 690px;
  margin: -64px auto 0;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 28px;
  line-height: 1.5;
  color: #666;
  .item {
    flex: 1;
    text-align: center;
    &:first-child {
      border-right: 2px solid #eee;
    }
  }
  .value {
    font-weight: bold;
    font-size: 34px;
    color: #333;
  }
}

.user-action {
  // background-color: #fff;
  .actions {
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.03);
    width: 690px;
    padding: 20px 30px;
    background-color: #fff;
    margin: 30px auto;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .coverfix {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .action {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 60px;
    position: relative;
    font-size: 28px;
    &::before {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      background-color: #999;
      border-radius: 100%;
      position: absolute;
      left: 24px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    &:not(:last-child) {
      border-bottom: 2px solid #eee;
    }
  }
}

.user-tips {
  text-align: center;
  font-size: 20px;
  color: #999;
  padding: 1em;
  .copy {
    color: #4e6ef2;
  }
}
</style>
