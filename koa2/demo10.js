// 存放cookie
const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
  if (ctx.url === '/index') {
    ctx.cookies.set('MyName', 'wangxiao', {
      domain: 'localhost',
      path: '/index',
      maxAge: 1000 * 60 * 24,
      expires: new Date('2020-08-05'),
      httpOnly: false,
      overwrite: false
    })
    ctx.body = 'Cookie is ok '
  } else {
    if (ctx.cookies.get('MyName')) {
      ctx.body = ctx.cookies.get('MyName')
    } else {
      ctx.body = 'Hello World'
    }
  }
})
app.listen(3000, () => {
  console.log('servet is starting at port 3000')
})
