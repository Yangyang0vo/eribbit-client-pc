import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const routes = [
  // 一级路由 布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  }
]
//  vue2.0 nwe VueRouter({}) 创建路由
// vue3.0 createRouter({})
const router = createRouter({
  // 使用hash 的路由模式
  history: createWebHashHistory(),
  routes,
  // 切换路由的时候 滚动到页面顶部
  scrollBehavior() {
    //  vue2.0 x y 控制
    //  vue3.0 left top 控制
    return { left: 0, top: 0 }
  }
})

export default router
