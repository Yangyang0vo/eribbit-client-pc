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
    }
  },
  // 获取分类函数
  actions: {
    // 从state 中直接解构出 commit方法 直接使用commit
    async getList({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
