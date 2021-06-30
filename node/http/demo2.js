let fs = require('fs')
let http = require('http')

// http.createServer(function(req,res){
//     res.writeHead(200, {"Content-Type":"image/jpg"});
//     let stream = fs.createReadStream('zhongqiu.jpg')
//     stream.on('data',function(data){
//         res.write(data)
//     })
//     stream.on('end',function(){
//         res.end()
//     })
// }).listen(3000)


// 流的思想

http.createServer(function(req,res){
    res.writeHead(200, {"Content_Type":"image/png"});
    let stream = fs.createReadStream('../../assets/image/testPhoto/zhongqiu.jpg')
    stream.pipe(res)
}).listen(3000)