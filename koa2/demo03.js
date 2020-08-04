const Koa = require('koa')
 const app = new Koa()
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
        let postData  =await parsePostData(ctx)
        ctx.body = postData
    }else{
        ctx.body = '<h1>404</h1>'
    }
 })
 function parsePostData(ctx){
     return new Promise((resolve, reject) =>{
         try{
             let postData = ""
             ctx.req.addListener('data', (data) =>{
                 postData += data
             })
             ctx.req.on('end', () => {
                 let parseData = parseQueryStr(postData)
                 resolve(parseData)
             })
         }catch(error){
             reject(error)
         }
     })
 }
 function parseQueryStr(queryStr){
     let queryData = {}
     let queryStrList = queryStr.split('&')
     console.log(queryStrList)
     for(let queryStr of queryStrList){
         let itemList = queryStr.split('=')
         queryData[itemList[0]] = decodeURIComponent(itemList[1])
     }
     console.log(queryData)
     return queryData
 }
app.listen(3000, () => {
    console.log('servet is starting at port 3000')
})