import { Configuration } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import { DefinePlugin } from 'webpack';
import * as dotenv from "dotenv";
import WebpackBar from "webpackbar";
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

const path = require("path");

const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV)
});

const tsxRegex = /\.(ts|tsx)$/;
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const stylRegex = /\.styl$/;

const styleLoadersArray = [
    {
        loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    },
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "[path][name]__[local]--[hash:5]",
            }
        }
    },
    "postcss-loader",
]

const baseConfig: Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"),
    output: {
        filename: "static/js/[name].[chunkhash:8].js",
        path: path.join(__dirname, "../dist"),
        clean: true,
        publicPath: "/",
        assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: tsxRegex, // 匹配.ts, tsx文件
                exclude: /node_modules/,
                use: 'babel-loader'
                // use: ['thread-loader', 'babel-loader'] // 项目变大之后再开启多进程loader
            },
            {
                test: cssRegex, //匹配 css 文件
                use: styleLoadersArray,
            },
            {
                test: lessRegex,
                use: [
                    ...styleLoadersArray,
                    {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                        importLoaders: 2,
                        // 可以加入modules: true，这样就不需要在less文件名加module了
                        modules: true,
                        // 如果要在less中写类型js的语法，需要加这一个配置
                        javascriptEnabled: true
                        },
                    },
                    },
                ],
            },
            {
                test: sassRegex,
                use: [
                    ...styleLoadersArray,
                    "sass-loader",
                ],
            },
            {
                test: stylRegex,
                use: [
                    ...styleLoadersArray,
                    "stylus-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    }
                },
                generator: {
                    filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
                },
            },
            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64
                    }
                },
                generator:{
                    filename:'static/fonts/[hash][ext][query]', // 文件输出目录和命名
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64
                    }
                },
                generator:{
                    filename:'static/media/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                },
            },
            {
                test: /\.json$/,
                type: "asset/resource", // 将json文件视为文件类型
                generator: {
                    // 这里专门针对json文件的处理
                    filename: "static/json/[name].[hash][ext][query]",
                },

            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
        alias: {
            "@": path.join(__dirname, "../src")
        },
        modules: [path.resolve(__dirname, "../node_modules")],
    },
    plugins: [
        new HtmlWebpackPlugin({
        // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
        title: "webpack-react-ts",
        filename: "index.html",
        template: path.join(__dirname, "../public/index.html"),
        inject: true,
        hash: true,
        cache: false,
        // 压缩html资源
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true, //去空格
            removeComments: true, // 去注释
            minifyCSS: true,
            minifyJS: true,
        },
        nodeModules: path.resolve(__dirname, "../node_modules"),
      }),
      new WebpackBar({
        color: "#85d",
        basic: false,
        profile: false,
      }),
      new DefinePlugin({
        "process.env": JSON.stringify(envConfig.parsed),
        "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      })
    ],
    cache: {
        type: 'filesystem',
    },
    devtool: 'eval-cheap-module-source-map'
};

export default baseConfig;