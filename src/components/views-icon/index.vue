<template>
  <view class="views-icon" @tap.stop="$emit('tap')">
    <image class="views-img" :src="src" />
    <view class="smaller">{{ text }}</view>
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
      type: [String, Number],
      default: "0",
    },
  },
  data() {
    return {
      src: require("./images/eye.png"),
    };
  },
};
</script>

<style lang="less">
.views-icon {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #666;
  opacity: 0.8;
  position: relative;
  .views-img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}
</style>
