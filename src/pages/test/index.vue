<template>
  <view>
    <button @tap="test">测试页面</button>
  </view>
</template>

<script>
import { getUserProfile, getUserInfo, code2session } from "@/utils/login";

export default {
  methods: {
    async test() {
      const res = await getUserProfile();
      console.log(res);
    },
  },
};
</script>

<style>
</style>
