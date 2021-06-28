// 分段读取文件
// let fs = require("fs");
let stream = fs.createReadStream(__dirname + '/test.json')
stream.on('data',function(chunk){
  console.log(chunk);
  // 处理部分文件内容
})

stream.on('end',function(chunk){
  console.log('11',chunk);
  // 文件读取完毕
})