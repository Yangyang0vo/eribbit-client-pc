// 分类模块

import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合 依赖topCategory 重新设置 保证项目初始化就要数据 不至于白屏
      list: topCategory.map(item => ({ name: item })
      )
    }
  },
  // 修改分类数据
  mutations: {
    // payload 所有的分类集合
    setList(state, payload) {
      state.list = payload
    },
    // 修改当前一级分类下的open数据为true
    show(state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide(state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  // 获取分类函数
  actions: {
    // 从state 中直接解构出 commit方法 直接使用commit
    async getList({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 给一级分类加上一个控制二级分类显示隐藏的数据open
      data.result.forEach(item => {
        item.open = false
      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
