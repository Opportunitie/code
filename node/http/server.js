let http = require('http')
let qs = require('querystring')

http.createServer(function(req,res){
    let body = ""
    req.on('data',function(chunk){
        req.setEncoding('utf8')
        body += chunk
    })
    req.on("end",function(){
        res.writeHead(200)
        res.end('Done')
        console.log(`got name ${qs.parse(body).name}\n`);
    })
}).listen(3000)