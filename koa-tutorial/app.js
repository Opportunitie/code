const Koa = require('koa')
const path = require('path')
const bodyPaser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')

const router = require('./router')

const app = new Koa()

app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '/layout.html'), // 指点视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防xss
    }
}))

app.use(bodyPaser())

router(app)

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})