<template>
  <div id="user" >
    <section class="user-info">
      <img :src="user&&user.avatar" :alt="user&&user.username" class="avatar">
      <h3>{{user&&user.username}}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
        <div class="actions">
          <!-- 编辑路由需要展示对应的blogId -->
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <!-- 因为是a链接，所以使用prevent阻止a链接的默认事件跳转 -->
          <!-- 删除的blog.id这个参数可以直接传入到函数onDelete里面去，如果不写那默认的参数是当前的事件 -->
          <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
          <!-- <router-link @click.prevent="onDelete" :blogId="blog.id" :to="`/delete/${blog.id}`">删除</router-link> -->
        </div>
      </router-link>
    </section>
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style lang="less" src="../My/template.less"></style>
