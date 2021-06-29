let fs = require('fs')
let http = require('http')

http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type":"image/jpg"});
    console.log('aaa');
    let stream = fs.createReadStream('D:/project/code/assets/image/testPhoto/zhongqiu.jpg')
    console.log('bbb',stream);
    stream.on('data',function(data){
        console.log(data);
        res.write(data)
    })
    stream.on('end',function(){
        res.end()
    })
}).listen(30000)


// 流的思想

// http.createServer(function(req,res){
//     res.writeHead(200, {"Content_Type":"image/png"});
//     let stream = fs.createReadStream('image.png')
//     stream.pipe(res)
// }).listen(30000)