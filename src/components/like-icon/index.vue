<template>
  <view class="like-wrap" @tap.stop="$emit('tap')">
    <image class="like-icon" :src="src" />
    <view class="smaller">{{ text }}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      value: false,
      type: Boolean,
    },
    text: {
      type: [String, Number],
      default: "收藏",
    },
  },
  computed: {
    src() {
      return this.value
        ? require("./images/like.png")
        : require("./images/dislike.png");
    },
  },
};
</script>

<style lang="less">
.like-wrap {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #666;
  opacity: 0.8;
  .like-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}
</style>
