import {mapActions} from 'vuex'

export default {
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App',
        username:'',
        password:''
      }
    },
    methods:{
      onLogin(){
        console.log(this.username+':'+this.password)
        // 虽然在auth.js里面的login有两个参数也就是login({commit},{username,password}),但是在组件上只有后面一个参数，也就是{username,password}。
        // this.$store.dispatch('login',{username:this.username,password:this.password})
        // .then(()=>{
        //       this.$router.push({path:'/'})
          // })
        this.login({username:this.username,password:this.password})
        .then(()=>{
            this.$router.push({path:'/'})
        })
      },
      ...mapActions([
        // onLogin:'login'
        'login'
      ])
    }
  }