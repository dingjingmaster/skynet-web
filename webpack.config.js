// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader/dist/index')

// 清空 webpack 生成到 dist/ 的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join("..", dir)
}

module.exports = {
    mode: 'development',                                            // 环境模式
    entry: path.resolve(__dirname, './src/main.js'),                // 打包入口
    // 支持路径中的 '@'
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@@': resolve("src"),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),                      // 打包出口
        filename: 'js/[name].js'                                    // 打包完的静态资源文件名
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),      // 我们要使用的 html 模板地址
            filename: 'index.html',                                 // 打包后输出的文件名
            title: '数据信息展示'                                     // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
        }),
        // 添加 VueLoaderPlugin 插件
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
}