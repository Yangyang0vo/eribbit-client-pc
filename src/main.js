import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ui from './components/library'
// 1. 重置样式
import 'normalize.css'
// 2. 自己项目的重置样式和公共样式
import '@/assets/styles/common.less'
// 插件的使用，在main.js使用app.use(插件)
createApp(App).use(store).use(router).use(ui).mount('#app')
