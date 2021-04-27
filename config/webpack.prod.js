/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { merge } = require('webpack-merge')
const { ContextReplacementPlugin } = require('webpack')
const BrotliPlugin = require('brotli-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  bail: true,
  plugins: [
    new CleanWebpackPlugin(),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en-gb/),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
})
