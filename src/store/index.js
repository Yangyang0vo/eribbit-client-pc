import { createStore } from 'vuex'

// A 模块
const moduleA = {
  state: {
    username: 'moduleA'
  },
  getters: {
    updateName(state) {
      return state.username + ' getter'
    }
  }
}
// B 模块
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  getters: {
    updateName(state) {
      return state.username + ' getter'
    }
  },
  mutations: {
    updateName(state) {
      state.username = 'ls'
    }
  },
  actions: {
    updateName(context) {
      setTimeout(() => {
        context.commit('updateName')
      }, 1000)
    }
  }
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0  创建仓库createStore
// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '新名字'
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = 'ls'
//     }
//   },
//   actions: {
//     updateName(context) {
//       setTimeout(() => {
//         context.commit('updateName')
//       }, 1000)
//     }
//   },
//   modules: {
//   }
// })
