module.exports = {
  env: {
    node: true,
    // 'vue/setup-compiler-macros': true
  },
  extends: ["eslint:recommended", "plugin:vue/base", "plugin:vue/vue3-essential", "plugin:vue/vue3-strongly-recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/script-setup-uses-vars': 'error',
    'vue/no-v-html': 'off'
  },
}
