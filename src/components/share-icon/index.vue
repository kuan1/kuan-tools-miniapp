<template>
  <view class="share-icon" @tap.stop="$emit('tap')">
    <image class="share-img" :src="src" />
    <view class="smaller">{{ text }}</view>
    <button :data-share="share" class="share-button" open-type="share"></button>
  </view>
</template>

<script>
export default {
  props: {
    share: {
      type: [String, Number],
      default: "",
    },
    text: {
      type: String,
      default: "分享",
    },
  },
  data() {
    return {
      src: require("./images/share.png"),
    };
  },
};
</script>

<style lang="less">
.share-icon {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #666;
  opacity: 0.8;
  position: relative;
  .share-img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  .share-button {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
