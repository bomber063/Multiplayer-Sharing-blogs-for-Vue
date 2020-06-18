<template>
  <div id="index">
    <section class="blog-posts">
      <!-- {{blog.title}} -->
      <!-- <router-link  v-for="blog in blogs" :key="blog.id" :to="`/detail/${blogId}`" class="item"> -->
      <!-- 这里的错误的原因，第一是blogId写成了可blodId，手抖。第二个是blogs里面是一个数组，需要获取到某一个数组后才可以获取到数组的id，所以这里最好还是用for循环的blog来获取id比较合适 -->
      <router-link  v-for="blog of blogs" :key="blog.id" :to="`/detail/${blog.id}`" class="item">
        <figure class="avatar">
          <!-- <img :src="blog.user.avatar" :alt="blog.user.username"> -->
          <!-- <figcaption>{{blog.user.username}}</figcaption>  -->
          <img :src="blog.user?blog.user.avatar:'用户不存在'" :alt="blog.user?blog.user.username:'用户不存在'">
          <figcaption>{{blog.user?blog.user.username:'用户不存在'}}</figcaption> 
        </figure>
        <h3>{{blog.title}} <span> {{friendlyDate(blog.updatedAt)}}</span></h3> 
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style scoped lang="less" src="./template.less"></style>
