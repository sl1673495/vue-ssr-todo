const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

const USER_NAME = 'ssh'
userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === USER_NAME && user.password === '123') {
    ctx.session.user = {
      username: USER_NAME
    }
    ctx.body = {
      success: true,
      data: {
        username: USER_NAME
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: '用户名或密码错误。'
    }
  }
})

module.exports = userRouter
