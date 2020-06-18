# 多人共享博客
## 后端的接口文档看这里
* 本笔记只负责前端部分，[后端接口文档看这里](https://xiedaimala.com/tasks/0e61bf37-d479-481b-a43e-8d7dd6069f93/text_tutorials/606cfb19-ca16-4fec-8564-75c1979871d6)
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
* **修改某个用户的某个博客**,这里必须要四个参数都有才可以，不然会报错。
```js
        request('/blog/2','PATCH',{
                    title:'修改后的标题',
                    content:'修改后的内容',
                     description:'详情',
                     atIndex:true
}).then(data=>{
          console.log(data)
        }).catch(()=>{
                console.log('出错了')
        })
```
* 失败返回
```js
{status: "fail", msg: "登录后才能操作"}
// 或者
{status: "fail", msg: "博客不存在或你没有权限"}
```
### api接口封装-auth
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
### api 接口封装-blog
* 我们在index目录下面增加引入封装的api
```js
import request from '@/helpers/request'

const URL = {//这里跟后端的接口是一样的
  GET_LIST: '/blog',//获取博客列表
  GET_DETAIL: '/blog/:blogId',// 获取id 为 blogId 的博客详情
  CREATE: '/blog',// 创建博客
  UPDATE: '/blog/:blogId',//修改博客 id 为:blogId 的博客
  DELETE: '/blog/:blogId'//删除博客 id 为:blogId 的博客
}

export default {//这里结合了/helpers/request里面的request请求有三个参数，还有后端的用户需要传的参数对比封装的函数
  getBlogs({ page=1, userId, atIndex } = { page: 1 }) {//这里是解构赋值，右边的对象是如果什么参数都不传入，就默认有一个page是1。左边的对象是如果传入了第二个或者第三个参数，没有第一个参数，那么第一个参数也是1.
    return request(URL.GET_LIST, 'GET', { page, userId, atIndex })
  },

  getIndexBlogs({ page=1 } = { page: 1}) {//获取首页的博客列表,这是相对于后端新增加的，其实就是上面复杂的获取博客列表的改版而已。
    return this.getBlogs({ page, atIndex: true })
  },

  getBlogsByUserId(userId, { page=1, atIndex } = { page: 1}) {//获取某个用户的博客列表，也是第一种函数换一种写法。
    return this.getBlogs({ userId, page, atIndex })
  },

  getDetail({ blogId }) {//获取某个ID用户的博客详情，把字符串:blogId换成真实的 blogId，这时候URL就是一个完整的URL
    return request(URL.GET_DETAIL.replace(':blogId', blogId))
  },

  updateBlog({ blogId }, { title, content, description, atIndex }) {//修改博客 id 为:blogId 的博客,也是通过替换:blogId
    return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
  },

  deleteBlog({ blogId }) {//除博客 id 为:blogId 的博客，也是通过替换:blogId
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  },

  createBlog({ title = '', content = '', description = '', atIndex = false} = { title: '', content: '', description: '', atIndex: false}) {//创建博客，这里相对于后端接口多了一个atIndex，也就是是否设置在首页。默认是不展示在首页。
    return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  }

}
```
* 比如修改某个用户的某个博客可以简化为
```js
blog.updateBlog({blogId:'1'}, {title:'标题',content:'内容',description:'详情',atIndex: true }) 
```
* 比如获取博客列表简化为
```js
blog.getBlogs({ page:6,userId:4,atIndex:true})
//也可以不用参数blog.getBlogs()
```
#### 完整测试下blog
* 注册用户
```js
auth.register({username:'bomberhaha', password:123456})
```
* 返回
```js
{status: "ok", msg: "创建成功", data: {…}}
data: {id: 2053, avatar: "//blog-server.hunger-valley.com/avatar/14.jpg", username: "bomberhaha", updatedAt: "2020-05-31T03:16:42.615Z", createdAt: "2020-05-31T03:16:42.615Z"}
msg: "创建成功"
status: "ok"
__proto__: Object
```
* 查看用户是否登录
```js
auth.getInfo()
```
* 返回
```js
{status: "ok", isLogin: true, data: {…}}
data: {id: 2053, avatar: "//blog-server.hunger-valley.com/avatar/14.jpg", username: "bomberhaha", updatedAt: "2020-05-31T03:16:42.615Z", createdAt: "2020-05-31T03:16:42.615Z"}
isLogin: true
status: "ok"
__proto__: Object
```
* 创建博客
```js
blog.createBlog({title:'blog from bomberhaha'})
//一个博客1一个博客2，博客2设置在首页出现
blog.createBlog({title:'blog2 from bomberhaha for atIndex',atIndex:true})
```
* 返回
```js
//博客1
{status: "ok", msg: "创建成功", data: {…}}
data:
atIndex: false
content: ""
createdAt: "2020-05-31T03:18:35.366Z"
description: ""
id: 3880
title: "blog from bomberhaha"
updatedAt: "2020-05-31T03:18:35.366Z"
user: {id: 2053, username: "bomberhaha", avatar: "//blog-server.hunger-valley.com/avatar/14.jpg", createdAt: "2020-05-31T03:16:42.615Z", updatedAt: "2020-05-31T03:16:42.615Z"}
userId: 2053
__proto__: Object
msg: "创建成功"
status: "ok"
__proto__: Object
//博客2
{status: "ok", msg: "创建成功", data: {…}}
data:
atIndex: true
content: ""
createdAt: "2020-05-31T03:19:31.211Z"
description: ""
id: 3881
title: "blog2 from bomberhaha for atIndex"
updatedAt: "2020-05-31T03:19:31.211Z"
user:
avatar: "//blog-server.hunger-valley.com/avatar/14.jpg"
createdAt: "2020-05-31T03:16:42.615Z"
id: 2053
updatedAt: "2020-05-31T03:16:42.615Z"
username: "bomberhaha"
__proto__: Object
userId: 2053
__proto__: Object
msg: "创建成功"
status: "ok"
__proto__: Object
```
* 再次获取博客列表发现增加了刚创建的两篇博客
```js
blog.getBlogs()
```
* 返回
```js
{status: "ok", msg: "获取成功", total: 2206, totalPage: 221, page: 1, …}
data: Array(10)
0:
atIndex: true
createdAt: "2020-05-31T03:19:31.211Z"
description: ""
id: 3881
title: "blog2 from bomberhaha for atIndex"
updatedAt: "2020-05-31T03:19:31.211Z"
user: {id: 2053, username: "bomberhaha", avatar: "//blog-server.hunger-valley.com/avatar/14.jpg", createdAt: "2020-05-31T03:16:42.615Z", updatedAt: "2020-05-31T03:16:42.615Z"}
__proto__: Object
1: {id: 3880, title: "blog from bomberhaha", description: "", atIndex: false, createdAt: "2020-05-31T03:18:35.366Z", …}
2: {id: 3879, title: "", description: "", atIndex: false, createdAt: "2020-05-31T03:10:25.865Z", …}
3: {id: 3878, title: "你好", description: "详情", atIndex: false, createdAt: "2020-05-30T11:37:10.644Z", …}
4: {id: 3877, title: "文章测试", description: "内容测试", atIndex: true, createdAt: "2020-05-30T05:24:34.016Z", …}
5: {id: 3876, title: "SK摇大", description: "功能有点少", atIndex: true, createdAt: "2020-05-29T12:27:50.551Z", …}
6: {id: 3875, title: "动物", description: "", atIndex: false, createdAt: "2020-05-28T16:44:30.479Z", …}
7: {id: 3874, title: "哈哈哈哈", description: "测试", atIndex: false, createdAt: "2020-05-28T09:43:08.239Z", …}
8: {id: 3869, title: "ccc", description: "ccc", atIndex: false, createdAt: "2020-05-27T02:51:45.805Z", …}
9: {id: 3868, title: "ggg", description: "ggg", atIndex: true, createdAt: "2020-05-26T08:40:46.836Z", …}
length: 10
__proto__: Array(0)
msg: "获取成功"
page: 1
status: "ok"
total: 2206
totalPage: 221
__proto__: Object
```
* 获取某个用户的博客列表
```js
blog.getBlogsByUserId(2053)
```
* 返回可以新创建的两篇博客
```js
{status: "ok", msg: "获取成功", total: 2, totalPage: 1, page: 1, …}
data: Array(2)
0: {id: 3881, title: "blog2 from bomberhaha for atIndex", description: "", atIndex: true, createdAt: "2020-05-31T03:19:31.211Z", …}
1: {id: 3880, title: "blog from bomberhaha", description: "", atIndex: false, createdAt: "2020-05-31T03:18:35.366Z", …}
length: 2
__proto__: Array(0)
msg: "获取成功"
page: 1
status: "ok"
total: 2
totalPage: 1
__proto__: Object
```
* 现在我们基础的架构，底层接口，UI组件等都有了。
## 项目结构、组件样式
* 主要app.vue里面有一个
```html
    <router-view/>
```
* 他是vue-router的一个模块渲染。也就是在router里面的index.js里面根据不同路径渲染不同页面
```js
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
})
```
* 公用的页面属性我们可以卸载app.vue里面，为了避免重复写。
* 另外我在组件上面写了id，它会自动的复用到组件里面去,比如我在Header.vue组件里面的代码，这里并没有id。
```js
<template>
  <header>
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button>立即登录</el-button>
        <el-button>注册账号</el-button>
      </div>
  </header>
</template>
```
* 在APP.vue中在Header组件上使用id。
```js
<template>
  <div id="app">
    <Header id="header"></Header>
    <main id="main">
      <router-view/>   
    </main>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>
```
* 打开Chrome的开发者工具可以看到元素里面**组件Header上面的id自动的复用到了header标签上面去了**。
### 下面的样式我们用grid做布局
* grid布局参考  
  1. MDN文档关于[grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)
  2. 阮一峰关于[CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
  3. [CSS 网格布局学习指南](https://jirengu.github.io/css-you-should-know/zh-cn/a-complete-guide-css-grid-layout.html)
* 这里的App.vue的grid布局代码就是
```less
#app {
  display: grid;
  grid-template-columns: 12% auto 12%;//这里的auto是除了两边12%的宽度，中间全部撑开
  grid-template-rows: auto 1fr auto;//这里的auto是由内容撑开，而1fr是尽可能的占满剩下的高度，也就是尽可能撑开
  grid-template-areas: "header header header"
                       ".      main  ."
                       "footer footer footer";

  #header {
    grid-area: header;
    padding-left: 12%;
    padding-right: 12%;
  }

  #main {
    grid-area: main;
  }

  #footer {
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
  }

}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;

    #header, #footer {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

}
```
* 然后通用的样式我们继续放到assets里面，新建一个common.less，而之前的base.less都是一些基础公用的变量。
```less
@import "./base.less";

body {
    font: 14px/1.6 Arial,"Microsoft YaHei","黑体","宋体",sans-serif;
    color: #333;
    margin: 0;
}
  
html, body, #app {
height: 100%;
}

.el-button {
color: @themeColor;
border: 1px solid @themeLighterColor;
background: #fff;
border-radius: 4px;  
}
```
* 同时我修改了Header.vue和Footer.vue组件的样式。
* 注意这里**两个根元素header必须要用v-if,v-else-if不然会报错，如果不用两个根元素，用两个template就可以使用两个v-if**。
```html
<template>
  <!-- <header v-if="true">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button>立即登录</el-button>
        <el-button>注册账号</el-button>
      </div>
  </header>
    <header v-else-if="false">
      两个根元素header必须要用v-if,v-else-if不然会报错
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <img class="avatar" src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="">
  </header>-->
<!-- 如果不用两个根元素，用两个template就可以使用两个v-if -->
  <header>
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button>立即登录</el-button>
        <el-button>注册账号</el-button>
      </div>
    </template>
    <template v-if="isLogin">
      <!-- 两个根元素header必须要用v-if,v-else-if不然会报错 -->
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <img class="avatar" src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt />
    </template>
  </header>
</template>
```
### 继续完善更多内容
#### 详情页Detail完善
* 新建一个article.less保存文章的样式
* 这个article也是markdown里面的html的样式。
#### 这里我发现一个小问题bug
* 就是在Detail的template.vue的图片请求，http的协议可以显示图片，https的协议在firefox和edge浏览器里面不可以显示图片。我把前面的https删除了,如果不删除，那么在edge和firefox浏览器里面获取不到图片。**我猜可能是非同源问题的关系**
* 例如这里
```html
<p><img src="https://cloud.hunger-valley.com/18-1-12/84502177.jpg" alt="Example of align-self set to stretch"></p>
<p>要为网格中的所有grid items 统一设置对齐方式，也可以通过  align-items 属性在网格容器上设置此行为。</p>
```
* 修改为
```html
<p><img src="//cloud.hunger-valley.com/18-1-12/84502177.jpg" alt="Example of align-self set to stretch"></p>
```
* 还可以增加响应式
#### 用户页面My 
* 这里有一个router-link标签,类似于a标签，可以跳转到to后面的路由。
```html
      <router-link to="/edit">编辑</router-link>
```
## Vuex
* 一般父子之间传递是父组件通过props这个属性传递数据给子组件。子组件通过event的emit触发传递通知给父组件做更新。
* 但是兄弟之间通信或者传递数据就比较麻烦了。如果通过父子传递，那么就需要传递特别多层信息才可以到达兄弟之间。
### 创建全局的Vue对象作为事件中心
* 创建[全局的Vue事件中心](https://cn.vuejs.org/v2/guide/migration-vuex.html#Store-%E7%9A%84%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91%E5%99%A8%E7%A7%BB%E9%99%A4)，他可以$on(监听),$off(撤销监听),$emit(分发)的方式来传递数据，但是该方法目前Vue文档说明已经被[废弃](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)，但是是可以使用的，但是**不推荐了**，已经被Vuex取代，官方也推荐用[Vuex](https://vuex.vuejs.org/zh/)
* 关于eventBus我之前有更详细的[笔记](https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all/tree/tabs)
* 如果没有eventBus或者Vuex，那么可以这么比喻
  * 很多组件可以比喻成国家，省会，城市，县城，区，村庄，家庭。那么如果**国家有某个政策就需要一级一级的往下传递命令，家庭得到信息后返回数据也需要一级一级的向上走。就会消耗很多事件和资源，非常复杂。**
  * 如果有一个**公共的信箱**，任何新可以往里面放东西或者拿东西，那么上面的问题就由复杂变的简单多了。**但是需要做好对应的监听和触发**。如果数据比较多，那么监听和触发也会麻烦
  * 最后就用一个数据网络，类似Vuex，里面存了各种数据。这里把手动监听和触发也省掉了。
### Vuex四个比较重要的概念,另外一个是module
* Vuex四个比较重要的概念,另外一个是module
  * [state](https://vuex.vuejs.org/zh/guide/state.html):可以认为是最原始的数据。
  * [getters](https://vuex.vuejs.org/zh/guide/getters.html)：类似于computed，计算属性。**getter 接受 state 作为其第一个参数，还可以接受其他getter作为第二个参数**
  * [mutations](https://vuex.vuejs.org/zh/guide/mutations.html):**更改** Vuex 的 store 中的状态的**唯一方法是提交 mutation**,非常类似于一个事件。**它也接受state作为第一个参数，还可以另外传一个参数**。并且每一条 mutation 被**记录，这个记录可以在Vue开发者工具中查看到**。也就是通过**提交**来改变，为什么要提交，因为不是随便可以修改的，需要**提交commit**审查通过才可以更改，mutations就是这样的功能。
    ```js
      store.commit('increment')//这个increment就是mutations里面的函数
    ```
    * 你可以向 store.commit 传入**额外的参数**，即 mutation 的 载荷（payload）：
      ```js
      mutations: {
        increment (state, n) {
          state.count += n
        }
      }
      ```
      * 提交
      ```js
      store.commit('increment', 10)
      ```
      * 只支持同步
  * [actions](https://vuex.vuejs.org/zh/guide/actions.html)：action是修改mutations的
    ```js
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
    ```
    * 还可以通过dispatch触发,Action 通过 store.dispatch 方法触发：
      ```js
        store.dispatch('increment')
      ```
    * 支持异步
  * [module](https://vuex.vuejs.org/zh/guide/modules.html):Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割，可能大型的电商页面会用到。
### Vuex使用详解
* 简单的在[Jsbin](https://jsbin.com/jetelazitu/1/edit?html,js)上面运行代码
#### 第一个例子单独使用Vuex
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vuex"></script>
</head>
<body>
  
  <script>
    Vue.use(Vuex)
    
    const store=new Vuex.Store({
      //state里面是一个对象
      state:{
        weather:'晴天'
      },
      //mutations里面是一个函数
      mutations:{
        modifyWeather(state){
          state.weather='下雨'
          console.log(state.weather,1)
        }
      }
    })
    
    store.commit('modifyWeather')
    //这里触发的mutations里面的函数是字符串
    
  </script>
</body>
</html>
```
* 我们可以在控制台打出store
```js
store
//上面打出store，下面显示Store对象的内容
Store {_committing: false, _actions: {…}, _actionSubscribers: Array(1), _mutations: {…}, _wrappedGetters: {…}, …}
commit: ƒ boundCommit(type, payload, options)
dispatch: ƒ boundDispatch(type, payload)
getters: {}
registerModule: (e,t,o)=> {…}
replaceState: e=>{r.initialState=w(e),t(e)}
strict: false
unregisterModule: e=> {…}
_actionSubscribers: [{…}]
_actions: {}
_committing: false
_devtoolHook: {_buffer: Array(1), Vue: ƒ, _replayBuffer: ƒ, on: ƒ, once: ƒ, …}
_makeLocalGettersCache: {}
_modules: ModuleCollection {root: Module}
_modulesNamespaceMap: {}
_mutations: {modifyWeather: Array(1)}
_subscribers: [ƒ]
_vm: Vue {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
_watcherVM: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
_wrappedGetters: {}
state: (...)
__proto__: Object
```
* 可以看到store.state显示的内容
```js
store.state
//
{__ob__: Observer}
weather: "下雨"
__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
get weather: ƒ reactiveGetter()
set weather: ƒ reactiveSetter(newVal)
__proto__: Object
```
* 我们可以打出store.commit('modifyWeather')
```js
store.commit('modifyWeather')
//
下雨 1
undefined
```
#### 第二个例子，Vuex结合Vue使用
* 代码如下
```html
  <div id='app'></div>
  
  <script>
    Vue.use(Vuex)
    
    const store=new Vuex.Store({
      //state里面是一个对象
      state:{
        count:0,
        firstName:'hunger',
        lastName:'valley'
      },
      //mutations里面是一个函数
      mutations:{
        increment(state){
          state.count++
        }
      }
    })
    const Counter={
      template:`
            <div>  
              <div>{{count}}</div>
              <div>{{firstName}}{{lastName}}</div>
            </div>


`,//这里的count变量是来自于计算属性computed
      computed:{
        count(){
           //return this.$store.commit(increment)
          return this.$store.state.count
          //把Vuex的状态里面的count映射对当前组件的计算属性
          //如果Vuex里面的数据很多，每次做上面的映射会比较麻烦，所以可以用下面的mapState
        },
       // firstName(){
         // return this.$store.state.firstName
        //},
        //lastName(){
          //return this.$store.state.lastName
        //},
        
        ...Vuex.mapState(['firstName','lastName'])
        //这个操作完成后得到的是一个数组，所以需要三个点操解构拿到数组里面的信息
      }
    }
    
    //this.store.commit('increment')
    //这里触发的mutations里面的函数是字符串
    
    //下面是结合Vue使用
    const app=new Vue({
      el:'#app',
      store,//这里就相当于store:store,
      //这样上面就可以使用this.$store获取到 const store了。
      components:{Counter},
      template:`
        <div class='app'>
            <Counter></Counter>
        </div>
`
    })
    
  </script>
```
* 通过在控制台打出Vuex可以看到
```js
Vuex
{version: "3.4.0", Store: ƒ, install: ƒ, mapState: ƒ, mapMutations: ƒ, …}
Store: ƒ Store(options)
createNamespacedHelpers: ƒ (namespace)
install: ƒ install(_Vue)
mapActions: ƒ (namespace, map)
mapGetters: ƒ (namespace, map)
mapMutations: ƒ (namespace, map)
mapState: ƒ (namespace, map)
version: "3.4.0"
__proto__: Object
```
* 当一个组件需要获取多个状态的时候，将这些状态都**声明为计算属性**会有些重复和冗余。为了解决这个问题，我们可以**使用 mapState 辅助函数帮助我们生成计算属性**，让你少按几次键：
```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
* 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组,可以简化为
```js
computed: mapState([
  // 映射 this.count 为 this.$store.state.count
  'count'
])
```
#### Vuex里面的state属性要放到组件的计算属性computed里面
* 简单来说Vuex里面的属性要放到组件的计算属性computed里面才可以使用
```js
//这里的count变量是来自于计算属性computed
      computed:{
        count(){
           //return this.$store.commit(increment)
          return this.$store.state.count
          //把Vuex的状态里面的count映射对当前组件的计算属性
        }
      }
    }
```
##### mapState辅助函数相当于什么举例子
* 另外这里用到[mapState辅助函数](https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)
```js
//这里的count变量是来自于计算属性computed
      computed:{
        // 下面这两个函数就相当于最下面的...Vuex.mapState(['firstName','lastName'])
       firstName(){
         return this.$store.state.firstName
        },
        lastName(){
          return this.$store.state.lastName
        },
        //
        ...Vuex.mapState(['firstName','lastName'])
        //这个操作完成后得到的是一个数组，所以需要三个点操解构拿到数组里面的信息，他就相当于上面的两个函数firstName和lastName函数。
      }
    }
```
#### Vue调试工具
* 我们这里也可以用**Vue调试工具查看Vue组件和Vuex的状态**。
* 我们通过在Vue开发者工具里面输入下面带啊吗
```js
store.commit('increment')
```
* 就可以看到count由0变成了1
* 我们可以在Vue控制台输入
```js
store.state.firstName
```
* 就可以获取到state里面存的firstName对应的值是`"hunger"`
* 目前位置的[JSbin代码看这里](https://jsbin.com/furewezaxi/1/edit?html,output)
#### 想去修改就用mutations
* 增加一个click事件，并去触发add函数。add函数就去提交commit这个mutations里面的increment。代码如下
```js
    const store=new Vuex.Store({
      //state里面是一个对象
      state:{
        count:0,
        firstName:'hunger',
        lastName:'valley'
      },
      //mutations里面是一个函数
      mutations:{
        increment(state){
          state.count++
        }
      }
    })
    const Counter={
      template:`
            <div>  
              <div>{{count}}</div>
              <div>{{firstName}}{{lastName}}</div>
              <button @click='add'>+</button>
            </div>
`,//这里的count变量是来自于计算属性computed
      computed:{
        count(){
           //return this.$store.commit(increment)
          return this.$store.state.count
          //把Vuex的状态里面的count映射对当前组件的计算属性
          //如果Vuex里面的数据很多，每次做上面的映射会比较麻烦，所以可以用下面的mapState
        },       
        ...Vuex.mapState(['firstName','lastName'])
      },
      methods:{
        add(){
          this.$store.commit('increment')
        }
      }
    }
```
* [JSbin代码](https://jsbin.com/hukevaroxe/1/edit?html,output)
##### mapMutations 辅助函数
* [mutations的辅助函数](https://vuex.vuejs.org/zh/guide/mutations.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%8F%90%E4%BA%A4-mutation)的不同在于它要放到组件的methods里面
#### getters的用法
* getters类似于组件中的计算属性。
* 只需要在Vuex.store里面增加一个getters
* 接着上面的例子，我们可以增加一个getters。
* 在Store里面写getters的时候**需要把state作为参数传进来，还可以传入另外一个getters作为第二个参数**。
```js
    Vue.use(Vuex)
    
    const store=new Vuex.Store({
      state:{
        count:0,
        firstName:'hunger',
        lastName:'valley'
      },
      mutations:{
        increment(state){
          state.count++
        },
        changeName(state){
          state.firstName='bomber'
        }
      },
      //这里是getters
      getters:{
        fullName(state){
          return state.firstName+''+state.lastName
        }
      }
    })
    const Counter={
      template:`
            <div>  
              <div>{{count}}</div>
              <div>{{firstName}}{{lastName}}</div>
              <button @click='add'>+</button>
              <button @click='changeName'>changName</button>
            </div>
`,
      computed:{
        count(){
          return this.$store.state.count
        },
        //在组件中通过计算属性引入getters的fullName
        fullName(){
          return this.$store.getters.fullName
        }, 
        ...Vuex.mapState(['firstName','lastName'])
        //这个操作完成后得到的是一个数组，所以需要三个点操解构拿到数组里面的信息
      },
      methods:{
        add(){
          this.$store.commit('increment')
        }
      }
    }
```
##### mapGetters方法引入到组件里面
* 你也可以使用mapGetters方法引入到组件里面
```js
        // fullName(){
        //   return this.$store.getters.fullName
        // },
        //下面的mapGetters,就相当于上面的fullName函数
        ...Vuex.mapGetters(['fullName']),
```
* 我们还可以通过mutations更改state,以达到更改getters的目的,**并且通过传第二个参数获取响应的改变后的数据，这个第二个参数可以是对象也可以是普通类型，大多数情况是对象比较好，因为可以传递多个数据**。
```js
 <div id='app'></div>
  
  <script>
    Vue.use(Vuex)
    
    const store=new Vuex.Store({
      state:{
        count:0,
        firstName:'hunger',
        lastName:'valley'
      },
      mutations:{
        increment(state){
          state.count++
        },
        modifyFirstName(state,newName){//第一个参数是state状态，第二个参数是传过来的新名字载荷newName
          state.firstName=newName
        }
      },
      getters:{
        fullName(state){
          return state.firstName+''+state.lastName
        }
      }
    })
    const Counter={
      template:`
            <div>  
              <div>{{count}}</div>
              <div>{{firstName}}{{lastName}}</div>
              <button @click='add'>+</button>
              <button @click='changeName'>changName</button>
            </div>
`,
      computed:{
        count(){
          return this.$store.state.count
        },
        ...Vuex.mapGetters(['fullName']),
        ...Vuex.mapState(['firstName','lastName'])

      },
      methods:{
        add(){
          this.$store.commit('increment')
        },
        changeName(){//这里穿了两个参数，第一个参数是函数名字，第二个参数是载荷
          this.$store.commit('modifyFirstName','bomber')
        }
      }
    }
```
* 具体见[JSbin代码](https://jsbin.com/juqaposiva/1/edit?html)
* 另外Mutation 需遵守 [Vue 的响应规则](https://vuex.vuejs.org/zh/guide/mutations.html#mutation-%E9%9C%80%E9%81%B5%E5%AE%88-vue-%E7%9A%84%E5%93%8D%E5%BA%94%E8%A7%84%E5%88%99),也说到如果state里面没有的属性是增加不了的，需要使用Vue.set
* [Mutation 必须是同步函数](https://vuex.vuejs.org/zh/guide/mutations.html#mutation-%E5%BF%85%E9%A1%BB%E6%98%AF%E5%90%8C%E6%AD%A5%E5%87%BD%E6%95%B0)
* 也可以通过[mapMutations](https://vuex.vuejs.org/zh/guide/mutations.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%8F%90%E4%BA%A4-mutation) 辅助函数将组件中的 methods 映射为 store.commit 调用，在组件中使用,**不过是在方法methods中使用**，比如
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```
#### actions的使用
* actions 类似于 mutation，不同在于：
    * Action 提交的是 mutation，而不是直接变更状态。
    * Action 可以包含**任意异步操作**。
* **mutations是直接更改状态state，但是actions是提交commit一个mutations**.
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {//直接修改数据状态
    increment (state) {
      state.count++
    }
  },
  actions: {//通过提交commit这个mutations来修改数据状态
    increment (context) {
      // 这里的context就是前面的const store，但是如果涉及到Module的时候就不全是了。
      context.commit('increment')
    }
  }
})
```
* ES6语法
```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```
* 触发一个action使用`store.dispatch`
```js
store.dispatch('increment')
```
* 来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：
```js
actions: {
  checkout ({ commit, state }, products) {//这里的{commit, state}就相当于当前的store，上下文context，store对象里面有commit和state
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)//这里就相当于context.commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```
##### 在组件中同样有mapActions
* mapActions 辅助函数将组件的 methods **映射为 store.dispatch**调用（需要先在根节点注入 store）
#### Vuex映射在不同位置
* **state和getters是放到组件的computed里面，而mutations和actions是放到组件的methods里面**。
#### Module
*  [Module](https://vuex.vuejs.org/zh/guide/modules.html)把当前的Vuex做一个拆分，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
* 前面说了action里面的参数对象如果不是modules就是当前的store（也就是当前的Vuex对象），但是如果有modules，看下面代码
```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {//这里的{ state, commit, rootState }代表的是当前模块moduleA的Vuex对象，而不是当前的全局的Vuex对象
    // state代表当前模块的state
    // commit代表当前模块的commit
    // rootState代表当前全局的state
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```
#### 项目结构目录示例
* 对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：
```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```
## vuex在项目中的使用auth模块
* 首先在src目录下面创建一个store文件夹。里面存一个入口文件index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
//分了两个模块，一个是auth，一个是blog,凡是跟用户登录注册相关的信息放到auth里面。凡是跟blog操作相关的东西放到blog里面
import auth from './modules/auth'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({//创造一个store对象，提供给全局的Vue使用
  modules: {
    auth,
    blog
  }
})
```
* 并且创建一个modules,里面存入用户操作auth.js和博客操作blog.js,内容都包括了state,getters,mutations,actions.
```js
export default {
    state:{},
    getters:{},
    mutations:{},
    actions:{}
}
```
* 之所以建立这么多文件，**是因为把用户博客等操作全部放到一起，内容一多，这个文件就会特别大，可读性也变差**。假设还有更多的操作，就更加复杂了。
* [安装Vuex](https://vuex.vuejs.org/zh/installation.html)
```sh
npm install vuex --save
```
* 为了让auth.js和blog.js里面的四个核心内容更清晰，我们把这四个内容拿出来。
```js
import auth from '@/api/auth'

const state={//类似于组件里面的data属性
    user:null,//用户信息
    isLogin:false//是否登录
}
const getters={//类似于组件里面的computed属性

}
const mutations={
    setUser(state,payload){
        state.user=payload.user//载荷这个对象的user属性赋值给state数据状态里面的user属性
    },
    setLogin(state,payload){
        state.isLogin=payload.isLogin//载荷这个对象的isLogin属性赋值给state数据状态里面的isLogin属性
    }

}
const actions={
    login({commit},{username,password}){//第一个是默认参数commit,第二个是一个对象，对象里面包括用户名username和密码password
        return auth.login({username,password})//这是底层封装好的用户登录的方法,这里return出去是为了让别的地方可以有更多操作，可以.then
        .then((res)=>{//需要看后端接口的响应返回的代码信息
            commit('setUser',{user:res.data})//跟前面的对象相对应，也就是对象的user里面有用户信息res.data
            commit('setLogin',{isLogin:true})//如果登陆了，那么对象的isLogin里面就是true
        })
    },
    async register({commit},{username,password}){
        let res=await auth.register({username,password})
        commit('setUser',{user:res.data})
        commit('setLogin',{isLogin:true})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
} 
```
### 异步改成同步的代码
* promise.then修改为async和await
```js
const actions={
    login({commit},{username,password}){
        return auth.login({username,password})
        .then((res)=>{
            commit('setUser',{user:res.data})
            commit('setLogin',{isLogin:true})
        })
    },
    //上面是登陆，下面是注册，内容都差不多，但是上面是异步代码的写法，下面是用async和await的同步代码的写法，效果是一样的。
    async register({commit},{username,password}){
        let res=await auth.register({username,password})
        commit('setUser',{user:res.data})
        commit('setLogin',{isLogin:true})
        return res.data
    }
}
```
* actions的代码补充齐全
```js
const actions={
    login({commit},{username,password}){//第一个是默认参数commit,第二个是一个对象，对象里面包括用户名username和密码password
        return auth.login({username,password})//这是底层封装好的用户登录的方法,这里return出去是为了让别的地方可以有更多操作，可以.then
        .then((res)=>{//需要看后端接口的响应返回的代码信息
            commit('setUser',{user:res.data})//跟前面的对象相对应，也就是对象的user里面有用户信息res.data
            commit('setLogin',{isLogin:true})//如果登陆了，那么对象的isLogin里面就是true
        })
    },
    async register({commit},{username,password}){
        let res=await auth.register({username,password})
        commit('setUser',{user:res.data})
        commit('setLogin',{isLogin:true})
    },
    async logout({commit}){
        await auth.logout()
        commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
    },

    async checkLogin({commit,state}){
        if(state.isLogin) return true
        let res=await auth.getInfo()
        commit('setLogin',{isLogin:res.isLogin})
        if(!state.isLogin) return false
        commit('setUser',{user:res.data})//这里没有登陆怎么会有这个信息。我有点疑问
        return true
    }

    /*
    this.checkLogin().then(isLogin=>{

    })
    */ 
}
```
### 首先在header.vue组件里面使用vuex
* 在改文件的script里面修改
```js
<script>
    export default{
      data(){
        return {
          isLogin:true
          }
      }
    }
</script>
```
* 修改为
```js
    import auth from '@/api/auth'
    window.auth=auth//把auth放到window全局上面可以做注销登陆测试
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{
          ...mapGetters([
          'isLogin',
          'user'
          ])
        },
      created(){//组件生命周期created的时候就开始判断，也就是该组件创建的时候，数据已经OK，但是模板还没有渲染。在这里可以发送AJAX请求
          this.checkLogin()
      },
      methods:{
        ...mapActions([//这样写了之后那么checkLogin就变成了当前组件的方法，就可以使用这个checkLogin方法了
          'checkLogin'
          ])
      }
    }
```
* 这里我们通过在控制台注销和登陆测试
```js
auth.login({username:'hunger12',password:"123456"})//登陆测试
auth.logout()//注销测试
```
* 这里还存在有点问题，**就是登陆后，刷新页面先是在未登录页面，然后等数据来了之后才会跳转到登陆页面，也就是闪一下的效果**,可以优化，但是这里就不做了，思路就是
```js
          this.checkLogin()
          .then(function(isLogin){//在接收数据之前隐藏原来的header，
            if(isLogin){}//在接收到数据之后在显示原来的header,但是这个时候已经渲染好了之后的登陆页面
            })
```
* 修改CSS代码，也就是默认是隐藏的，当鼠标移动到上面去的时候才展示出来**我的**和**注销**文字。
```css
  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin:0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }

    }
/* 当鼠标放上去之后把隐藏的display:none变成display：block */
    &:hover ul {
      display: block;
    }
  }
```
### 这里我把mapState和mapGetters继续分析映射到组件
#### mapGetters
##### 使用mapGetters数组形式
* [mapGetters](https://vuex.vuejs.org/zh/api/#mapgetters),这里面必须要传入的是**字符串**,代码如下
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{
          ...mapGetters([//只能接受字符串
          'isLogin',
          'user'
          ])
        },
      }
    }
```
##### 使用mapGetters对象形式
* 如果你想将一个 getter 属性另取一个名字，使用[对象形式](https://vuex.vuejs.org/zh/guide/getters.html#mapgetters-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)：key可以是变量或者字符串，**但是value必须是字符串**,代码如下:
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{
        ...mapGetters({//这里的value只能接受字符串,key可以是字符串
            'isLogin':'isLogin',
            'user':'user'
        }) 
      },
    }
    //或者写成下面也是可以的
      computed:{
        ...mapGetters({//这里的value只能接受字符串，key也可以是变量。
            isLogin:'isLogin',
            user:'user'
        }) 
      },
```
##### 不使用mapGetters
* 代码如下
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{
          isLogin(){
            // return this.$store.state.auth.isLogin//如果Vuex对象里面已经把state转存到getters里面，也可以用下面的代码
            return this.$store.getters.isLogin
          },
          user(){
            // return this.$store.state.auth.user//如果Vuex对象里面已经把state转存到getters里面，也可以用下面的代码
            return this.$store.getters.user
          }
        },
    }
```
#### mapState
##### 使用mapState普通函数形式
* 普通函数形式，可以使用this，当然也可以传入参数state。
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{...mapState({
          isLogin: function(){return this.$store.state.auth.isLogin},//这里可以用this,也可以传入参数state
          user: function(){return this.$store.state.auth.user}//这里可以用this,也可以传入参数state
            })
        },
      }
```
##### 使用mapState箭头函数形式
* 普通函数形式，**不可以使用this**，但是可以传入参数state。
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{...mapState({
          isLogin:(state)=>state.auth.isLogin,//箭头函数里面没有this
          user: (state)=>state.auth.user//箭头函数里面没有this
            })
          },
    }
```
##### 使用mapState传字符串参数形式
* 传字符串参数 'count' 等同于 `state => state.count`，这里用到了模块modules，所以这个方法在这种情况最好不用。
```js
    import auth from '@/api/auth'
    window.auth=auth
    import {mapGetters,mapActions, mapState} from 'vuex'//引入vuex里面的两个函数mapGetters,mapActions，把vuex里面的状态作为映射，映射到这个组件上
    export default{
      data(){
        return {
          }
      },
      computed:{...mapState({
          // 传字符串参数 'isLogin' 等同于 `state => state.isLogin`,因为这里用到了模块auth，所以这种方法就不行了，如果没有用到模块这种方法是可以行的
          isLogin: 'isLogin',
          user: 'user'
            })
          },
    }
```
* [Vuex中mapState和mapGetters的区别。](https://segmentfault.com/q/1010000022337657)
* [Vuex那些事儿,包括mapState和mapGetters的区别](https://github.com/FrankKai/FrankKai.github.io/issues/106)
* [vue这个三个点（...mapGetters）为什么要把computed转换成数组](https://segmentfault.com/q/1010000012469852)
### checkLogin这个Actions里面的函数分析
* 执行顺序及返回的值，还有state和state.isLogin里面的值是true和false的分析。具体看下面代码的注释
```js
    async checkLogin({commit,state}){
        console.log(1,state,state.isLogin)
        // 这里如果isLogin已经改变了，那么是在后面的发请求后才发生改变的，所以state。isLogin在这里是false，但是你通过查看state这个状态对象里面发现，点开isLogin是true。
        if(state.isLogin) { console.log('HI'); return true}//如果isLogin已经是true就直接退出，返回true
        console.log(2,state,state.isLogin)

        let res=await auth.getInfo()//一开始如果是没有登陆，就会调用getInfo方法发请求。
        console.log(3,state,state.isLogin)

        commit('setLogin',{isLogin:res.isLogin})
        console.log(4,state)

        if(!state.isLogin) return false//这个是通过发送请求后，获取到后端返回的isLogin是登陆true状态还是未登录false状态，如果是false就直接退出并返回false
        console.log(5,state.isLogin)
        commit('setUser',{user:res.data})//如果是登陆true状态才会执行这里，就是把用户信息保存在Vuex的auth模块的state数据的user里面。
        console.log(6,state.user,state.isLogin)
        return true
    }
```
### 注销的三种方式
* 模板中有一个`@click="onLogout"`
```html
    <template v-if="isLogin">
      <!-- 两个根元素header必须要用v-if,v-else-if不然会报错 -->
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
        <ul>
          <li><router-link to="/my">我的</router-link></li>
          <!-- 这里的onLogout,前面有一个on是为了防止和别的地方的注销名字重名 -->
          <li><a href="#" @click="onLogout">注销</a></li>
        </ul>
      </div>  
    </template>
```
* **第一种方式**，直接手写。
```js
      methods:{
        ...mapActions([//这样写了之后那么checkLogin就变成了当前组件的方法，就可以使用这个checkLogin方法了
          'checkLogin'
          ]),
        onLogout(){
          auth.logout()
          this.$store.commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
         this.$store.commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开
        }
      }
```
* **第二种方式**，用mapActions引入logout方法，因为logout方法中已经有下面两段代码了，
```js
    async logout({commit}){
        await auth.logout()
        commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
    },
```
* 所以可以省去一些代码，可以写成
```js
      methods:{
        ...mapActions([//这样写了之后那么checkLogin就变成了当前组件的方法，就可以使用这个checkLogin方法了
          'checkLogin',
          'logout'//引入这个logout
          ]),
        onLogout(){
          // auth.logout()
          this.logout()//下面的两段代码已经在引入的logout里面存在了，所以可以省去。
          // this.$store.commit('setUser',{user:null})//如果注销了，就把用户设置为最开始的null状态
        //  this.$store.commit('setLogin',{isLogin:false})//如果注销了，就把是否登陆状态修改为最开始的false状态
        }
      }
```
* **第三种方式**，直接手写，但是需要[刷新页面](https://blog.csdn.net/g_blue_wind/article/details/51828788),**因为注销后页面不会自动变化需要刷新页面后才会变化**。
```js
      methods:{
        ...mapActions([//这样写了之后那么checkLogin就变成了当前组件的方法，就可以使用这个checkLogin方法了
          'checkLogin'
          ]),
        onLogout(){
          auth.logout()
          location.reload()
        }
      }
```
### 登陆注册路由vue-router链接
* 登陆的代码修改,这里通过vue-router去改变路由，所以最好用vue-router，不要用a标签。
* 这里把router-link标签放到el-button标签的外面，**因为router-link会自动加一个a标签，如果放到里面会影响span标签字体的样式，放到外面就不会影响字体的样式了**。
```html
    <router-link to="./login"><el-button>立即登录</el-button></router-link>
    <router-link to="./register"><el-button>注册账号</el-button></router-link>
```
* 如果用a标签那么url最后会变成下面的，也可以就是哈希#这个符号
```sh
http://localhost:8080/login

```
* 如果用vue-router那么就会变成下面，有一个哈希#符号。当然后面还可以增加参数和配置。
```sh
http://localhost:8080/#/login
```
* 这里把a标签的样式在asserts目录的common.less里面增加
```css
a {
    text-decoration: none;
    color: #333;
  }
```
### 登录注册的功能实现
#### 在pages/Login目录下登陆功能
* template.vue增加部分代码，包括input上面的v-model
```html
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin" >
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
```
* 因为v-model绑定的数据会修改，那么我们需要在数据的data里面写上这个绑定的数据username和password。
```js
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App',
        username:'',
        password:''
      }
    },
```
* 这里用到[修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6),这里是[keyup](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/keyup_event)事件,當鍵盤上的手指離開按鍵時，keyup事件會被觸發。
```html
    <!-- 输入完密码按回车也可以调用onLogin，用到按键修饰符——@keyup.enter -->
    <!-- 只有在 `key` 是 `Enter` 时调用 `vm.onLogin()` -->
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin" >
```
* 然后我们就可以onLogin方法通过console.log打印出来测试**点击**和**回车键**。
```js
    methods:{
      onLogin(){
        console.log(this.username+':'+this.password)
      }
    }
```
#### 登陆的三种方法
* 第一种,**不使用mapActions函数**，直接用`store.dispatch('login')`触发
```js
      onLogin(){
        // 虽然在auth.js里面的login有两个参数也就是login({commit},{username,password}),但是在组件上只有后面一个参数，也就是{username,password}。
        this.$store.dispatch('login',{username:this.username,password:this.password})
        .then(()=>{
              this.$router.push({path:'/'})
          })
      }
    }
```
* 第二种,**通过映射mapActions函数**，将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
```js
import {mapActions} from 'vuex'

    methods:{
      input(){
        
      },
      onLogin(){
        console.log(this.username+':'+this.password)
        // 虽然在auth.js里面的login有两个参数也就是login({commit},{username,password}),但是在组件上只有后面一个参数，也就是{username,password}。
        this.login({username:this.username,password:this.password})
        .then(()=>{
            this.$router.push({path:'/'})
        })
      },
      ...mapActions([
        // onLogin:'login'
        'login'// 将 `this.login()` 映射为 `this.$store.dispatch('login')`
      ])
    }
```
* 第三种，就是**通过映射mapActions函数**,将 `this.onLogin()` 映射为 `this.$store.dispatch('login')`
```js
import {mapActions} from 'vuex'

export default {
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App',
        username:'',
        password:''
      }
    },
    methods:{
      input(){
        
      },
      ...mapActions({
        onLogin:'login'//将 `this.onLogin()` 映射为 `this.$store.dispatch('login')`
    })
    }
  }
```
* 但是在**html模板中在onLogin里面传入传入载荷**，此时的`{username:username,password:password}).then(()=>{ $router.push({path:'/'})})`的value是**省去了this**,`$router`**前面的this也省去了**，因为在**模板里面是自动绑定this**。我是从[这篇文章](http://menvscode.com/detail/5a36194ea7833e528ca883df/)看到这个方式的，[Vuex官网](https://vuex.vuejs.org/zh/guide/actions.html)上面没有详细说明怎么传参数
```html
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <!-- 输入完密码按回车也可以调用onLogin，用到按键修饰符——@keyup.enter -->
    <!-- 只有在 `key` 是 `Enter` 时调用 `vm.onLogin()` -->
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin({username:username,password:password}).then(()=>{ $router.push({path:'/'})})" >
    <el-button size="medium" @click="onLogin({username:username,password:password}).then(()=>{ $router.push({path:'/'})})">立即登录</el-button>
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
```
#### 在pages/Login目录下注册功能
* 这里跟登陆很相似。
```js
import {mapActions} from 'vuex'

export default {
    data () {
      return {
        username:'',
        password:''
      }
    },
    methods:{
      onRegister(){
        this.register({username:this.username,password:this.password})
        .then(()=>{
          this.$router.push({path:'/'})
        })
      },
      ...mapActions([
        'register'
      ])
    }
  }
```
* 这里就说一下大概的逻辑。
  1. 当用户点击按钮或者按回车键的时候，会调用函数onRegister.
  2. 这个onRegister里面有一个this.register函数(它是通过mapActions映射过来的函数)去执行。
  3. 然后会去找data里面的username和password。这个是通过v-model绑定后，用户可以传递这两个数据。
  4. 然后会去methods里面找register方法(它是通过mapActions映射过来的函数)。
  5. mapActions函数是通过import传入过来。
  6. mapActions得到的是一个对象，通过[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax),也就是三个点，可以把对象解构为属性key是register,对应的key值也是register这个函数。
  7. this.register也就是modules目录里面的auth.js函数会执行更新user信息和isLogin状态
  8. header组件通过mapGetters函数把user和isLogin拿到，对应的getters里面的user和isLogin也更新了。
  9. 然后header组件的模板template的class类和图片的src和v-if判断等都会更新
      ```html
        <header :class="{login: isLogin, 'no-login': !isLogin}"> 
          <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
      ```
* 所以看起来很简单，但是中间内部做了很多事情，我们不用考虑组件之间的数据传递，大量简化了代码。
### 路由完善、异步加载、权限控制
* 当点开某个用户的文章的时候怎么知道是哪个用户，这里就需要把路由完善一下，让后端知道是哪个用户被点击了。
* 这里需要用到后端的data里面的id属性。需要的路由包括详情(detail),编辑(edit),某个用户的博客列表(user)
```js
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/detail/:blogId',//某个博客的博客详情
      component: Detail
    },
    {
      path: '/edit/:blogId',//编辑某个博客
      component: Edit
    },     
    {
      path: '/user/:userId',//某个用户的博客列表
      component: User
    }
  ]
})
```
* 我们用到[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)。
* 用到[全局前置守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
  * 每个守卫方法接收三个参数：

  * to: Route: 即将要进入的目标 路由对象

  * from: Route: 当前导航正要离开的路由

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
* 这个信息就可以控制哪些页面是必须要登陆之后才可以看到，哪些是不用登陆也可以看到的。包括了创建博客(create)页面，编辑(edit)博客页面，我的(my)博客页面。
```js
export default new Router({
  routes: [
    {
      path: '/create',
      component: Create,
      meta:{requiresAuth:true}
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta:{requiresAuth:true}
    },     
    {
      path: '/my',
      component: My,
      meta:{requiresAuth:true}
    },    
  ]
})
```
* 我们只需要在全局导航守卫中检查元字段就OK了。也就是`meta:{requiresAuth:true}`
* [$route.matched](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7),他是一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
  * 当 URL 为 /foo/bar，$route.matched 将会是一个包含从上到下的所有对象 (副本)。
* 这里还用到了[Array.prototype.some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some),some() 方法测试数组中是不是**至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值**。
* 这里的登陆状态判断**不要使用store.getters.isLogin或者store.state.auth.isLogin判断，因为这里需要发请求后才会登陆，那么就是一个异步的过程，那么返回数据之前就已经执行了代码那么就算登陆状态是true，执行的代码还是false,所以这里需要用到异步处理状态**。也就是Actions.所以这里使用`store.dispatch('checkLogin').`
* 查询参数的跳转
  ```js
    query: { redirect: to.fullPath }//并提供一些查询参数,可以跳转到之前的页面，也就是说如果之前的路径是edit/3，那么会先跳转到登陆页面输入正确账号和密码后，成功登陆会跳转到edit/3这个页面。
  ```
* **全部注释**的代码如下
```js
import store from '../store'

const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [
        //这里面省略掉
  ]
})

//每一个历史记录进行匹配遍历
router.beforeEach((to, from, next) => {//这里的router就是前面创建的new Router对象，beforeEach就是每一次路由切换都会去执行里面的代码
  if (to.matched.some(record => record.meta.requiresAuth)) {//这里用到$route.matched和原生的数组的API——some(),检查是否存在meta.requiresAuth为真值的，如果有就返回true
// 这里的!store.getters.isLogin是发了请求后在从false改为true的，但是这句代码在发请求前已经执行了。所以来不及等到请求后修改的正确值，就算是登陆了用了还是false。所以要用异步的checkLogin来判断是否登陆

    store.dispatch('checkLogin').then(isLogin=>{
      // if (!store.getters.isLogin)//这个判断对于异步不可信，要用dispatch
      if (!isLogin) {//看看是不是登陆状态，没有登陆就进入到登陆页面,这里需要用到Vuex里面状态来判断，不需要再次发请求判断
        // 这里因为使用了模块modules，使用state的时候就需要用到store.state.auth.isLogin,如果用getters就不需要考了modules，可以是store.getters.isLogin,但是这个方法暂时不可信，因为这里要发请求是异步的，所以要用到checkLogin
        next({
          path: '/login',//如果没有登陆，那么就跳转到/login页面
          query: { redirect: to.fullPath }//并提供一些查询参数,可以跳转到之前的页面，也就是说如果之前的路径是edit/3，那么会先跳转到登陆页面输入正确账号和密码后，成功登陆会跳转到edit/3这个页面。
        })
      } else {//如果登陆了就直接下一步
        next()
      }
    })

  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
```
* 跳转到首页修改为跳转到查询参数上面，在Login文件中
* **注意前面的是$router，后面的是$route**。这里我写错了看了半天才发现。
  * [vue $router和$route的区别](https://blog.csdn.net/wangguoyu1996/article/details/80628135)
  * [this.$route和this.$router的区别](https://blog.csdn.net/gaoqiang1112/article/details/79850604)
```js
    .then(()=>{
        this.$router.push({path:this.$router.query.redirect||'/'})//如果没有查询参数才跳转到首页，有就跳转到之前的页面,前面的是$router，后面的是$route
    })
```
* chrome上面自动保存密码的设置，在设置->你与google->自动填充->密码里面。
### 发布前需要做的事情
#### npm run build编译打包
* 就是运行下面代码
```sh
npm run build
```
* 他会把我们做的事情都打包生成JS文件。然后出现在**dist目录下面**
  * 包括static文件夹。里面有CSS，JS，font。
  * 还有一个index.html
* 我们之前写的一堆的代码就变成了dist目录下面的文件和代码。
* 运行后显示如下代码
```sh
$ npm run build

> blog-client@1.0.0 build D:\jirengu\github收集\Multiplayer Sharing blogs for Vue\blog-client
> node build/build.js

Hash: 5dacb7dc627b893d3307
Version: webpack 3.12.0
Time: 19619ms
                                                  Asset       Size  Chunks                   Chunk Names
    static/css/app.64217e412322166b26d39138141a22ca.css     238 kB       1  [emitted]        app
                static/fonts/element-icons.535877f.woff    28.2 kB          [emitted]    
               static/js/vendor.c3e7996854f784ff3253.js     866 kB       0  [emitted]  [big]  vendor
                  static/js/app.d2f94c66cb530979223a.js    87.1 kB       1  [emitted]        app
             static/js/manifest.2ae2e69a05c33dfc65f8.js  857 bytes       2  [emitted]        manifest
                 static/fonts/element-icons.732389d.ttf      56 kB          [emitted]    
static/css/app.64217e412322166b26d39138141a22ca.css.map     341 kB          [emitted]    
           static/js/vendor.c3e7996854f784ff3253.js.map    3.45 MB       0  [emitted]        vendor
              static/js/app.d2f94c66cb530979223a.js.map     205 kB       1  [emitted]        app
         static/js/manifest.2ae2e69a05c33dfc65f8.js.map    4.97 kB       2  [emitted]        manifest
                                             index.html  513 bytes          [emitted]    

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.
```
* 这里面的代码运行需要http协议，不可以用file协议哦。
* 我们可以切换到dist目录下面安装目录http-server,并且运行下面代码就可以代码了，可以在浏览器中查看效果。
```sh
http-server . -c-1
```
* 并且我们可以在Chrome浏览器控制台的network中看到请求获取到一些文件，其中一个比较大的文件是vendor开头的js文件
* 我们通过修改不同路径可以获取不同路径的请求和响应，但是JS文件是不会加载了。
* 也就是说**他是一次性把JS文件加载完了，这样第一次加载就会比较慢，如果考虑只加载首页就会快很多，性能优化一些，比如懒加载，懒加载可以在你登陆页面的时候加载登陆页面，编辑页面的时候只加载编辑页面，当然已经加载过的返回就不会再次加载了。**
#### 懒加载实现
* 我们不用一开始就import
* 原来代码
```js
import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/pages/Create/template.vue'
import Detail from '@/pages/Detail/template.vue'
...//这里组件名字和引入就省略了
import store from '../store'
window.store=store
Vue.use(Router)
const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [
    {
      path: '/create',
      component: Create,
      meta:{requiresAuth:true}
    },
    ...//这里的省略了
  ]
})
```
* 修改为
```js
//通过异步函数使用该路由的时候在加载某个组件获取网页
const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    ...//这里的其他组件名字和引入省略
  ]
})
```
* 这样就可以通过异步的方式加载某个组件，**就不会第一次全部加载完了**。
* 我们重新做一次编译打包
```sh
npm run build
```
* 运行后代码，**发现多了很多文件,这里的文件前面的数字12345......对应的就是不同的页面**
```sh
$ npm run build

> blog-client@1.0.0 build D:\jirengu\github收集\Multiplayer Sharing blogs for Vue\blog-client
> node build/build.js

Hash: d3297ef74398c5125cef
Version: webpack 3.12.0
Time: 21107ms
                                                  Asset       Size  Chunks                   Chunk Names
    static/css/app.14e1e30569593a52fd602c7559b6e65c.css     238 kB       9  [emitted]        app
                static/fonts/element-icons.535877f.woff    28.2 kB          [emitted]    
                    static/js/0.1124ae0415c67ca53bf3.js  469 bytes       0  [emitted]    
                    static/js/1.93187f0a6d8e73bfc3b4.js    72.5 kB       1  [emitted]    
                    static/js/2.349d692ad6e731f9a37b.js    1.55 kB       2  [emitted]    
                    static/js/3.895300774fabd257d72b.js  469 bytes       3  [emitted]    
                    static/js/4.e4150f1da1c1ddd7a724.js    2.35 kB       4  [emitted]    
                    static/js/5.1c6d626af006c9ad4319.js    1.61 kB       5  [emitted]    
                    static/js/6.04d7b374e0bb692a6ae8.js    3.43 kB       6  [emitted]    
                    static/js/7.1c0ddadbe7567b98f972.js  540 bytes       7  [emitted]    
               static/js/vendor.6cf57b247bf765488458.js     866 kB       8  [emitted]  [big]  vendor
                  static/js/app.b605cdde5777851d86a6.js     6.3 kB       9  [emitted]        app
             static/js/manifest.c0764196ed2aeb6df688.js    1.64 kB      10  [emitted]        manifest
                 static/fonts/element-icons.732389d.ttf      56 kB          [emitted]    
static/css/app.14e1e30569593a52fd602c7559b6e65c.css.map     341 kB          [emitted]    
                static/js/0.1124ae0415c67ca53bf3.js.map    3.26 kB       0  [emitted]    
                static/js/1.93187f0a6d8e73bfc3b4.js.map     133 kB       1  [emitted]    
                static/js/2.349d692ad6e731f9a37b.js.map    6.04 kB       2  [emitted]    
                static/js/3.895300774fabd257d72b.js.map    3.26 kB       3  [emitted]    
                static/js/4.e4150f1da1c1ddd7a724.js.map    6.78 kB       4  [emitted]    
                static/js/5.1c6d626af006c9ad4319.js.map    6.76 kB       5  [emitted]    
                static/js/6.04d7b374e0bb692a6ae8.js.map    10.7 kB       6  [emitted]    
                static/js/7.1c0ddadbe7567b98f972.js.map    3.46 kB       7  [emitted]    
           static/js/vendor.6cf57b247bf765488458.js.map    3.45 MB       8  [emitted]        vendor
              static/js/app.b605cdde5777851d86a6.js.map    36.4 kB       9  [emitted]        app
         static/js/manifest.c0764196ed2aeb6df688.js.map    8.09 kB      10  [emitted]        manifest
                                             index.html  513 bytes          [emitted]    

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.

```
* 这次你打开Chrome浏览器控制台，查看首次进入主页页面后就不会加载其他路由页面的资源，**当改变其他路由的时候，会看到再次加载了其他路由对应页面的资源信息显示。**
### 创建博客页面
* 让Let's share链接到首页
```html
  <h1><router-link to="/" >Let's share</router-link></h1>
```
* 笔变成加号
```html
  <router-link to="/create" ><i class="edit el-icon-plus"></i></router-link>
```
* 是否展示到首页，用elementUI的[switch开关](https://element.eleme.cn/#/zh-CN/component/switch)
```html
<el-switch
  v-model="atInex"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
```
* elementUI中的input的[可自适应文本高度的文本域](https://element.eleme.cn/#/zh-CN/component/input#ke-zi-gua-ying-wen-ben-gao-du-de-wen-ben-yu)
```html
<el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="textarea2">
</el-input>
```
* 用到多行文本[textarea](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea)
* 当点击确定的时候执行一个函数，就是创建一个博客。
```html
    <el-button @click="onCreate">确定</el-button>
```
* **限30个字。可以修改为0/30这样体验会比较好，，也就是每次内容的改变会做一个校验，校验结果超过了就增加一些特别的样式为红色警示效果。并提示用户已经超过了最大字数。这一步后续再做**
* 因为这里创建的博客是自己单独组件使用的，所以不需要用Vuex共享数据。直接调用创建博客的函数即可。
* 注意这里的实参和形参的参数的区别,另外注意[this.$message和Message](https://element.eleme.cn/#/zh-CN/component/message#dan-du-yin-yong)的区别,Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 Message。如果使用Message需要单独引入`import { Message } from 'element-ui';`
```js
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
```
* 这样我们每次增加博客点击确定后，跳转到的id每次都会增加，比如
```js
http://localhost:8080/#/detail/3905
// 下一次就是
http://localhost:8080/#/detail/3906
```
### 首页完善
* 简单来说就是进入首页路由后，发一个请求获取到首页数据，然后对这个数据进行渲染。
* 把首页的博客部分内容可以点击，点击后可以跳转到详情页面.
* 并且这里需要一个v-for循环来遍历博客
* 用到[Vue的列表渲染](https://cn.vuejs.org/v2/guide/list.html)，**这里的item in items和item of items 效果是一样的，这原生的for in和for of不一样**。具体见[列表渲染](https://cn.vuejs.org/v2/guide/list.html#%E7%94%A8-v-for-%E6%8A%8A%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E5%AF%B9%E5%BA%94%E4%B8%BA%E4%B8%80%E7%BB%84%E5%85%83%E7%B4%A0)
* 根据后端的返回数据内容
```js
{
  "status": "ok",
  "msg": "获取成功",
  "total": 200, //全部博客的总数
  "page": 2, //当前页数
  "totalPage": 10, // 总页数
  "data": [
    { 
      "id": 1,                 //博客 id
      "title": "博客标题",       
      "description": "博客内容简要描述", 
      "user": {
        "id": 100, //博客所属用户 id,
        "username": "博客所属用户 username",
        "avatar": "头像"
      },
      "createdAt": "2018-12-27T08:22:56.792Z",   //创建时间
      "updatedAt": "2018-12-27T08:22:56.792Z"  //更新时间
    },
    ...
  ]
}
```
* 修改前端的v-for循环的数据
* js
```js
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
        blogs:[],//发请求获取到的数据复制给这个blogs
        // blogId:1
      }
    },
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      blog.getIndexBlogs()
      .then((res)=>{
        this.blogs=res.data
        // this.blogId=res.data[1].id
      })
    },
```
* html
```html
  <div id="index">
    <section class="blog-posts">
      <!-- <router-link  v-for="blog in blogs" :key="blog.id" :to="`/detail/${blogId}`" class="item"> -->
      <!-- 这里的错误的原因，第一是blogId写成了可blodId，手抖。第二个是blogs里面是一个数组，需要获取到某一个数组后才可以获取到数组的id，所以这里最好还是用for循环的blog来获取id比较合适 -->
      <router-link  v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`" class="item">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username">
          <!-- 后端的用户名 -->
          <figcaption>{{blog.user.username}}</figcaption> 
        </figure>
        <!-- 后端的文章标题和更新时间 -->
        <h3>{{blog.title}} <span> {{blog.updatedAt}}</span></h3>
         <!--后端数据的文章简介  -->
        <p>{{blog.description}}</p>
      </router-link>
      </div> -->
    </section>
  </div>
```
#### 多页展示
* 目前为止只能显示一页博客列表，不能显示全部内容，所以还需要设置分页组件，element-ui上面有
* 这个时间显示方式还可以继续处理。
* 当前页面发生变化时候用`@current-change`,具体见[elementUI分页的附加功能](https://element.eleme.cn/#/zh-CN/component/pagination#fu-jia-gong-neng),这里绑定事件的名字`@current-change="onPageChange"`，我又错写成了`@current-chang`，少了一个e，**错了第二次了**.
* `:current-page`是当前页码高亮的数值。**老师的代码这个地方没有完善**
```html
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
```
* 刷新后还是保持在之前的页码对应的页面，这里需要把当前页面放到url里面。
#### elementUI解决重复点击导航路由报错
* 如果刷新之前是url的路径是`http://localhost:8080/#/?page=6`,然后刷新后点击了某个按钮之后路径又是重复的`http://localhost:8080/#/?page=6`，那么就会报出下面的错误。
```sh
Uncaught (in promise) Error: Avoided redundant navigation to current location: "/?page=89".
    at HashHistory.confirmTransition (vue-router.esm.js?fe87:2185)
    at HashHistory.transitionTo (vue-router.esm.js?fe87:2126)
    at HashHistory.push (vue-router.esm.js?fe87:2585)
    at eval (vue-router.esm.js?fe87:2903)
    at new Promise (<anonymous>)
    at VueRouter.push (vue-router.esm.js?fe87:2902)
    at eval (template.js?e491:57)
```
* 通过[文章](https://blog.csdn.net/ZHOU_CXY/article/details/106565480)在Router的index.js文件里面加入这段代码就可以不报错了，当然这个错误不解决也不影响目前使用
```js
// // 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
```
#### 刷新后保持当前页面数据及当前页码的高亮
* 保持当前页面数据就是需要一个查询参数，也就是url上增加?。
* 刷新后并且要保持当前分页的的某个页面的高亮，需要用到前面提到的`:current-page`.**老师的代码这个地方没有完善**。
* 下面四种方式都可以实现**有点击分页的时候页码高亮并且在url上面也有某一个页码的查询参数显示，刷新后还是保持原来的高亮和查询参数**
* [vue-router报错:Route with name ‘home’ does not exist](https://blog.csdn.net/weixin_41195867/article/details/88721162)，用name和params需要在路由router对象里面设置路由的name,还有动态路由路径，也就是`/index/:id`,我就是没有写name一直报错，一直没有写:id，所以获取不到params。
##### 方法一：使用name和params配合但是不写query
* 这里需要在router对象里面[设置name和路径参数](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)。
* [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
```js
const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [ 
    ...//省略
    {
      // name:"index",
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      name:"index",
      path: '/?:a',
      component: () => import('@/pages/Index/template.vue')
    },
    ...// 省略
  ]
})
```
* 使用name和params在Index目录的template.js文件中，这个方法相对来说**复杂和麻烦一点**
```js
import blog from '@/api/blog.js'

export default {
    data () {
      return {
        blogs:[],//发请求获取到的数据复制给这个blogs
        total:1,//全部博客的总数
        page:1,//当前页数
        currentPage: 1,//这个是当前页码高亮
        a:1//这个是路径参数
      }
    },
    // 这里是刷新后的数据变化
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      this.page=Object.keys(this.$route.query)[0]//这里我获取不到params,但是在onPageChange方法中是可以获取到params的。但是可以通过query获取到查询参数。
        blog.getIndexBlogs({page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.total=res.total//全部博客的总数
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
          let a=res.page
          this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
        })
    },
    methods:{
      onPageChange(newPage){//这里是点击后的数据变化
        this.page=newPage
        blog.getIndexBlogs({ page: newPage})
        .then((res)=>{
          this.blogs=res.data
          this.page=res.page//当前页数
          // this.$router.push({path:'/',query:{page:newPage}})
          // this.$router.push({path:`/?page=${newPage}`})
          let a = newPage          
          this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
        })
      }
    }
  }
```
##### 方法二：使用name和params配合，并且写query
* 这里跟方法一**不同的地方在于，我们在router对象里面的路径参数增加`page=`**,因为这里的查询参数就是page
```js
const router= new Router({//创建一个new Router对象，里面有对应的路由和组件还有元信息。
  routes: [  
    {
      // name:"index",
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      name:"index",
      path: '/?page=:a',//这里增加page=:a
      component: () => import('@/pages/Index/template.vue')
    }
  ]
})
```
* 这个时候使用name和params在Index目录的template.js文件中，这个方法相对来说**简单多了**
```js
import blog from '@/api/blog.js'

export default {
    data () {
      return {
        blogs:[],//发请求获取到的数据复制给这个blogs
        total:1,//全部博客的总数
        page:1,//当前页数
        currentPage: 1
      }
    },
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      // this.page=parseInt(this.$route.query.page)||1//当前page页首先从url里面的查询参数query去找，找不到就为page是1，另外这里的字符串可以不用转换为数字也可以，就是下面的不用parseInt函数。因为老师的代码是把page当做currentPage使用的，currentPage是不能是字符串。而我的代码是单独有使用currentPage这个变量，因为这里获取到的是字符串，要通过parseInt转换为数字
      this.page=this.$route.query.page||1
        blog.getIndexBlogs({page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.total=res.total//全部博客的总数
          this.page=res.page//当前页数
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
        })
    },
    methods:{
      onPageChange(newPage){
        this.page=newPage
        blog.getIndexBlogs({ page: newPage})
        .then((res)=>{
          this.blogs=res.data
          // this.$router.push({path:'/',query:{page:newPage}})
          // this.$router.push({path:`/?page=${newPage}`})
          let a = newPage          
          this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
        })
      }
    }
  }
```
##### 方法三：使用path和query配合
* 这个方式就比较简单一点。他不需要name和路径参数配合,使用path和query在Index目录的template.js文件中
```js
import blog from '@/api/blog.js'

export default {
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
        blogs:[],//发请求获取到的数据复制给这个blogs
        // blogId:1
        total:1,//全部博客的总数
        page:1,//当前页数
        currentPage: 1
      }
    },
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      // this.page=parseInt(this.$route.query.page)||1//当前page页首先从url里面的查询参数query去找，找不到就为page是1，另外这里的字符串可以不用转换为数字也可以，就是下面的不用parseInt函数，因为老师的代码是把page当做currentPage使用的，currentPage是不能是字符串。而我的代码是单独有使用currentPage这个变量，因为这里获取到的是字符串，要通过parseInt转换为数字
      this.page=this.$route.query.page||1
      // this.page=Object.keys(this.$route.query)[0]//这里我获取不到params,但是可以通过query获取到查询参数。
        blog.getIndexBlogs({page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.total=res.total//全部博客的总数
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
          // let a=res.page
          // this.$router.push({ name: 'index', params: { a }}) // -> /user/123
        })
    },
    methods:{
      onPageChange(newPage){
        this.page=newPage
        // this.currentPage=newPage
        blog.getIndexBlogs({ page: newPage})
        .then((res)=>{
          this.blogs=res.data
          this.$router.push({path:'/',query:{page:newPage}})
          // this.$router.push({path:`/?page=${newPage}`})
          // let a = newPage          
          // this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
        })
      }
    }
  }
```
##### 方法四：单独使用path
* 这个方法跟方法三很类似，只是在path里面把query直接在Index目录的template.js文件中写出来了
```js
import blog from '@/api/blog.js'

export default {
    data () {
      return {
        blogs:[],//发请求获取到的数据复制给这个blogs
        // blogId:1
        total:1,//全部博客的总数
        page:1,//当前页数
        currentPage: 1
      }
    },
    created(){//created阶段，此刻模板还没有渲染，但是数据已经完成，那么就可以获取数据放到data里面，这是最早的数据可用阶段。
      // this.page=parseInt(this.$route.query.page)||1//当前page页首先从url里面的查询参数query去找，找不到就为page是1，另外这里的字符串可以不用转换为数字也可以，就是下面的不用parseInt函数，因为老师的代码是把page当做currentPage使用的，currentPage是不能是字符串。而我的代码是单独有使用currentPage这个变量，因为这里获取到的是字符串，要通过parseInt转换为数字
      this.page=this.$route.query.page||1
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
    methods:{
      onPageChange(newPage){
        this.page=newPage
        // this.currentPage=newPage
        blog.getIndexBlogs({ page: newPage})
        .then((res)=>{
          this.blogs=res.data
          // this.$router.push({path:'/',query:{page:newPage}})
          this.$router.push({path:`/?page=${newPage}`})
          // let a = newPage          
          // this.$router.push({ name: 'index', params: { a }}) // -> /index/分页的页码数
        })
      }
    }
  }
```
* [Vue Router 的params和query传参的使用和区别（详尽）](https://my.oschina.net/mf717714/blog/1932241)
* [编程式的导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)
* [关于VUE项目中报Error: Avoided redundant navigation to current location: 的错](https://blog.csdn.net/ZHOU_CXY/article/details/106565480)
### 完善详情页
* 博客详情的后端返回信息
```js
{
  "status": "ok",
  "msg": "获取成功",
  "data": { 
      "id": 1,                 //博客 id
      "title": "博客标题",       
      "description": "博客内容简要描述", 
      "content": "博客内容，字比较多",
      "user": {
        "id": 100, //博客所属用户 id,
        "username": "博客所属用户 username",
        "avatar": "头像"
      },
      "createdAt": "2018-12-27T08:22:56.792Z",   //创建时间
      "updatedAt": "2018-12-27T08:22:56.792Z"  //更新时间
    }
}
```
* [v-html](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML)
#### 自己写的代码(没有markdown转换语法,用户头像跳转到用户页面也没有完善,用户名字也没有修改)
* Detail目录下的template.js
```js
import blog from '@/api/blog'

export default {
    data () {
      return {
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
  }
```
* Detail目录下的template.vue
```js
<template>
  <div id="detail">
    <section class="user-info">
      <!-- 这里的avatar,username,title,content,updatedAt都是该组件data里面的数据 -->
      <img :src="avatar" :alt="username" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link to="/user">若愚</router-link> {{updatedAt}}</p>
    </section>
    <!-- 通过v-html是把字符串转换为html -->
    <section class="article" v-html="content">
      {{content}}
    </section>

  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
```
#### 完善详情页的老师的代码基础上修改
* 转换markdown的依赖，安装[markded](https://www.npmjs.com/package/marked)
```sh
npm install marked
```
* 这里用了[v-html](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML)就可以不用在里面写`{{rawContent}}`,另外,因为有可能user（用户）不存在，所以需要判断一下，Detail目录下的template.vue
```html
<template>
  <div id="detail">
    <section class="user-info">
      <!-- 这里的avatar,username,title,content,updatedAt都是该组件data里面的数据 -->
      <!-- 有可能user不存在，所以需要判断一下 -->
      <img :src="user?user.avatar:'用户信息不存在'" :alt="user?user.username:'用户信息不存在'" title="user?user.username:'用户信息不存在'" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="user?`/user/${user.id}`:'user'">{{user?user.username:'用户不存在'}}</router-link>发布于 {{createdAt}}</p>
    </section>
    <!-- 通过v-html是把字符串转换为html,这里面可以省掉{{rawContent}} -->
    <section class="article" v-html="markdown">
      <!-- {{rawContent}} -->
    </section>
  </div>
</template>
<script src="./template.js"></script>
<style src="./template.less" lang="less"></style>
```
* Detail目录下的template.js
```js
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
  }
```
#### 安装marked的问题
* 我在根目录下安装marked然后通过下面引入没问题
```js
import marked from 'marked'
```
* 但是我在blog-client目录安装markde通过下面引入就报错
```js
import marked from 'marked'
```
* 然后我通过修改引入路径就不报错了
```js
import marked from 'marked/lib/markde.js'
```
* 最后我又把**路径删除了，就不报错了，真奇怪**
* Detail目录下的template.js
```js
import marked from 'marked'
```
* markdown测试可以在序号64页面查看。
#### 发现一个用户信息(user)不存在导致的报错
* 经过测试博客id为1337的user（用户）信息不存在。其实还有挺多用户信息的不存在的。不止这一个。可能是后端没有保存好吧.所以我这里先增加一些判断,用[三元运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)判断用户存在在执行下面的操作
```html
    <figure class="avatar">
      <!-- <img :src="blog.user.avatar" :alt="blog.user.username"> -->
      <!-- <figcaption>{{blog.user.username}}</figcaption>  -->
      <!-- 因为后端返回的博客id为1337的user(用户)信息不存在为null，所以要判断 -->
      <img :src="blog.user?blog.user.avatar:'用户不存在'" :alt="blog.user?blog.user.username:'用户不存在'">
      <figcaption>{{blog.user?blog.user.username:'用户不存在'}}</figcaption> 
    </figure>
```
* 页码79的一篇博客写的比较多，可以测试markdown和html语法。路径为
```sh
http://localhost:8080/#/detail/503
```
#### 格式化时间
* 在helpers目录里面创建一个常用的封装方法——util.js，比如格式化时间的方法。
* [Date.prototype.getTime()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)方法返回一个时间的格林威治时间数值。也就是说该方法的返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数。
* [Date.now()](https://developer.cdn.mozilla.net/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now),该方法返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。
* [switch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch)将表达式的值与case子句匹配，并执行与该情况相关联的语句。
* [Math.floor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 返回小于或等于一个给定数字的最大整数。`Math.floor() === 向下取整`
* [Vue插件](https://cn.vuejs.org/v2/guide/plugins.html#ad),
  * [开发插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)——Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象.
  * [使用插件](https://cn.vuejs.org/v2/guide/plugins.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6),通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成.
  * 一个简单的Vue插件就是一个对象，这个对象里面有一个属性叫做install，它默认传递的参数第一个是Vue,第二个是options（主要是配置信息或者选项对象）
* 格式件时间代码及开发插件代码util.js，这里是用到分钟，小时，天，月和年。
```js
function friendlyDate(datsStr) {
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)//如果是对象就是自己，如果不是对象就new一个对象
    let time = dateObj.getTime()//方法的返回值一个数值，相对于设定的时间
    let now = Date.now()//该方法返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。
    let space = now - time//时间差
    let str = ''
  
    switch (true) {//注意每一个case后面都有一个冒号
      case space < 60000://1分钟内
        str = '刚刚'
        break
      case space < 1000*3600://1个小时内
        str = Math.floor(space/60000) + '分钟前'//Math.floor() === 向下取整
        break
      case space < 1000*3600*24://1天内
        str = Math.floor(space/(1000*3600)) + '小时前'
        break
      case space < 1000*3600*24*30://1个月内
        str = Math.floor(space/(1000*3600*24)) + '天前'
        break
      case space < 1000*3600*24*30*12://1年内
        str = Math.floor(space/(1000*3600*24*30)) + '个月前'
        break
      default:
        str = Math.floor(space/(1000*3600*24*30*12)) + '年前'
    }
    return str
  }
  
  export default {//Vue简单的插件,开发插件
    install(Vue, options) {
      Vue.prototype.friendlyDate = friendlyDate
    }
  }
```
* 在main.js里面使用插件，在写下下面的使用插件后，会调用helpers里面的util.js的install里面的方法，最终做的事情就是`Vue.prototype.friendlyDate = friendlyDate`,就是把friendlyDate这个函数变成Vue原型上面的一个属性（这个属性也叫作friendlyDate），**也就是每一个Vue实例都有一个friendlyDate这个方法**。
```js
import Util from '@/helpers/util'

Vue.use(Util)
```
* 最后我们就可以在Detail目录下面的tamplate.vue里面增加一句代码`{{friendlyDate(createdAt)}}`,就可以实现格式化这个时间啦。当然处理这里其他模板里面或者Vue实例里面都是可以使用friendlyDate这个方法的。
```html
    <p><router-link :to="user?`/user/${user.id}`:'user'">{{user?user.username:'用户不存在'}}</router-link>发布于 {{friendlyDate(createdAt)}}</p>
```
* 同样我们还可以在首页Index目录的template.vue里面增加`{{friendlyDate(blog.updatedAt)}}`
```html
  <h3>{{blog.title}} <span> {{friendlyDate(blog.updatedAt)}}</span></h3> 
```
* 如果后续还有其他的一些专门用于辅助处理的方法都可以放到util.js这个文件里面。
### user个人页面完善
#### 自己犯的错误，对于函数第一个参数居然都看花了
* **下面函数的第一个形参数是必须要传入的**，如果不传入可能会报错，**代码一多，我自己都看花了，第一个参数就是参数本身，第二个参数才是一个对象。**
```js
  getBlogsByUserId(userId, { page=1, atIndex } = { page: 1}) {//获取某个用户的博客列表，也是第一种函数换一种写法。
    return this.getBlogs({ userId, page, atIndex })
  },
```
#### 用到的API及代码说明
* 用[v-for](https://cn.vuejs.org/v2/guide/list.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-for)的时候，给key上面绑定唯一的一个值，这个后续Vue本身对这些元素进行操作的时候，可以更容易定位到某个元素。操作起来效率更高一些。
```html
      <router-link class="item" v-for="blog in blogs" :key="blog.id">
        <div class="date">
```
* 获取日期三个API
  * [Date.prototype.getMonth()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth),根据本地时间，返回一个指定的日期对象的月份，为基于0的值（0表示一年中的第一月）。
  * [Date.prototype.getDate()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate),根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）
  * [Date.prototype.getFullYear()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear),方法根据本地时间返回指定日期的年份
* 增加分页，跟首页index的分页是类似的。
* template.vue代码
```html
<template>
  <div id="user" >
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>
<script src="./template.js"></script>
<style lang="less" src="../My/template.less"></style>
```
* template.js代码
```js
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
          blog.getBlogsByUserId(this.$route.params.userId,{page:this.page})
          .then((res)=>{
            this.blogs=res.data
            this.$router.push({path:`/user/${this.user.id}`,query:{page:newPage}})
          })
        }
      }
  }
```
* 测试网址
```sh
http://localhost:8080/#/user/144?page=1
```
* **老师用的是[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)，我用的是[instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)**
* **老师的代码还存在刷新后高亮页码不保存在原来的页码的问题**,主要是缺少elementUI的`current-change`属性。**不过后面增加了**
* **老师用的是userId，我用的是user.id**
### 我的(my)页面
* 我的页面跟用户页面比较类似，**区别是**
  * 我的页面(my)多了一个头像和名字。
  * 我的页面(my)每篇博客多了编辑和删除按钮。
  * 用户(user)页面的路由上面有一个userId。不用登陆。
  * 我的(my)页面的路由是没有id的。他是我个人登陆者的信息。
* 用到Vue的[事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
* [vue中修饰符prevent相当于调用event.preventDefault()](https://blog.csdn.net/yang1393214887/article/details/104340630),vue中prevent修饰符相当于调用[event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)：event.preventDefault() 方法阻止元素发生默认的行为。比如：
  * 当点击提交按钮时阻止对表单的提交
  * 阻止以下 URL 的链接
  * 阻止a链接跳转
* [关于vue的.once .prevent .keycode修饰符们](https://blog.csdn.net/Tina_xubin/article/details/87649680)
* 因为在my这个路由下面肯定是登陆状态，因为不是登陆状态会默认跳转到需要你登陆的路由,这里有一个路由元信息meta.**这时候就可以去状态管理工具Vuex里面去获取用户的信息**。
```js
    {
      path: '/my',
      component: () => import('@/pages/My/template.vue'),
      meta:{requiresAuth:true}
    },    
```
* 通过mapGetter映射user信息，**用户信息从user里面获取，不需要从路由的id里面去获取了，并且分页点击的时候不需要user.id这个路由了，只需要一个`/my`路由**
```js
      this.$router.push({path:'/my',query:{page:newPage}})
      ...
      blog.getBlogsByUserId(this.user.id,{page:this.page})
```
* 完整的my目录下面的template.js代码为

#### 一个路由目录错误
* 在组件header.vue中路由原来错误的写成了
```html
    <router-link to="./login"><el-button>立即登录</el-button></router-link>
    <router-link to="./register"><el-button>注册账号</el-button></router-link>
```
* 这样在点击立即登陆或者注册账号的时候会从当前目录在增加一个路由,也就是说如果当前路由是
```sh
http://localhost:8080/#/detail
```
* 那么点击后会变成
```sh
http://localhost:8080/#/detail/login
```
* 但是我们是需要的是如下的路由
```sh
http://localhost:8080/#/login
```
* **所以这里要修改为不要当前目录，而是根目录下的的路由设置**
```html
    <router-link to="/login"><el-button>立即登录</el-button></router-link>
    <router-link to="/register"><el-button>注册账号</el-button></router-link>
```
* **老师在这里终于想起来增加`:current-page`字段来显示页码高亮了**。
#### 删除某个博客功能
* 我们可以把需要删除的博客的id在HTML标签中传入
*  删除的blog.id这个参数可以直接传入到函数onDelete里面去，如果不写那默认的参数是当前的事件
```html
      <!-- 因为是a链接，所以使用prevent阻止a链接的默认事件跳转 -->
      <!-- 删除的blog.id这个参数可以直接传入到函数onDelete里面去，如果不写那默认的参数是当前的事件 -->
      <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
```
#### 把onDelete异步.then的函数转换为async await类似同步函数
* 把onDelete异步.then的函数转换为[async await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)函数,这里还用到了这里用到了elementUi的[MessageBox 弹框组件](https://element.eleme.cn/#/zh-CN/component/message-box)
  * 异步的.then的onDelete函数
    ```js
        onDelete(blogId){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return blog.deleteBlog({ blogId})//老师这里前面加一个return不知道有什么用处。
              .then((res)=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
    ```
  * 转换为async await的onDelete函数
    ```js
        // 把上面的异步改成async try catch的类同步的样式
        async onDelete(blogId){
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
    ```
* 删除之后还需要把DOM删除掉，不然如果不刷新页面，删除的博客还可以看到。
* 可以通过过滤函数[Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)，这里把DOM重新筛选一下，删除的那个blogId跟除了它自己以外的其他的blog.id都不相同。**也就是不相同的都留下来，相同的就是已经删除掉的博客。**
```js
  // 这里把DOM重新筛选一下，删除的那个blogId跟除了它自己以外的其他的blog.id都不相同。也就是不相同的都留下来，相同的就是已经删除掉的博客。
  this.blogs=this.blogs.filter((blog)=>{return blog.id!==blogId})
```
#### 最后我的页面(my)的完整代码
* 最后的my目录里面template.vue代码为
```html
<template>
  <div id="user" >
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
        <div class="actions">
          <!-- 编辑路由需要展示对应的blogId -->
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <!-- 因为是a链接，所以使用prevent阻止a链接的默认事件跳转 -->
          <!-- 删除的blog.id这个参数可以直接传入到函数onDelete里面去，如果不写那默认的参数是当前的事件 -->
          <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
        </div>
      </router-link>
    </section>
    <section class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="../My/template.less"></style>
```
* 最后的my目录里面template.js代码为
```js
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
        this.page=parseInt(this.$route.query.page)||1//因为老师的代码是把page当做currentPage使用的，currentPage是不能是字符串。而我的代码是单独有使用currentPage这个变量,因为这里获取到的是字符串，要通过parseInt转换为数字
        // blog.getBlogsByUserId(this.$route.params.userId,{page:this.page})
        blog.getBlogsByUserId(this.user.id,{page:this.page})
        .then((res)=>{
          this.blogs=res.data
          this.page=res.page
          this.total=res.total
          this.currentPage=res.page//这是elementUi的当前页面的高亮显示
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
          blog.getBlogsByUserId(this.user.id,{page:this.page})
          .then((res)=>{
            this.blogs=res.data
            this.$router.push({path:'/my',query:{page:newPage}})
          })
        }
      }
  }
```
#### 修复一个我的(my)页面注销后头像还存在并报错的bug
#### 最主要的方式,注销后直接跳转到主页
* **最主要的方式**最好在components目录的header.vue组件里面在注销后直接跳转到主页
```js
    onLogout(){
      this.logout()
      this.$router.push({path:'/'})
    }
```
#### 辅助方式
##### 辅助方式1，使用v-if判断isLogin是否为true
* 就是在登陆后进入我的页面后点击注销，这时候我的(my)页面注销后头像还存在，**应该是不存在的状态**，所以我们要在注销后销毁这个头像跟这个名字。
* 可以通过Vuex里面的isLogin属性，当登陆的时候就是true，不登录状态就是false，刚好跟Vue里面的[v-if](https://cn.vuejs.org/v2/guide/conditional.html#v-if)配合。
* 在My目录下面的template.vue文件的第一个section增加`v-if="isLogin"`
```html
    <section class="user-info" v-if="isLogin">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
```
* 因为在store目录下面的auth.js里面报错了isLogin的数据信息
```js
const state={//类似于组件里面的data属性
    user:null,//用户信息
    isLogin:false//是否登录
}
const getters={//类似于组件里面的computed属性
    user:state=>state.user,
    isLogin:state=>state.isLogin
}
```
* 所以在My目录下面的template.js里面引入Vuex里面的isLogin
```js
      computed:{//所以后面需要用到的user的都从这里来获取
        ...mapGetters([
          'user',
          'isLogin'
        ])
      },
```
##### 辅助方式2，判断user是否存在在执行后面的代码
* 在My目录下面的template.vue里面
```html
    <section class="user-info">
      <img :src="user&&user.avatar" :alt="user&&user.username" class="avatar">
      <h3>{{user&&user.username}}</h3>
    </section>
```
* **上面的三个方法我全都做了**
### 完善edit编辑页面
* 和create页面信息很像，但是——当点击编辑后进入到编辑页面，应该已经获取到标题，内容，描述等信息，**而不是和create创建的路由一样是空的信息**。所以需要先获取到博客信息，然后把博客里面响应的信息赋值给对应的数据。
* 步骤
  * 先通过blog.getDetail({ blogId:this.blogId })获取博客数据
  * 在修改后，点击确认的时候执行函数onEdit()，这里面有`blog.updateBlog({ blogId:this.blogId },{ title:this.title, content:this.content, description:this.description, atIndex:this.atIndex })`
* v-model里面对应的信息和data里面的数据是相对应的。
* 具体代码,在Edit目录的template.js里面
```js
import blog from '@/api/blog'
import {Message} from 'element-ui'

export default {
    data () {
      return {
        title:'',
        description:'',
        content:'',
        atIndex:false,
        blogId:1
      }
    },
    created(){
      this.blogId=this.$route.params.blogId
      blog.getDetail({ blogId:this.blogId })
      .then((res)=>{
        this.title=res.data.title
        this.description=res.data.description
        this.content=res.data.content
        this.atIndex=res.data.atIndex
      })
    },
    methods:{
      onEdit(){
      blog.updateBlog({ blogId:this.blogId },{ title:this.title, content:this.content, description:this.description, atIndex:this.atIndex })
        .then((res)=>{
          console.log(2)
          // this.$message.success(res.msg)
          Message.success(res.msg)//或者可以直接写上面的this.$message，并且不用引用前面的import
          this.$router.push({path:`/detail/${res.data.id}`})//成功后跳转到某个博客的详情页面，成功后获取到res就是后端传来的数据，这个数据里面的data的id里面包括了是博客的id。
        })
      }
    }
  }
```
* 在在Edit目录的template.vue里面，相对于create创建页面，就是把创建改成了编辑。事件onCreate改成了onEdit。
```html
<template>
  <div id="edit">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" v-model="description"  :autosize="{ minRows: 2, maxRows: 6}"></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" v-model="content" :autosize="{ minRows: 4, maxRows: 30}"></el-input>
    <p class="msg">限30个字</p>
    <p>
        <label>是否展示到首页</label>
        <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button @click="onEdit">确定</el-button>
  </div>
</template>

<script src="./template.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./template.css"></style>
```
### 打包编译最后的代码发布到git hub
* 运行
```sh
npm run build
```
* 然后出现下面信息
```sh
$ npm run build

> blog-client@1.0.0 build D:\jirengu\github收集\Multiplayer Sharing blogs for Vue\blog-client
> node build/build.js

Hash: 2cb029c272376b04e1a5
Version: webpack 3.12.0
Time: 21269ms
                                                  Asset       Size  Chunks                   Chunk Names
    static/css/app.bf72b79b845eb7fcfd5872eec0815b03.css     238 kB      10  [emitted]        app
                static/fonts/element-icons.535877f.woff    28.2 kB          [emitted]    
                    static/js/0.cf001390a7a5d28ba7f9.js    1.51 kB       0  [emitted]        vendor-async
                    static/js/1.0f6389e495e01011ff55.js    32.9 kB       1  [emitted]    
                    static/js/2.642fca50938a22559c21.js    2.09 kB       2  [emitted]    
                    static/js/3.282944622f92996735d1.js    1.63 kB       3  [emitted]    
                    static/js/4.216e8b9eface79c002ac.js    1.95 kB       4  [emitted]    
                    static/js/5.32a72f10ce50b9b2aa68.js    1.55 kB       5  [emitted]    
                    static/js/6.84c11698c039c22a9815.js    1.82 kB       6  [emitted]    
                    static/js/7.9441b503b54fe1b5aedc.js    1.61 kB       7  [emitted]    
                    static/js/8.681c11bb0ea318a1ecf3.js    2.88 kB       8  [emitted]    
               static/js/vendor.d1129eeec91c050532f8.js     866 kB       9  [emitted]  [big]  vendor
                  static/js/app.2a6f045f975752670ef7.js    7.15 kB      10  [emitted]        app
             static/js/manifest.fa3c93be66024dc53f4f.js    1.66 kB      11  [emitted]        manifest
                 static/fonts/element-icons.732389d.ttf      56 kB          [emitted]    
static/css/app.bf72b79b845eb7fcfd5872eec0815b03.css.map     342 kB          [emitted]    
                static/js/0.cf001390a7a5d28ba7f9.js.map    4.52 kB       0  [emitted]        vendor-async
                static/js/1.0f6389e495e01011ff55.js.map     113 kB       1  [emitted]    
                static/js/2.642fca50938a22559c21.js.map    8.37 kB       2  [emitted]    
                static/js/3.282944622f92996735d1.js.map    9.65 kB       3  [emitted]    
                static/js/4.216e8b9eface79c002ac.js.map    8.81 kB       4  [emitted]    
                static/js/5.32a72f10ce50b9b2aa68.js.map    6.04 kB       5  [emitted]    
                static/js/6.84c11698c039c22a9815.js.map    7.29 kB       6  [emitted]    
                static/js/7.9441b503b54fe1b5aedc.js.map    6.76 kB       7  [emitted]    
                static/js/8.681c11bb0ea318a1ecf3.js.map    12.7 kB       8  [emitted]    
           static/js/vendor.d1129eeec91c050532f8.js.map    3.45 MB       9  [emitted]        vendor
              static/js/app.2a6f045f975752670ef7.js.map    39.7 kB      10  [emitted]        app
         static/js/manifest.fa3c93be66024dc53f4f.js.map    8.14 kB      11  [emitted]        manifest
                                             index.html  513 bytes          [emitted]    

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.

```
* 然后dist目录下面就更新了新的文件信息。
#### 工程化上传（window下面不能多命令操作，我的电脑测试了很多次）
* 我们可以在爬虫看package.json里面增加下面代码
```js
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "upload": "npm run build; cd dist; git init; git add .;git commit -am \"init\"; git remote add origin git@github.com:bomber063/Multiplayer-Sharing-blogs-for-Vue-dist-build.git; git push -f origin master;"
    // 1.npm run build打包。
    // 2.然后切换到dist目录.
    // 3. 因为如果执行npm run build会把dist目录下面的信息清空，那么git 项目会被删除，所以这里要初始化git init，
    // 4. 然后提交全部git add .到本地暂存区
    // 5. git commit -am \"init\",因为外面是引号，所以对引号进行转义。
    // 6. 推送来远程git remote add origin git@github.com:bomber063/Multiplayer-Sharing-blogs-for-Vue-dist-build.git
    // 7. git push -f origin master，这里用到-f，因为这里不是源码，是经过编译后的，产生覆盖也是应该的。但是源码上传就不要随便用-f
  },
```
* 这里用到了`git commit -am`,[git commit -m 与 git commit -am 的区别](https://www.cnblogs.com/caixiaoyou/p/9754874.html)
  * ![](https://img2018.cnblogs.com/blog/1379594/201810/1379594-20181008155314439-1925293344.png)
* 如果上传到git上面，因为路径是由仓库名字这个目录的，那么我们需要
```sh
https://bomber063.github.io/static/css/app.bf72b79b845eb7fcfd5872eec0815b03.css
```
* 比如我的仓库名字是**Multiplayer-Sharing-blogs-for-Vue-dist-build**。正确的git hub上面的部署应该是要上仓库名字**Multiplayer-Sharing-blogs-for-Vue-dist-build**
```
https://bomber063.github.io/Multiplayer-Sharing-blogs-for-Vue-dist-build/static/css/app.bf72b79b845eb7fcfd5872eec0815b03.css
```
* 我们通过查看dist目录下面的index.html文件里面的路径全都是**绝对路径**。可是部署到github上面就需要设置为**相对路径,也就是当前路径**了。
* 在config目录的index.js里面，通过修改    
```js
assetsPublicPath: './',//这里把绝对路径'/'修改为当前路径'./'
```
* 还需要把服务器的协议由http修改为https，因为github只允许https协议的服务器。
* 最后我有发现elementUi的icon图标却不能正常加载出来。.woff文件的请求都失败了。
经过查询[解决方案——element-ui icon 图标无法正常显示问题](https://blog.csdn.net/weixin_43778272/article/details/100091826)
```js
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        // 解决icon路径加载错误
        publicPath:'../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```
* **最后删除或注释掉多余的console.log和部分注释**
### 其他
* [KEYCODE列表](https://blog.csdn.net/lf12345678910/article/details/90407644)
* [vue,打包完以后出现的问题，element的icon图标找不到，文件，图片路径问题等](https://blog.csdn.net/qq_41619796/article/details/91806545)
* [Windows下如何一次运行多个命令](https://blog.csdn.net/skykingf/article/details/11992351)，不过我觉得这个方式在windows 10系统感觉不太行。
* [fatal: remote origin already exists.解决方法](https://www.jianshu.com/p/3380ec281729)
* [npm报错 This is probably not a problem with npm,there is likely additional logging output above可能的原因](https://www.cnblogs.com/muxi0407/p/11833317.html)
* [Git master branch has no upstream branch的解决](https://blog.csdn.net/benben_2015/article/details/78803753)
* [git ------ fatal: No configured push destination. Either specify the URL from the command-line or co](https://blog.csdn.net/COCOLI_BK/article/details/97921497)
* [git commit -m VS git commit -am](https://www.cnblogs.com/yan89/p/11584937.html)
* [git commit -m vs. git commit -am](https://stackoverflow.com/questions/19877818/git-commit-m-vs-git-commit-am)
* [配置package.json 使一次npm run start 执行两个指令或者多个指令](https://blog.csdn.net/div_ma/article/details/80579227)
* [fatal: remote origin already exists - GitHub](https://stackoverflow.com/questions/20564462/fatal-remote-origin-already-exists-github)
* [git commit -am](https://explainshell.com/explain?cmd=git+commit+-am)
* [npm run 同时执行多个命令](https://www.cnblogs.com/kdcg/p/11715083.html)