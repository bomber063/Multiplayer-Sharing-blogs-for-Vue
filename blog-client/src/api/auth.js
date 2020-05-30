import request from '@/helpers/request'

const URL = {//这里面分别保存注册，登陆，登出，判断用户是否登录的URL地址
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

export default {//这里结合了/helpers/request里面的request请求有三个参数，还有后端的用户需要传的参数对比封装的函数
  register({username, password}) {
    return request(URL.REGISTER, 'POST', { username, password })
  },

  login({username, password}) {
    return request(URL.LOGIN, 'POST', { username, password })
  },

  logout() {
    return request(URL.LOGOUT)
  },

  getInfo() {
    return request(URL.GET_INFO)
  }
}