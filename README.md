### vue-ssr-todo
vue + ssr 打造的todolist

### 预览地址
http://todo.shanshihao.cn

### 使用方法
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目

生产环境：
```
npm run build
npm run start
```

生产环境使用pm2：
pm2 start pm2.yml --env production

#### 技术栈
*  axios 负责客户端和服务端请求
*  eslint 代码检测
*  koa-body 负责处理请求body
*  koa-send 负责转发静态资源
*  koa-session 负责用cookie记录session 简化鉴权 [从koa-session中间件源码学习cookie与session](https://segmentfault.com/a/1190000012412299)
*  nodemon 实现node服务监听重启
*  pm2 管理node进程
*  concurrently 并行启动多个npm script
*  七牛云上传cdn （ [上传方式源码](https://github.com/sl1673495/vue-ssr-todo/blob/master/build/upload.js)）
*  apicloud 云数据库服务
