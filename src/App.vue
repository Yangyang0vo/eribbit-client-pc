<template>
  <div class="container">
    <!-- 1.使用 模块A state的数据 -->
    <p>{{ $store.state.moduleA.username }}</p>
    <!-- 1.1使用 模块A 的getters数据 -->
    <p>{{ $store.getters.updateName }}</p>
    <!-- 2.使用 模块B state的数据 -->
    <p>{{ $store.state.moduleB.username }}</p>
    <p>{{ $store.getters['moduleB/updateName'] }}</p>
    <button @click="mutataionsFn">mutations btn</button>
    <button @click="actionsFn">actions btn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const mutataionsFn = () => {
      // 调用mutations方法
      store.commit('moduleB/updateName')
    }
    const actionsFn = () => {
      // 调用actions
      store.dispatch('moduleB/updateName')
    }
    return {
      mutataionsFn,
      actionsFn
    }
  }
}
</script>

<style></style>
