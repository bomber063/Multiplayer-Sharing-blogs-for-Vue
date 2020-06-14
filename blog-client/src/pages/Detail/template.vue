<template>
  <div id="detail">
    <section class="user-info">
      <!-- 这里的avatar,username,title,content,updatedAt都是该组件data里面的数据 -->
      <img :src="avatar" :alt="username" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link to="/user">若愚</router-link> {{updatedAt}}</p>
    </section>
    <!-- 通过v-html是把字符串转换为html -->
    <section class="article" v-html="content">
      {{content}}
    </section>

  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
