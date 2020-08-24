// 业务逻辑
const HomeService = require('../service/home')

const Home = async (ctx, next) =>{
    let { name, password } = ctx.request.body
    if(name === 'ikcamp' && password == '123456'){
        ctx.response.body = `Hello, ${name}`
    }else{
        ctx.response.body = '账号信息有误'
    }
}

const Register = async (ctx, next) =>{
    let { name, password } = ctx.request.body
    let data = await HomeService.register(name, password)
    ctx.response.body = data
}

const Login = async (ctx, next) =>{
    await ctx.render('home/login', {
        btnName: 'GoGoGo'
    })
}
module.exports =  {
    Home,
    Register,
    Login
}