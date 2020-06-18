<template>
<!-- 如果不用两个根元素，用两个template就可以使用两个v-if -->
  <header :class="{login: isLogin, 'no-login': !isLogin}"> 
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <router-link to="/login"><el-button>立即登录</el-button></router-link>
        <router-link to="/register"><el-button>注册账号</el-button></router-link>
      </div>
    </template>
    <template v-if="isLogin">
      <!-- 两个根元素header必须要用v-if,v-else-if不然会报错 -->
      <h1><router-link to="/" >Let's share</router-link></h1>
      <router-link to="/create" ><i class="edit el-icon-plus"></i></router-link>
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
        <ul>
          <li><router-link to="/my">我的</router-link></li>
          <!-- 这里的onLogout,前面有一个on是为了防止和别的地方的注销名字重名 -->
          <li><a href="#" @click="onLogout">注销</a></li>
        </ul>
      </div>  
    </template>
  </header>
</template>

<script>
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{
            ...mapGetters([
            'isLogin',
            'user'
            ])
          },
      created(){//组件生命周期created的时候就开始判断，也就是该组件创建的时候，数据已经OK，但是模板还没有渲染。在这里可以发送AJAX请求
          this.checkLogin()
      },
      methods:{
        ...mapActions([//这样写了之后那么checkLogin就变成了当前组件的方法，就可以使用这个checkLogin方法了
          'checkLogin',
          'logout'
          ]),
        onLogout(){
          // auth.logout()
          this.logout()
          // this.$store.commit('logout',false)
          // this.$store.commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        //  this.$store.commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
          // this.$store.state.auth.isLogin=false
          // location.reload()
          this.$router.push({path:'/'})
        }
      }
    }
</script>

<style lang="less">
@import "../assets/base.less";

header.no-login {
  padding: 0 12% 30px 12%;
  background: @bgColor;
  display: grid;
  justify-items: center;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 60px 0 0 0;
    text-transform: uppercase;

  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }

  .btns {
    margin-top: 20px;
  }

  button {
    margin: 20px 5px 0;
  }
}

header.login {
  display: flex;
  align-items: center;
  background: @bgColor;

  h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;

    a {
      color: #fff;
    }
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }


  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }

  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin:0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }

    }
// 当鼠标放上去之后把隐藏的display:none变成display：block
    &:hover ul {
      display: block;
    }
  }
}
</style>