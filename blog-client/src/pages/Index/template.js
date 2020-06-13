import request from '@/helpers/request.js'//因为在request.js里面导出的是default，那么引入的时候变量名字可以自己定义，这里定义为request。
import auth from '@/api/auth.js'
import blog from '@/api/blog.js'

window.blog=blog
window.auth=auth
window.request=request//把它变成全局对象，这样全局都可以测试

export default {
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
        blogs:[],//发请求获取到的数据复制给这个blogs
        // blogId:1
        total:1,//全部博客的总数
        page:1,//当前页数
        currentPage: 1
        // a:1
        // params:this.params||1
      }
    },
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      // console.log(Object.keys(this.$route.query)[0],123)
      // console.log(this.currentPage||1,123)
      // console.log(this.cpage,123)
      // console.log(this.$route.query,123)
      // console.log(this.$route.matched,111111111111111111111)
      this.page=parseInt(this.$route.query.page)||1//当前page页首先从url里面的查询参数query去找，找不到就为page是1，另外这里的字符串可以不用转换为数字也可以，就是下面的不用parseInt函数
      // this.page=this.$route.query.page||1
      // console.log(this.$route.query)
      // console.log(this.$route.params,123123123)
      // this.a=this.$route.params.a||1
      // this.page=Object.keys(this.$route.query)[0]//这里我获取不到params,但是可以通过query获取到查询参数。
      // this.page=this.params||1//这里我获取不到params,但是可以通过query获取到查询参数。
        blog.getIndexBlogs({page:this.page})
        .then((res)=>{
          this.blogs=res.data
          // this.blogId=res.data[1].id
          this.total=res.total//全部博客的总数
          this.page=res.page//当前页数
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
          // let a=res.page
          // this.$router.push({ name: 'index', params: { a }}) // -> /user/123
        })
    },
    // computed:{
    //   cpage:function(){ 
    //      return this.$route.params
    //   }
    // },
    methods:{
      // onClick1(){
      //   this.$message.error('错了哦，这是一条错误消息');
      // },
      // onClick2(){
      //   this.$alert('这是一段内容', '标题名称', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message.success('点了确定');
      //     }
      //   });
      // },
      onPageChange(newPage){
        this.page=newPage
        // this.currentPage=newPage
        blog.getIndexBlogs({ page: newPage})
        .then((res)=>{
          this.blogs=res.data
          // this.blogId=res.data[1].id
          // this.total=res.total//全部博客的总数
          // this.currentPage=res
          // this.page=res.page//当前页数
          this.$router.push({path:'/',query:{page:newPage}})
          // this.$router.push({path:`/?page=${newPage}`})
          // let a = newPage          
          // this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
          // this.params=this.$route.params
          // this.$route.query=this.$route.params
          // console.log(this.$route.params.a,123123123123)
          // console.log(2)
        })
      }

    }
  }