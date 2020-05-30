# 多人共享博客
## 首先查看后端文档做测试
* 接口约定见[这里](https://xiedaimala.com/tasks/0e61bf37-d479-481b-a43e-8d7dd6069f93/text_tutorials/606cfb19-ca16-4fec-8564-75c1979871d6)
### 注册测试
* 在git bash里面输入
```sh
curl -d "username=hunger1&password=123456" -X POST "http://blog-server.hunger-valley.com/auth/register"
```
* 注意http前面不能有用空，不然会[报错](https://blog.csdn.net/u013642285/article/details/72674812)
    * 失败
    返回格式 {"status": "fail", "msg": "错误原因"}
    * 成功
    返回格式
    ```js
    {
    "status": "ok",
    "msg": "注册成功",
    "data": {
        "id": 1,//用户id
        "username": "hunger",//用户名
        "avatar": "http://avatar.com/1.png",//用户头像
        "updatedAt": "2017-12-27T07:40:09.697Z",//用户修改时间
        "createdAt": "2017-12-27T07:40:09.697Z"//用户创建时间
      }
    }
    ```
    * 如果已经存在就会返回
    ```js
        {"status":"fail","msg":"用户已存在"}
    ```
    * 如果密码为空就会返回
    ```js
        {"status":"fail","msg":"密码长度6到16个字符"}
    ```
    * 如果用户名为空就会返回
    ```js
        {"status":"fail","msg":"用户名长度1到15个字符，只能是字母数字下划线中文"}
    ```
    * 如果创建
    ```js
        $ curl -d "username=bomber063&password=123456" -X POST "http://blog-server.hunger-valley.com/auth/register"
    ```
    * 没问题就会返回
    ```js
        {"status":"ok","msg":"创建成功","data":{"id":2037,"avatar":"//blog-server.hunger-valley.com/avatar/0.jpg","username":"bomber063","updatedAt":"2020-05-27T08:15:41.973Z","createdAt":"2020-05-27T08:15:41.973Z"}}
    ```
    * [命令说明](https://explainshell.com/explain?cmd=curl+-d+%22username%3Dbomber064%26password%3D%22+-X+POST+%22http%3A%2F%2Fblog-server.hunger-valley.com%2Fauth%2Fregister%22)
    * -d 是用来传递数据,
    * 对于 POST 和 PUT 可以：  -X POST
    * 对于 GET，不加 -X
        ```sh
        -d 请求数据
        -X 请求方法
        ```
### 登陆测试
* -i 可以展示响应头
* 会发现响应头里有 setCookie 信息，得到 cookie
```sh
curl -d "username=hunger1&password=123456" "http://blog-server.hunger-valley.com/auth/login" -i
```
* 会返回
```js
Server: nginx/1.4.6 (Ubuntu)
Date: Wed, 27 May 2020 08:45:04 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 207
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: undefined
Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
ETag: W/"cf-eMUho0wU7lcTFKN/dAVgK6mnw40"
set-cookie: connect.sid=s%3AgSkQishfCVJKL3ZQE9gUyNXltqKM-eqe.qOxYAhF9LaqY6gbxDdTZ5G641TON9wxH5GvAtoFDJu8; Path=/; Expires=Wed, 27 May 2020 10:25:04 GMT; HttpOnly

{"status":"ok","msg":"登录成功","data":{"id":6,"username":"hunger1","avatar":"//blog-server.hunger-valley.com/avatar/4.jpg","createdAt":"2018-06-21T07:06:03.314Z","updatedAt":"2018-06-21T07:06:03.314Z"}}
```
### 注销测试
* 这个需要先通过登录接口获取 cookie，带上 cookie 就能测试注销登陆
* 输入
```sh
curl "http://blog-server.hunger-valley.com/auth/logout" -b "connect.sid=s%3AgSkQishfCVJKL3ZQE9gUyNXltqKM-eqe.qOxYAhF9LaqY6gbxDdTZ5G641TON9wxH5GvAtoFDJu8"
```
* -b后面的就是cookie,详细见[这里](https://explainshell.com/explain?cmd=curl+%22http%3A%2F%2Fblog-server.hunger-valley.com%2Fauth%2Flogout%22+-b+%22connect.sid%3Ds%253AgSkQishfCVJKL3ZQE9gUyNXltqKM-eqe.qOxYAhF9LaqY6gbxDdTZ5G641TON9wxH5GvAtoFDJu8%22)
* 成功后会返回
```sh
{"status":"ok","msg":"注销成功"}
```
* 如果不带上这个cookie是不行的
## 安装vue/cli
* 这里要运行下面代码命令**必须要全局安装**一个插件`@vue/cli-init`，具体见[这里](https://blog.csdn.net/qq_42429367/article/details/105616392)
```sh
npx vue init webpack blog-client
```
* 否则报错如下：
```sh
Command vue init requires a global addon to be installed.
```
* 解决办法
```
npm install -g @vue/cli-init
```
* 接下去就基本选择默认的就好了，除了vue-router选择Y ，其他都选择默认的。
* 安装好之后通过`ls`命令就可以看到多了一个目录blog-client，并通过下面命令就可以运行
```sh
  cd blog-client
  npm run dev
```
### 创建好的目录里面package.json
* 这里的,有三行代码，第一个和第二个是一样的，在开发的时候使用。最后一个build是开发好后使用的。前面都需要加上命令`npm run`，比如`npm run dev`
```js
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
```
### bulid.js文件
* 运行npm run bulid后会生成bulid.js,内容的部分注释
```js
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'//告诉当前环境是production

const ora = require('ora')//loading状态
const rm = require('rimraf')//删除
...
const webpackConfig = require('./webpack.prod.conf')//使用的配置路径

const spinner = ora('building for production...')//最开始出现这句话
spinner.start()//开始

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {//rm 就是删除之前的bulid,就在config里面的目录
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {//删除之后使用webpack的配置
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({//完成后会输入下面的信息
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {//这里是出错的时候显示
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))//没有问题就会出现这句话
    console.log(chalk.yellow(//使用这个颜色显示
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
```
### webpack.prod.conf.js文件
* 下面的路径
```sh
blog-client\build\webpack.prod.conf.js
```
* webpack.prod.conf.js部分注释
```
      uglifyOptions: {//文件压缩
          new ExtractTextPlugin({//提取文本增加哈希
    new OptimizeCSSPlugin({//CSS优化处理
    new HtmlWebpackPlugin({//HTML注入


```
### webpack.base.conf.js文件
* 下面的路径是基础配置
```sh
D:\jirengu\github收集\Multiplayer Sharing blogs for Vue\blog-client\build\webpack.base.conf.js
```
* 这个命令
```js
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
```
### webpack.dev.conf.js文件
* 会用到文件`blog-client\build\webpack.dev.conf.js`
* 它会用到基本配置
```js
const devWebpackConfig = merge(baseWebpackConfig, {//这里使用老的webpeck的基本配置
```
* 这样就实现了在不同环境下面使用不同的工具，在生产环境下面就直接打包处理即可，也就是`npm run bulid`，而在开发的过程中我们需要一个静态服务器来呈现我们开发过程的页面显示，用到的是`npm run dev`
* 当我们bulid编译的时候，会把src这里面的不同组件，通过webpack打包方法，打包好之后放到dist目录里面，同时把index.html也拷贝进入dist目录。配置的js和css打包到dist目录下面static目录下的js和css里，并且把它们（js和css）注入到index.html的head中去，这就是编译后的js
```html
<!DOCTYPE html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>blog-client</title><link href=/static/css/app.30790115300ab27614ce176899523b62.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=/static/js/manifest.2ae2e69a05c33dfc65f8.js></script><script type=text/javascript src=/static/js/vendor.1c34072875a539e620ba.js></script><script type=text/javascript src=/static/js/app.b22ce679862c47a75225.js></script></body></html>
```
* 这里提醒下如果发布到github上面的路径是需要修改的，因为这里的路径是根目录，**但是在github上面一般会有二级路径的**，
* 在config的index.js里面`assetsPublicPath: '/',`修改为`assetsPublicPath: './',`
### src目录
* src目录里面是源码，经过编译之后放到dist目录里面。
* 这里面其中有一个main.js，它是我们项目的入口。
* app.vue是整个项目组的模板，里面有模板，js和样式css
* 接下来就在components里面增加我们自己的组件。
* 多个路由在router目录下面的index.js配置路由信息
* 后续还会用到Vuex。
## 查看路由(router)文件夹里面的index.js
* index.js文件里面有一句代码用到@。
```js
import HelloWorld from '@/components/HelloWorld'
```
* @是代表src目录的根目录，这里可以通过文件`webpack.base.conf.js`对应的代码可以知道，查看别人的[笔记](https://www.jianshu.com/p/fb1cd40b9826)
```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),//这里就代表@是src目录
    }
  },
```
* 默认会创建一个helloworld这个组件，并且在index.js里面引用
* 还有vue-router，并且创建了一个new Router。就是说在这个路径下面显示HelloWorld这个组件的信息。
```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```
* 然后再main.js里面使用了这个Router对象作为Vue的一个属性。
```js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
## 模仿HelloWorld新增几个页面
* 这里面`<style scoped>`的scoped代表这个样式只作用于这个组件，这个组件以外的都作用不到。
* Login
```vue
<template>
  <div class="hello">
    登陆页面
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```
* login的路由
```js
    {
      path: '/login',
      component: Login
    }
```
* 为了更方便阅读，我们把文件夹components名字修改为pages，然后把vue组件的template，style和script分成三个文件（template.js——template.css——template.vue）。
* vue文档里面也推荐这种写法——[怎么看待关注点分离？](https://cn.vuejs.org/v2/guide/single-file-components.html#%E6%80%8E%E4%B9%88%E7%9C%8B%E5%BE%85%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB%EF%BC%9F)
* 修改路径和分成三个文件后需要增加后缀，比如template.vue,不然会报错。
```js
import Login from '@/pages/Login/template.vue'
```
* 不写后缀的报错如下
```js
vue.esm.js?efeb:628 [Vue warn]: Failed to mount component: template or render function not defined.

found in

---> <Anonymous>
       <App> at src/App.vue
         <Root>
```
* 创建的路由
```js
import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/pages/Create/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/template.vue'
import My from '@/pages/My/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      component: Create
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/edit',
      component: Edit
    },    
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/my',
      component: My
    },    
    {
      path: '/register',
      component: Register
    },    
    {
      path: '/user',
      component: User
    }
  ]
```
* 后续通用的组件，也就是被很多地方用到的，就可以放到components文件夹里面。
### 样式使用技巧之scoped&less
* 我们如果在style上面不使用scoped，那么该样式应用在**全局**
```vue
<style scoped src="./template.css"></style>
```
* 如果用scoped了，就是**局部,也就是当前的模块或者组件**
* 这里测试后改变路由是可以实现的，但是**刷新后可能实现不了，刷新后的样式被组件自己的样式覆盖**
```vue
<style src="./template.css"></style>
```
* 使用less只需要写上lang即可
```js
<style scoped lang="less" src="./template.less"></style>
```
* 但是less是需要安装less-loader才可以运行的。运行下面命令就可以安装less-loader啦
```sh
npm install less-loader
```
### 这里出现一个less的BUG
* 我直接安装less-loader是最高版本的。
```js
    "less-loader": "^6.1.0",
```
* 这里执行后会报错,重点的两句报错代码
```sh
error  in ./src/pages/Index/template.less

Module build failed: TypeError: loaderContext.getResolve is not a function
```
* 经过搜索找到有类似问题的[情况1——less--Module build failed: TypeError: loaderContext.getResolve is not a function](https://blog.csdn.net/shujiaw/article/details/105863069),[情况2——sass-loader的版本过高导致的编译错误，当前最高版本是8.x，需要退回到7.3.1](https://www.cnblogs.com/blucesun/p/11463426.html)
* 综合测试我发现我的问题也类似，**我卸载了高版本的less-loader，然后安装了低版本的**
```sh
npm install less-loader@4.1.0
```
* 之后发现还存在报错，大概意思就是还需要安装less模块。
```sh
Module build failed: Error: Cannot find module 'less'
```
* 那我继续安装less模块,版本是`"less": "^3.11.1"`,
```sh
 npm install less
```
* 现在运行`npm run dev`终于可以不报错了。可以使用less语法了。
### 通用的样式可以放到assets里面
* 比如整个网站的主题色，间距等，这些通用的样式可以放到assets文件夹里面。
* 我在assets的base.less中创建一个颜色
```css
@themeColor:#ff3300;
```
* 然后再Index目录的template.less中引入就可以使用啦,**这里要注意@import后面结束必须加上分号**
```less
@import '../../assets/base.less';
// 上面的结束是必须加上分号的

p{
    color: @themeColor;
}
```
## ElementUI组件使用及封装
* 通过官[网的快速上手](https://element.eleme.cn/#/zh-CN/component/quickstart)就了解如何使用啦，为了简单起见我这里就完整引入了。
* 我这里就通过npm安装吧
```sh
npm i element-ui -S
```
* 我安装的版本是element-ui@2.13.2
* 我使用了两个button组件
```html
        <el-button @click="onClick1">默认按钮</el-button>
        <el-button @click="onClick2">alert</el-button>
```
* 然后对应的方法
```js
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
```
* 因为element-UI的样式跟我们需求的样式不同，我们可以通过自己针对某个class或者ID写样式来覆盖整个UI原本的样式。
### 数据请求接口封装
* 在src里面增加两个文件夹，一个是helpers，一个是api。
  * helpers
    * 通用的函数或者底层的方法，比如把一个事件转换为一个友好的事件，刚刚，5分钟前，半小时前这样，可能很多地方需要用到.
    * 还可以封装一个底层的请求AJAX。封装好了，提供一个函数名字，其他地方想去发请求的时候就不需要单独写AJAX了。直接调用这里的封装的方法即可。
    * 这里面用到[axios](https://www.npmjs.com/package/axios)，它类似于jQuery的AJAX。不过这个不管再浏览器端还是node端都可以使用。**它用于发送请求获取数据**。
    * [axios中文文档](http://www.axios-js.com/zh-cn/docs/)
    * 配置具体可以看[请求配置](http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)
    * 因为前后端分离，前端（我们的代码部署到github上面的域名）和后端（http://blog-server.hunger-valley.com）的域名不是一个，那么就发请求的时候就存在跨域的问题，这里设置下面代码，就可以通过不同域名发送凭证，也就是cookie，当然这里服务端可以设置允许跨域或者允许某个域名跨域。**但是这里有一个问题就是接口的跨域是不会带上cookie,只有相同域名才会带上cookie，设置了withCredentials就代表即使是跨域请求也需要带上cookie**.
      ```js
        axios.defaults.withCredentials = true// `withCredentials` 表示跨域请求时是否需要使用凭证
      ```
    * 首先安装axios依赖
    ```sh
      npm install axios
    ```
    * axios的部分参数，这里get请求可以有**查询参数**，具体见[这里案例](http://www.axios-js.com/zh-cn/docs/#%E6%A1%88%E4%BE%8B)
        ```js
            // 发送 POST 请求
        axios({
          method: 'post',
          url: '/user/12345',
          data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
          }
        });
         // `method` 是创建请求时使用的方法
         // `url` 是用于请求的服务器 URL
         // `data` 是作为请求主体被发送的数据
         // `params` 是即将与请求一起发送的 URL 参数
        ```
      * 这里封装的方法的好处是,我们这里封装的好处是万一status的状态不是ok,是别的字段（比如fail），那么就会有相应的响应,比如一个提示。另外还有跨域问题的凭证cookie设置等。
      ```js
            import axios from 'axios'
      import { Message } from 'element-ui'//这里再次引入一次element是因为前面的引入是给Vue实例引入，这里没有Vue。所以用不了，还需要再次引入。

      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'//这个是配置请求头里面的post请求默认的content-type是application/x-www-form-urlencoded
      // `headers` 是即将被发送的自定义请求头
      axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'//这里的配置是请求默认的URL是http://blog-server.hunger-valley.com
      axios.defaults.withCredentials = true// `withCredentials` 表示跨域请求时是否需要使用凭证

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
            axios(option).then(res => {
              console.log(res.data)
              if(res.data.status === 'ok') {//这里的OK是跟后端的约定，后端返回数据里面成功的会有个status:OK 
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
      ```
      * 完成之后我们就可以通过别的地方来测试这个封装的请求方法，比如在首页index上面。
      * 因为在request.js里面导出的是default，那么引入的时候变量名字可以自己定义，这里定义为request。
        ```js
          import request from '@/helpers/request.js'

          window.request=request//把它变成全局对象，这样全局都可以测试
        ```
### helpers里面的request.js测试
#### 登陆测试
* 我们可以在Chrome调试页面的log终端里面直接输入代码测试，比如输入
```js
  request('/auth/login','post',{username:'hunger1',
  password:'123458'}).then(data=>{
    console.log(data)
  })
```
* 这里会弹出提示密码不正确，并且log里面打出如下代码，这是后端的响应数据。
```js
  {status: "fail", msg: "密码不正确"}
```
* 如果我们输入的密码是正确的，比如
```js
  request('/auth/login','post',{username:'hunger1',
  password:'123456'}).then(data=>{
    console.log(data)
  })
```
* 后端的响应数据就是
```js
  {status: "ok", msg: "登录成功", data: {…}}
```
* 当然如果出错的话还可以用catch直接展示错误信息
```js
  request('/auth/login','post',{username:'hunger1',
  password:'123458'}).then(data=>{
    console.log(data)
  }).catch(()=>{
    console.log('出错了')
  })
```
* 这样会显示**出错了**三个字，也就是说你能对这个错误再次做一次处理。
#### 判断用户是否登录测试
* **判断用户是否登录**
```js
  request('/auth','get').then(data=>{
    console.log(data)
  }).catch(()=>{
          console.log('出错了')
  })
```
* 返回的响应
```js
  {status: "ok", isLogin: true, data: {…}}
```
#### 登陆状态测试创建博客测试
* 这里我们在**登陆状态测试创建博客**。
```js
      request('/blog','post',{title:'你好',content:'内容',description:'详情'
      }).then(data=>{
        console.log(data)
      }).catch(()=>{
              console.log('出错了')
      })
```
* 然后返回的响应信息
```js
  {status: "ok", msg: "创建成功", data: {…}}
```
#### 获取某个用户博客列表测试
* 测试获取**某个用户博客列表**
```js
  request('/blog','get',{page:1,userId:1,atIndex:true
  }).then(data=>{
    console.log(data)
  }).catch(()=>{
          console.log('出错了')
})
```
* 然后返回的响应信息
```js
  {status: "ok", msg: "获取成功", total: 0, totalPage: 0, page: 1, …}
```
#### 获取所有的博客列表列表测试
* 获取**所有的博客列表**，这里就不用输入第三个参数.
```js
  request('/blog','get').then(data=>{
    console.log(data)
  }).catch(()=>{
          console.log('出错了')
  })
```
* 返回的响应信息
```js
  {status: "ok", msg: "获取成功", total: 2203, totalPage: 221, page: 1, …}
```
#### 获取某个用户的博客详情测试
* 获取**某个用户的博客详情**
```js
  request('/blog/2','get').then(data=>{
    console.log(data)
  }).catch(()=>{
          console.log('出错了')
  })
```
* 成功后返回响应
```sh
{status: "ok", msg: "获取成功", data: {…}}
```
* 如果失败就会返回
```sh
  {status: "fail", msg: "博客不存在"}
```
#### 删除某个用户的某个博客测试
* 删除**某个用户的某个博客**
```js
  request('/blog/1','delete',).then(data=>{
    console.log(data)
  }).catch(()=>{
          console.log('出错了')
  })
```
* 返回信息
```js
  {status: "fail", msg: "博客不存在或你没有权限"}
```
#### 修改某个用户的某个博客测试
* **修改某个用户的某个博客**，目前暂时测试失败。
## api接口封装-auth
* 在api文档里面新建auth.js，这里创建与**用户有关的api封装**。这样封装后，我们的一些操作会更简单。
```js
import request from '@/helpers/request'

const URL = {//这里面分别保存注册，登陆，登出，判断用户是否登录的URL地址
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

export default {//这里结合了/helpers/request里面的request请求有三个参数，还有后端的用户需要传的参数对比封装的函数
  register({username, password}) {
    return request(URL.REGISTER, 'POST', { username, password })
  },

  login({username, password}) {
    return request(URL.LOGIN, 'POST', { username, password })
  },

  logout() {
    return request(URL.LOGOUT)
  },

  getInfo() {
    return request(URL.GET_INFO)
  }
}
```
* 这时候我们在index主页里面引入这个封装的auth
```js
import auth from '@/api/auth.js'

window.auth=auth
```
* 以前复杂的登陆代码就可以简化为下面的代码，其他的类似简化了。
```js
auth.login({username:'hunger1',
  password:'123456'})
```
* 会返回登陆成功
```js
{status: "ok", msg: "登录成功", data: {…}}
```