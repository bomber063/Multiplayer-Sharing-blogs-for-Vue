## 多人共享博客
## 首先做测试
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
* 这里要运行下面代码命令必须要全局安装一个插件`@vue/cli-init`，具体见[这里](https://blog.csdn.net/qq_42429367/article/details/105616392)
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