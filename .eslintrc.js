// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
module.exports = {
  extends: ["taro/vue"],
  rules: {
    "vue/no-lone-template": "off",
    "vue/no-multiple-slot-args": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off"
  }
};
