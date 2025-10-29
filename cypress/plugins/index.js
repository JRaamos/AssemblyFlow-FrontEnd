const webpack = require('@cypress/webpack-preprocessor');
const { resolve } = require('path');

async function getWebpackConfig() {
  const webpackConfig = await import(resolve(__dirname, '../../cypress/webpack.config.js'));
  return webpackConfig.default;
}

module.exports = (on) => {
  return getWebpackConfig().then((webpackOptions) => {
    const options = {
      webpackOptions,
    };
    on('file:preprocessor', webpack(options));
  });
};
