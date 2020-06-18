import blog from '@/api/blog'

export default {
    data () {
      return {
        blogs:[],
        user:{},
        page:1,
        total:1,
        currentPage: 1
      }
    },
      created(){
        this.page=this.$route.query.page||1
        blog.getBlogsByUserId(this.$route.params.userId,{page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.page=res.page
          this.total=res.total
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
          if( res.data.length>0){//先判断返回的数据里面存在data
            this.user=res.data[0].user//因为data里面的用户user信息是一样的，所以随便获取一个即可，这里取第一个[0]
          }
        })
      },
      methods:{
        splitDate(dataStr){
          let dataObj=dataStr instanceof Object ? dataStr : new Date (dataStr)//这里是new后面是Date对象,通过三元运算把传过来的参数设置为Data对象
          // let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
          return {
            date:dataObj.getDate(),
            month:dataObj.getMonth()+1,//这里加1是因为0才是1月，1是2月
            year:dataObj.getFullYear(),
          }
        },
        onPageChange(newPage){
          this.page=newPage
          // this.currentPage=newPage
          blog.getBlogsByUserId(this.$route.params.userId,{page:this.page})
          .then((res)=>{
            this.blogs=res.data
            // this.user=res.data[0].user
            // this.blogId=res.data[1].id
            // this.total=res.total//全部博客的总数
            // this.currentPage=res
            // this.page=res.page//当前页数
            this.$router.push({path:`/user/${this.user.id}`,query:{page:newPage}})
            // this.$router.push({path:`/?page=${newPage}`})
            // let a = newPage          
            // this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
            // this.params=this.$route.params
            // this.$route.query=this.$route.params
          })
        }
      }
    
  }