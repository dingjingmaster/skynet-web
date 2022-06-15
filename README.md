# skynet-web
> 数据展示 web 界面部分

## 运行
```shell
npm install
```

## 安装问题
1. 如果系统装有vpn可能导致`npm`无法正常下载依赖，执行`npm config set proxy http://127.0.0.1:7890 && npm config set  https-proxy http://127.0.0.1:7890`。**注意把ip和端口替换为你机器上的，如果不用vpn则无此问题**
2. 运行`npm install`报错，执行:`npm cache clear --force && npm config set registry https://registry.npm.taobao.org`

## 完整项目搭建
1. `mkdir skynet-web && cd skynet-web`
2. `npm init -y`
3. 安装webpack和webpack-cli `npm i webpack webpack-cli --save-dev`
4. 项目根目录下`mkdir src && touch src/main.js && touch index.html && webpack.config.js`
5. 修改`webpack.config.js`
```js
// webpack.config.js
const path = require('path')

module.exports = {
  mode: 'development', // 环境模式
  entry: path.resolve(__dirname, './src/main.js'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].js' // 打包完的静态资源文件名
  }
}
```
6. 修改`package.json`的`scripts`属性
```js
"scripts": {
  "dev": "webpack --config ./webpack.config.js"
}
```
7. 运行打包指令`yarn dev` 或 `npm run dev`，在 `dist/` 目录下生成的`js`目录就是`webpack`生成的
8. 添加`html-webpack-plugin`将`index.html`作为模板打出到`dist/`文件夹，在 `webpack.config.js` 加入如下内容
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'), // 我们要使用的 html 模板地址
      filename: 'index.html', // 打包后输出的文件名
      title: '手搭 Vue 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    })
  ]
}
```
9. 最后给 `index.html` 加上内容:
```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
10. 给`main.js`加点内容
```js
const root = document.getElementById('root')
root.textContent = 'xxxxxxxxxxxxxx'
```
10. 打包 `npm run dev` 可看 `dist` 目录下双击打开 `index.html`
11. 安装 `vue`, `npm i vue@next --save`
12. 在`src`目录下新建`App.vue`
```
<template>
  <div>“喂你好，是尼克陈吗？我是叮咚买菜的送菜员，由于您电话打不通，
	特意在页面里跟您说一声，您菜到家了。”</div>
</template>

<script>
export default {

}
</script>
```

`main.js` 里加入
```
import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建

const app = createApp(App) // 通过 createApp 初始化 app
app.mount('#root') // 将页面挂载到 root 节点

```
13. 安装`vue-loader`，基于`webpack`的一个`loader`插件，解析和转换`.vue`文件，提取其中的`js`、`css`、`HTML` 给对应 `laoder` 处理
14. 安装`@vue/compiler-sfc`；`vue2.x`是`vue-template-compiler`，处理`.vue`内容为`ast`
```
npm i vue-loader@next --save
npm i @vue/compiler-sfc
```
15. webpack改为
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: '手搭 Vue 开发环境'
    }),
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin()
  ]
}
```
VueLoaderPlugin 的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
16. style
我如果在 App.vue 中加入 style 内容，如下所示：
```
<template>
  <div>“喂你好，是尼克陈吗？我是叮咚买菜的送菜员，
  由于您电话打不通，特意在页面里跟您说一声，您菜到家了。</div>
</template>

<script>
export default {

}
</script>
<style>
  div {
    color: yellowgreen;
  }
</style>

```
需要:
style-loader：将 css 样式插入到页面的 style 标签中。
css-loader：处理样式中的 url ，如 url('@/static/img.png') ，这时浏览器是无法识别 @ 符号的。

> 这里插播一下，vue-style-loader 是服务端渲染的时候，需要的 loader，包括 less-loader、sass-loader 都是在用到的时候，才去添加。

安装完后，我们在 webpack.config.js 下添加如下代码：
```
module: {
	rules: [
  	...
    {
      test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
    }
    ...
  ]
}
```
17. 清空webpack生成的文件
还有一个小插件是必备的， clean-webpack-plugin ，它的作用就是每次打包的时候，都会把 dist 目录清空，防止文件变动后，还有残留一些老的文件，以及避免一些缓存问题。 webpack.config.js 配置如下：
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugins: [
   new CleanWebpackPlugin()
]
```

18. babel
可以正常敲 Vue 代码之后，我们还要考虑一下代码的浏览器兼容情况，毕竟现代前端框架 Vue 、 React 、 Angular 等都是对浏览器有要求的。就比如 IE 全员不支持箭头函数，这你找谁说理。

babel 是把我们随心所欲（最新特性一顿乱写）写的代码，编译成浏览器可识别的代码（低版本浏览器对新特性的支持不友好），就比如上述箭头函数，经过 babel 的转化后，就会变成普通的函数。

babel 的使用方式

它有三种使用方式：

- 使用单体文件。
- 命令行（babel-cli）。
- 构建工具如 webpack 中的 babel-loader 插件。

19. devserver
每次写完代码都要重新打包才能看到效果，“TMD 烦死了”。这里需要一个实时更新最新代码的能力。于是 webpack-dev-server 为我们实现了这个能力。 安装它：
` webpack-dev-server `

在 webpack.config.js 下添加如下配置：

```
devServer: {
  contentBase: path.resolve(__dirname, './dist'),
  port: 8080,
  publicPath: '/'
}
```
> 注意了啊，webpack-cli 升级到 4.x 的时候，就不能用 webpack-dev-server 跑脚本了，而是改为 webpack serve 去跑

https://juejin.cn/post/6921161482663100423

