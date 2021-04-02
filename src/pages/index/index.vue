<template>
  <view class="index-page">
    <search-header />
    <view class="list">
      <view v-for="(item, i) in list" :key="item.id" class="card">
        <view class="card-title">{{ i + 1 }}. {{ item.title }}</view>
        <wemark :md="item.brief" class="brief" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

import SearchHeader from "./components/search-header";

export default {
  components: {
    SearchHeader,
  },
  computed: {
    ...mapState({
      list: (state) => state.question.list,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchQuestion");
  },
  onReachBottom() {
    this.$store.dispatch("fetchMoreQuestion");
  },
};
</script>

<style lang="less">
.index-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  .list {
    overflow: hidden;
  }
  .card {
    margin: 26px;
    padding: 26px 30px;
    border-radius: 15px;
    background-color: #fff;
  }
  .card-title {
    font-size: 30px;
  }
}
</style>
