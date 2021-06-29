let http = require('http')

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type": "text/html"})
    res.write('Hello')
    setTimeout(function(){
        res.end("Hello World!")
    },1000)
    
}).listen(3000)