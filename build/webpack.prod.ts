import { Configuration } from 'webpack';
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import { merge } from 'webpack-merge';
import baseConfig from './webpack.base';

import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const globAll = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')


const prodConfig: Configuration = merge(baseConfig, {
    mode: "production",
    plugins: [
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "../public"), // 复制public下文件
              to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
              filter: (source) => !source.includes("index.html"), // 忽略index.html
            },
          ],
        }),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css' // 加上[contenthash:8]
        }),
        new CompressionPlugin({
          test: /\.(js|css)$/, // 只生成css,js压缩文件
          filename: '[path][base].gz', // 文件命名
          algorithm: 'gzip', // 压缩格式,默认是gzip
          threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
          minRatio: 0.8 // 压缩率,默认值是 0.8
        }),
        new PurgeCSSPlugin({
          paths: globAll.sync(
            [`${path.join(__dirname, '../src')}/**/*`, path.join(__dirname, '../public/index.html')],
            {
              nodir: true,
            }
          ),
          only: ["dist"],
          safelist: {
            standard: [/^ant-/]
          }
        }),
    ],
    optimization: {
      runtimeChunk: {
        name: 'mainifels'
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            minChunks: 1,
            chunks: 'initial',
            minSize: 0,
            priority: 1
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            chunks: 'initial',
            minSize: 0
          }
        }
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              pure_funcs: ['console.log'],
            }
          }
        })
      ]
    },
    performance: {
      hints: false,
      maxAssetSize: 4000000,
      maxEntrypointSize: 5000000,
    }
});


export default prodConfig;
