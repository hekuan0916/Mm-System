import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
    rulesObj: {
      1: '超级管理员',
      2: '管理员',
      3: '老师',
      4: '学生'
    },
    roles: '超级管理员'
  },
  mutations: {},
  actions: {},
  modules: {}
})
