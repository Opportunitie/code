// 模板引擎
const Koa = require('koa')
const views = require('koa-views');
const path = require('path')

const app = new Koa()

app.use(views(path.join(__dirname,'./src/view'), {
    extension: 'ejs'
}))

 app.use( async (ctx) => {
     let title = 'Hello wangxiao'
     await ctx.render('index.ejs',{title})
 })
app.listen(3000, () => {
    console.log('servet is starting at port 3000')
})