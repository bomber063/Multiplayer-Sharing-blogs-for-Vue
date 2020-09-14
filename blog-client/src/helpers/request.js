import axios from 'axios'
import { Message } from 'element-ui'//这里再次引入一次element是因为前面的引入是给Vue实例引入，这里没有Vue。所以用不了，还需要再次引入。

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'//这个是配置请求头里面的post请求默认的content-type是application/x-www-form-urlencoded
// `headers` 是即将被发送的自定义请求头
axios.defaults.baseURL = '//blog-server.hunger-valley.com'//这里的配置是请求默认的URL是blog-server.hunger-valley.com
// axios.defaults.withCredentials = true// `withCredentials` 表示跨域请求时是否需要使用凭证

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
      let option = {
        url,// `url` 是用于请求的服务器 URL
        method: type// `method` 是创建请求时使用的方法
      }
      if(type.toLowerCase() === 'get') {
        option.params = data// `data` 是作为请求主体被发送的数据，`params` 是即将与请求一起发送的 URL 查询参数
        //如果是get请求第三个参数data就是查询参数
      }else {
        option.data = data//如果不是get请求，第三个参数就是请求主题被发送的数据。
      }
      if(localStorage.token) {//如果刷新就把localStorage.token赋值给请求头的凭证Authorization。那么就可以验证通过。就可以实现每一次请求后端的时候都会在请求头上带上这段凭证Authorization，那么后端就会认识你，返回响应的后端信息给你了。
        axios.defaults.headers.common['Authorization']  = localStorage.token//这段代码是axios文档http://www.axios-js.com/zh-cn/docs/里面的原话
      //  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization
      //  HTTP协议中的 Authorization 请求消息头含有服务器用于验证用户代理身份的凭证，通常会在服务器返回401 Unauthorized 状态码以及WWW-Authenticate 消息头之后在后续请求中发送此消息头。

        //HTTP 身份验证 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication
      }
      axios(option).then(res => {
        // console.log(res.data,11111)
        if(res.data.status === 'ok') {//这里的OK是跟后端的约定，后端返回数据里面成功的会有个status:OK 
          if(res.data.token) {
            localStorage.token = res.data.token//请求成功后，后端把数据里面男的token存在前端浏览器的localStorage.token里面。
          }
          resolve(res.data)//就可以得到数据data,并且resolve出去可以给别人.then使用
        }else{//这里的错误是跟后端约定的错误
          Message.error(res.data.msg)//这里的Message.error是elementUI的Message,然后后面的msg就是报错的时候后端会返回这个字段。说明错误的原因
          reject(res.data)//reject出去是可以给别人.then使用
        }
      }).catch(err => {//这里的是请求错误，比如网络有问题的时候出现catch
        Message.error('网络异常')
        reject({ msg: '网络异常' })//把错误对象返回给别人可以.then
      })
    })
  }

           // `method` 是创建请求时使用的方法
         // `url` 是用于请求的服务器 URL
         // `data` 是作为请求主体被发送的数据
        // `params` 是即将与请求一起发送的 URL 参数