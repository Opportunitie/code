// 监听文件发生变化
let fs = require('fs')
let stream = fs.createReadStream(__dirname + '/test.json')
let files = fs.readdirSync(process.cwd())

files.forEach(function(file){
  if(/\.json/.test(file)){
    fs.watchFile(process.cwd()+'/'+file,function(){
      console.log(' - '+ file +'changed!');
    })
  }
})