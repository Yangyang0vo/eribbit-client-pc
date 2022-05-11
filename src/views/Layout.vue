<template>
  <!-- 顶部通览 -->
  <AppTopnav />
  <!-- 头部组件 -->
  <AppHeader />
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
export default {
  name: 'XtxLayout',
  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style lang="less" scoped>
.app-body {
  height: 600px;
}
</style>
