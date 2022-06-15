import { createApp } from 'vue'             // Vue 3.x 引入 vue 的形式

// 加入 element ui
import 'element-plus/dist/index.css'
import ElementUI from 'element-plus'

import App from './App.vue'                 // 引入 APP 页面组建

// 通过 createApp 初始化 app
const app = createApp(App);
app.use(ElementUI);

// 将页面挂载到 root 节点
app.mount(
    '#app'
);
