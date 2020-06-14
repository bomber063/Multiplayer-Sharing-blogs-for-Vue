import blog from '@/api/blog'
import marked from 'marked'

export default {
    data () {
      return {
        title:'',
        rawContent:'',
        user:{},
        createdAt:''
      }
    },
    created(){
      this.blogId=this.$route.params.blogId//把传过来的路由路径赋值给blogId,这个是从路由router对象，也就是router目录下面index.js里面对应的路由的路径参数path: '/detail/:blogId'这里获取到的。
      // console.log(this.$route.params.blogId,111)
      blog.getDetail({ blogId:this.blogId })//然后通过发送获取博客详情请求
      .then((res)=>{//通过后端返回的数据处理，这里是res作为实际参数
        // console.log(res.data.user.avatar,123123123)
        this.title=res.data.title
        this.rawContent=res.data.content
        this.createdAt=res.data.createdAt
        this.user=res.data.user
      })
    },
    computed:{
      markdown(){
        return marked(this.rawContent)
      }
    }
    // methods:{

    // }
  }