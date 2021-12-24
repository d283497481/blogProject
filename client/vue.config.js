const path = require('path');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    name: process.env.VUE_APP_BASE_TITLE
  },
  // 配置使用stylus全局变量
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
