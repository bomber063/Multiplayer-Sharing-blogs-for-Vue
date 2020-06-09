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
        //这个地方注册成功就直接跳转到博客首页
    },
    async logout({commit}){
        await auth.logout()
        commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
    },

    async checkLogin({commit,state}){
        console.log(1,state,state.isLogin)
        // 这里如果isLogin已经改变了，那么是在后面的发请求后才发生改变的，所以state。isLogin在这里是false，但是你通过查看state这个状态对象里面发现，点开isLogin是true。
        if(state.isLogin) { console.log('HI'); return true}//如果isLogin已经是true就直接退出，返回true
        console.log(2,state,state.isLogin)

        let res=await auth.getInfo()//一开始如果是没有登陆，就会调用getInfo方法发请求。
        console.log(3,state,state.isLogin)

        commit('setLogin',{isLogin:res.isLogin})
        console.log(4,state)

        if(!state.isLogin) return false//这个是通过发送请求后，获取到后端返回的isLogin是登陆true状态还是未登录false状态，如果是false就直接退出并返回false
        console.log(5,state.isLogin)
        commit('setUser',{user:res.data})//如果是登陆true状态才会执行这里，就是把用户信息保存在Vuex的auth模块的state数据的user里面。
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