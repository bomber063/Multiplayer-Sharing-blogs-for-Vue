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
      <!-- <div class="item">
        <figure class="avatar">
          <img src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="">
          <figcaption>若愚</figcaption> 
        </figure>
        <h3>前端异步大揭秘 <span>3天前</span></h3> 
        <p>本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co 模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...</p>
      </div> -->
    </section>
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./template.less"></style>
