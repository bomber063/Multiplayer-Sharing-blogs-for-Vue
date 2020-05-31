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