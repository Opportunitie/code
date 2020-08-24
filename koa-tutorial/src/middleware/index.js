// 管理各个中间件
const path = require('path')
const bodyPaser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
// 引入 koa-static
const staticFiles = require('koa-static')
const miSend = require('./mi-send')
const miHttpError = require('./mi-http-error')
const { isPrimitive } = require('util')


module.exports  = (app) => {

app.use(miHttpError())

app.use(miLog({
    env: app.env,
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    severIp: ip.address()
}))
// 指定public目录为静态资源目录，用来存放js css images 等
app.use(staticFiles(path.resolve(__dirname, "./pablic")))

app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '/layout.html'), // 指点视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防xss
    }
}))

app.use(bodyPaser())
app.use(miSend())

// 增加错误的监听处理
app.on('error', (err, ctx) => {
    if(ctx && !ctx.headerSent && ctx.status < 500){
        ctx.status = 500
    }
    if(ctx && ctx.log && ctx.log.errro){
        if(!ctx.state.logged){
            ctx.log.error(err.stack)
        }
    }
})
}


