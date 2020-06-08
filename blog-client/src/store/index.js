import Vue from 'vue'
import Vuex from 'vuex'
//分了两个模块，一个是auth，一个是blog,凡是跟用户登录注册相关的信息放到auth里面。凡是跟blog操作相关的东西放到blog里面
import auth from './modules/auth'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({//创造一个store对象，提供给全局的Vue使用
  modules: {
    auth,
    blog
  }
})