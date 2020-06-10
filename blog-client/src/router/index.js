import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/pages/Create/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/template.vue'
import My from '@/pages/My/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'
import auth from '../store/modules/auth'
import store from '../store'
window.store=store
Vue.use(Router)

const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [
    {
      path: '/create',
      component: Create,
      meta:{requiresAuth:true}
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta:{requiresAuth:true}
    },    
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },  
    {
      path: '/my',
      component: My,
      meta:{requiresAuth:true}
    },      
    {
      path: '/user/:userId',//某个用户的博客
      component: User
    }
  ]
})

//每一个历史记录进行匹配遍历
router.beforeEach((to, from, next) => {//这里的router就是前面创建的new Router对象，beforeEach就是每一次路由切换都会去执行里面的代码
  if (to.matched.some(record => record.meta.requiresAuth)) {//这里用到$route.matched和原生的数组的API——some(),检查是否存在meta.requiresAuth为真值的，如果有就返回true
// 这里的!store.getters.isLogin是发了请求后在从false改为true的，但是这句代码在发请求前已经执行了。所以来不及等到请求后修改的正确值，就算是登陆了用了还是false。所以要用异步的checkLogin来判断是否登陆

    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {//看看是不是登陆状态，没有登陆就进入到登陆页面,这里需要用到Vuex里面状态来判断，不需要再次发请求判断
        // 这里因为使用了模块modules，使用state的时候就需要用到store.state.auth.isLogin,如果用getters就不需要考了modules，可以是store.getters.isLogin,但是这个方法暂时不可信，因为这里要发请求是异步的，所以要用到checkLogin
        next({
          path: '/login',//如果没有登陆，那么就跳转到/login页面
          query: { redirect: to.fullPath }//并提供一些查询参数,可以跳转到之前的页面，也就是说如果之前的路径是edit/3，那么会先跳转到登陆页面输入正确账号和密码后，成功登陆会跳转到edit/3这个页面。
        })
      } else {//如果登陆了就直接下一步
        next()
      }
    })

  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
