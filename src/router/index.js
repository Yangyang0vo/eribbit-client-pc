import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
]
//  vue2.0 nwe VueRouter({}) 创建路由
// vue3.0 createRouter({})
const router = createRouter({
  // 使用hash 的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
