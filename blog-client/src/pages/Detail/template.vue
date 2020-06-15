<template>
  <div id="detail">
    <section class="user-info">
      <!-- 这里的avatar,username,title,content,updatedAt都是该组件data里面的数据 -->
      <!-- 有可能user不存在，所以需要判断一下 -->
      <img :src="user?user.avatar:'用户信息不存在'" :alt="user?user.username:'用户信息不存在'" title="user?user.username:'用户信息不存在'" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="user?`/user/${user.id}`:'user'">{{user?user.username:'用户不存在'}}</router-link>发布于 {{friendlyDate(createdAt)}}</p>
    </section>
    <!-- 通过v-html是把字符串转换为html,这里面可以省掉{{rawContent}} -->
    <section class="article" v-html="markdown">
      <!-- {{rawContent}} -->
    </section>

  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
