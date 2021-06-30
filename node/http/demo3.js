let fs = require('fs')
let http = require('http')
let qs = require('querystring')

http.createServer(function (req, res) {
    if ("/" === req.url) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <form action="/url" method="POST">
            <h1>My form</h1>
            <label>Personal information</label>
            <p>What is your name?</p>
            <input type="text" name="name">
            <p><button>Submit</button></p>
        </form>
        `)
    }else if('/url' === req.url && "POST" === req.method){
        let body = ""
        req.setEncoding('utf8')
        req.on("data",function(chunk){
            console.log('chunk',chunk);
            body += chunk;
        })
        req.on("end",function(){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<p>Your name is <b>${qs.parse(body).name}</b></p></p>`)
        })
    }else{
        res.writeHead(404)
        res.end('Not Found')
    }

}).listen(3000)
