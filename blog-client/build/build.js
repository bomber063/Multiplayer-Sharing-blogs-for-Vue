'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'//告诉当前环境是production

const ora = require('ora')//loading状态
const rm = require('rimraf')//删除
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
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
