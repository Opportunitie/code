const Koa = require('koa')
const bodyparser = require('koa-bodyparser') // 解析请求参数中间件

 const app = new Koa()

 app.use(bodyparser())

 app.use( async (ctx) => {
    if(ctx.url === '/' && ctx.method === 'GET'){
        // 显示表单页面
        let html = `
        <h1>wangxiao koa2 request post</h1>
        <form method="POSt" action= "/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>age</p>
            <input name="age" /> <br/>
            <p>website </p>
            <input name="webSite" /> <br/>
            <button type="submit">submit</button>
        </form>
        `
        ctx.body = html
    }else if(ctx.url === '/' && ctx.method === 'POST'){
        let postData  = ctx.request.body
        ctx.body = postData
    }else{
        ctx.body = '<h1>404</h1>'
    }
 })
app.listen(3000, () => {
    console.log('servet is starting at port 3000')
})