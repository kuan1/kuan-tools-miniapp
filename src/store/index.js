import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") return;
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default new Vuex.Store({
  modules,
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
});
