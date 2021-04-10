<template>
  <view class="search-header-outer">
    <view class="search-header">
      <view class="avatar" @tap="toUser">
        <open-data type="userAvatarUrl" />
      </view>
      <view class="search-wrap">
        <input
          v-model="text"
          class="input"
          placeholder="输入标题搜索"
          @confirm="toSearch"
        />
        <icon v-if="text" class="clear" type="clear" :size="18" @tap="clear" />
        <button class="btn" @tap="toSearch">搜索</button>
      </view>
    </view>
    <view class="search-tags-outer tags-mask">
      <scroll-view
        :enhanced="true"
        :show-scrollbar="false"
        :scroll-with-animation="true"
        :scroll-x="true"
        :scroll-left="left"
        class="search-tags"
      >
        <view class="search-list">
          <view
            class="btn btn-0"
            :class="{ active: !payload.tag }"
            @tap="search('')"
          >
            全部
          </view>
          <view
            v-for="(item, i) in tags"
            :key="item"
            class="btn"
            :class="{ active: payload.tag == item, [`btn-${i + 1}`]: true }"
            @tap="search(item, i + 1)"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { mapState } from "vuex";

import { getWinWidth } from "@/utils";

export default {
  data() {
    return {
      text: "",
      left: 0,
      rects: [],
    };
  },
  computed: {
    ...mapState({
      tags: (state) => state.question.tags,
      payload: (state) => state.question.payload,
    }),
  },
  async mounted() {
    await this.$store.dispatch("fetchTags");
    this.calcRect();
  },
  methods: {
    clear() {
      this.text = "";
      this.toSearch();
    },
    toSearch() {
      this.left = 0;
      this.$store.dispatch("fetchQuestion", { title: this.text });
    },
    toUser() {
      Taro.navigateTo({
        url: "/pages/user/index",
      });
    },
    search(item, index) {
      if (this.payload.tag === item) return;
      Taro.pageScrollTo({ scrollTop: 0 });
      const target = this.rects[index] || {};
      const winWidth = getWinWidth(); // 设备宽度
      const offsetWidth = target.left;
      this.left = offsetWidth - winWidth / 2 + target.width / 2;
      this.text = "";
      const payload = { tag: item };
      this.$store.dispatch("fetchQuestion", payload);
    },
    calcRect() {
      setTimeout(async () => {
        const rects = [];
        for (let i = 0; i < this.tags.length + 1; i++) {
          let rect = await this.getDomRect(`.btn-${i}`);
          rects[i] = rect;
        }
        this.rects = rects;
      }, 50);
    },
    getDomRect(dom) {
      return new Promise((resolve) => {
        const query = Taro.createSelectorQuery();
        query
          .select(dom)
          .boundingClientRect(function (res) {
            resolve(res);
          })
          .exec();
      });
    },
  },
};
</script>

<style lang="less">
.search-header {
  height: 122px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.012);
  .avatar {
    width: 70px;
    height: 70px;
    border: 4px solid #4e6ef2;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #eee;
  }
  .search-wrap {
    height: 78px;
    flex: 1;
    margin: 0 auto;
    border: 2px solid #4e6ef2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .input {
    border: none;
    outline: none;
    flex: 1;
    padding: 0 1em;
  }
  .clear {
    font-size: 20px;
    margin-right: 1em;
  }
  .btn {
    width: 140px;
    height: 78px;
    box-sizing: border-box;
    background-color: #4e6ef2;
    color: white;
    border-radius: 0 !important;
    margin-right: -2px;
    border: none !important;
    outline: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.search-tags-outer {
  position: relative;
  &.tags-mask::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
}

.search-tags {
  height: 78px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  .search-list {
    display: flex;
    align-items: center;
    height: 78px;
    padding-left: 10px;
    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 1px;
      padding-right: 12px;
    }
  }
  .btn {
    height: 78px;
    line-height: 78px;
    padding: 0 30px;
    display: flex;
    font-size: 28px;
    font-weight: 400;
    color: #68676c;
    flex-shrink: 0;
    cursor: pointer;
    &.active {
      color: #323038;
      font-weight: bold;
      position: relative;
      &::after {
        content: "";
        width: 60%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 6px;
        margin: auto;
        background: #323038;
      }
    }
  }
}
</style>
