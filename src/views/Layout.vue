<template>
  <!-- 顶部通览 -->
  <AppTopnav />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <Router-view />
  </div>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'XtxLayout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  //  获取下分类数据
  setup() {
    const store = useStore()
    //  应为开启了命名空间 所以得先写模块名 再写方法名
    // dispatch 是使用actions 里面的异步方法
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  height: 600px;
}
</style>
