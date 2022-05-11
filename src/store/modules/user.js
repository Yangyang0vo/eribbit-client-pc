// 用户模块

export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: 'sss',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息  playload就是用户信息对象
    setUser(state, playload) {
      state.profile = playload
    }
  }
}
