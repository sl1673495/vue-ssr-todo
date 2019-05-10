### vue-ssr-todo
vue + ssr 打造的todolist

# 使用方法
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

#### 技术栈
*  axios负责客户端和服务端请求
*  koa-body 负责处理请求body
*  koa-send 负责转发静态资源
*  koa-session 负责用cookie记录session 简化鉴权 [从koa-session中间件源码学习cookie与session](https://segmentfault.com/a/1190000012412299)
*  七牛云上传cdn （ [上传方式源码](https://github.com/sl1673495/vue-ssr-todo/blob/master/build/upload.js)）
*  apicloud 云数据库服务
