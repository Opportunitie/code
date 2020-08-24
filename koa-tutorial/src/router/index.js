// 路由配置
const router = require('koa-router')()

const HomeController = require('../controller/home')


module.exports = () => {
    router.post('/user/register', HomeController.Home)
}

app.use(router.routes()).use(router.allowedMethods())