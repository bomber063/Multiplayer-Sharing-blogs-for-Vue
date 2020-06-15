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