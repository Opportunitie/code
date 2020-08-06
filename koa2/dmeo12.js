// 静态资源访问
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './src/static'

app.use(static(path.join(__dirname,staticPath)))

app.use( async (ctx) => {
    ctx.body = 'Hello World'
})

app.listen(3000, () => {
    console.log('servet is starting at port 3000')
})