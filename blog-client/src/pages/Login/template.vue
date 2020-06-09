<template>
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <!-- 输入完密码按回车也可以调用onLogin，用到按键修饰符——@keyup.enter -->
    <!-- 只有在 `key` 是 `Enter` 时调用 `vm.onLogin()` -->
    <!-- <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin({username:username,password:password}).then(()=>{ $router.push({path:'/'})})" > -->
        <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin" >
    <!-- <el-button size="medium" @click="onLogin({username:username,password:password}).then(()=>{ $router.push({path:'/'})})">立即登录</el-button> -->
        <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script src="./template.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="./template.less"></style>
