import blog from '@/api/blog'

export default {
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
        title:'',
        content:'',
        updatedAt:'',
        avatar:'',
        username:'',
        blogId:1
      }
    },
    created(){
      this.blogId=this.$route.params.blogId//把传过来的路由路径赋值给blogId,这个是从路由router对象，也就是router目录下面index.js里面对应的路由的路径参数path: '/detail/:blogId'这里获取到的。
      console.log(this.$route.params.blogId,111)
      blog.getDetail({ blogId:this.blogId })//然后通过发送获取博客详情请求
      .then((res)=>{//通过后端返回的数据处理，这里是res作为实际参数
        // console.log(res.data.user.avatar,123123123)
        this.title=res.data.title
        this.content=res.data.content
        this.updatedAt=res.data.updatedAt
        this.avatar=res.data.user.avatar
        this.username=res.data.user.username
        console.log(res,'结果')
      })
    },
    // methods:{

    // }
  }