<template>
  <!-- vue2.0 需要根元素 vue3.0 可以是代码片段  Fargment-->
  <div>App</div>
  <!-- 使用根模块 state的数据 -->
  <p>{{ $store.state.username }}</p>
  <!-- 使用根模块的getters 的数据-->
  <p>{{ $store.getters['newName'] }}</p>
  <button @click="mutationsFn">我要改名了</button>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    // 使用vuex 仓库
    const store = useStore()
    // 1.使用根模块的state 数据
    console.log(store.state.username)
    // 2.使用根模块的getters 数据
    console.log(store.getters.newName)
    // 3.使用根模块的mutations 方法
    const mutationsFn = () => {
      // commit 同步方法
      // store.commit('updateName')
      // 使用Actions 里的方法
      // dispath 异步方法
      store.dispatch('updateName')
    }
    return {
      mutationsFn
    }
  }
}
</script>

<style></style>
