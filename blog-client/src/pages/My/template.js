import blog from '@/api/blog'
import {mapGetters} from 'vuex'

export default {
      data () {
        return {
          blogs:[],
          // user:{},
          page:1,
          total:1,
          currentPage: 1,
          blogId:1,
        }
      },
      computed:{//所以后面需要用到的user的都从这里来获取
        ...mapGetters([
          'user'
        ])
      },
      created(){
        // console.log(this.$route.params.userId)
        // this.page=this.$route.query.page||1
        // console.log(typeof this.$route.query.page,123123123)
        this.page=parseInt(this.$route.query.page)||1//因为老师的代码是把page当做currentPage使用的，currentPage是不能是字符串。而我的代码是单独有使用currentPage这个变量,因为这里获取到的是字符串，要通过parseInt转换为数字
        // blog.getBlogsByUserId(this.$route.params.userId,{page:this.page})
        blog.getBlogsByUserId(this.user.id,{page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.page=res.page
          this.total=res.total
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
          // if( res.data.length>0){//先判断返回的数据里面存在data
          //   this.user=res.data[0].user//因为data里面的用户user信息是一样的，所以随便获取一个即可，这里取第一个[0]
          // }
            console.log(res)
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
        // onDelete(blogId){
        //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       return blog.deleteBlog({ blogId})//老师这里前面加一个return不知道有什么用处。
        //       .then((res)=>{
        //           this.$message({
        //             type: 'success',
        //             message: '删除成功!'
        //           });
        //       })
        //     }).catch(() => {
        //       this.$message({
        //         type: 'info',
        //         message: '已取消删除'
        //       });          
        //     });
        // },
        // 把上面的异步改成async try catch的类同步的样式
        async onDelete(blogId){//这里用到了elementUi的MessageBox 弹框组件
          try {
            await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            await blog.deleteBlog({ blogId})
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          catch (e) {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            };
            // 这里把DOM重新筛选一下，删除的那个blogId跟除了它自己以外的其他的blog.id都不相同。
          this.blogs=this.blogs.filter((blog)=>{return blog.id!==blogId})
        },
        onPageChange(newPage){
          this.page=newPage
          // this.currentPage=newPage
          blog.getBlogsByUserId(this.user.id,{page:this.page})
          .then((res)=>{
            this.blogs=res.data
            // this.user=res.data[0].user
            // this.blogId=res.data[1].id
            // this.total=res.total//全部博客的总数
            // this.currentPage=res
            // this.page=res.page//当前页数
            this.$router.push({path:'/my',query:{page:newPage}})
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