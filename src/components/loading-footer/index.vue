<template>
  <view v-if="total > currentTotal" class="loading-footer">
    <view class="halo-circle-loading">
      <view class="loading-dot"></view>
    </view>
    <view class="text">加载中...</view>
  </view>
  <view v-else class="loading-footer">
    <view v-if="currentTotal"> {{ text }} </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "已经到底～",
    },
  },
  computed: {
    currentTotal() {
      return this.list.length;
    },
  },
};
</script>

<style lang="less">
.loading-footer {
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
</style>
