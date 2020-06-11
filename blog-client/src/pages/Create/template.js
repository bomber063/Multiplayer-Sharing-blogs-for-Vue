import blog from '@/api/blog'
import {Message} from 'element-ui'

export default {
    data () {
      return {
        title:'',
        description:'',
        content:'',
        atIndex:false
      }
    },
    methods:{
      onCreate(){
        console.log(1)
        blog.createBlog({ title: this.title, content: this.content, description: this.description, atIndex: this.atInex})//这里面的参数不能写成{ title = this.title, content = this.content, description = this.description, atIndex = this.atInex} = { title: this.title, content: this.content, description: this.description, atIndex: this.atInex},因为这里是是一个实参，应该是一个对象，传入形参的时候可以写结构赋值的方式
        .then((res)=>{
          console.log(2)
          // this.$message.success(res.msg)
          Message.success(res.msg)//或者可以直接写上面的this.$message，并且不用引用前面的import
          this.$router.push({path:`/detail/${res.data.id}`})//成功后跳转到某个博客的详情页面，成功后获取到res就是后端传来的数据，这个数据里面的data的id里面包括了是博客的id。
        })
      }
    }
  }