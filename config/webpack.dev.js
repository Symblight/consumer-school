/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const common = require('./webpack.common.js')
const devServerConfig = require('./webpack.server')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [new BundleAnalyzerPlugin()],
  stats: {
    colors: true,
    chunks: true,
    children: false,
    performance: true,
  },
  devServer: devServerConfig,
})
