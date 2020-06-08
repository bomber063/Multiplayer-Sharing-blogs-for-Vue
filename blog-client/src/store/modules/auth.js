import auth from '@/api/auth'


const state={//类似于组件里面的data属性
    user:null,//用户信息
    isLogin:false//是否登录
}
const getters={//类似于组件里面的computed属性
    user:state=>state.user,
    isLogin:state=>state.isLogin
}
const mutations={
    setUser(state,payload){
        state.user=payload.user//载荷这个对象的user属性赋值给state数据状态里面的user属性
    },
    setLogin(state,payload){
        state.isLogin=payload.isLogin//载荷这个对象的isLogin属性赋值给state数据状态里面的isLogin属性
    }

}
const actions={
    login({commit},{username,password}){//第一个是默认参数commit,第二个是一个对象，对象里面包括用户名username和密码password
        return auth.login({username,password})//这是底层封装好的用户登录的方法,这里return出去是为了让别的地方可以有更多操作，可以.then
        .then((res)=>{//需要看后端接口的响应返回的代码信息
            commit('setUser',{user:res.data})//跟前面的对象相对应，也就是对象的user里面有用户信息res.data
            commit('setLogin',{isLogin:true})//如果登陆了，那么对象的isLogin里面就是true
        })
    },
    async register({commit},{username,password}){
        let res=await auth.register({username,password})
        commit('setUser',{user:res.data})
        commit('setLogin',{isLogin:true})
    },
    async logout({commit}){
        await auth.logout()
        commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
    },

    async checkLogin({commit,state}){
        console.log(1,state.isLogin)
        if(state.isLogin) return true
        console.log(2,state.isLogin)

        let res=await auth.getInfo()//一开始如果是没有登陆，就会调用getInfo方法发请求。
        console.log(3,state.isLogin)

        commit('setLogin',{isLogin:res.isLogin})
        console.log(4,state.isLogin)

        if(!state.isLogin) return false
        console.log(5,state.isLogin)
        commit('setUser',{user:res.data})//这里没有登陆怎么会有这个信息。我有点疑问
        console.log(6,state.user,state.isLogin)
        return true
    }

    /*
    this.checkLogin().then(isLogin=>{

    })
    */ 
}

export default {
    state,
    getters,
    mutations,
    actions
}