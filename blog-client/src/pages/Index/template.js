import request from '@/helpers/request.js'//因为在request.js里面导出的是default，那么引入的时候变量名字可以自己定义，这里定义为request。

window.request=request//把它变成全局对象，这样全局都可以测试

export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      onClick1(){
        this.$message.error('错了哦，这是一条错误消息');
      },
      onClick2(){
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message.success('点了确定');
          }
        });
      }
    }
  }