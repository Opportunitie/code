const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

let home = new Router()
home.get('/wangxiao', async (ctx) =>{
    ctx.body =  'home page'
}).get('/todo', async (ctx) =>{
    ctx.body =  'home todo page'
})

let page = new Router()
page.get('/wangxiao', async (ctx) =>{
    ctx.body =  'page page'
}).get('/todo', async (ctx) =>{
    ctx.body =  'page todo page'
})
// 父级路由
let router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())





app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('starting at port 3000')
})
