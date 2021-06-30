let http = require('http')
let qs = require('querystring')

function send(theName){
    http.request({
        host: '127.0.0.1',
        port: 3000,
        url: '/',
        method: 'POST'
    },
    function(res){
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            console.log('\n' + " " + chunk);
        })
        
        res.on('end',function(){
            console.log('\n \033[90m request complete! \033[39m');
            process.stdout.write('\n your name:')
        })

        res.on('error',function(err){
            console.log(err.message);
        })
    }
    ).end(qs.stringify({name: theName}))
}

process.stdout.write('\n your name:')
process.stdin.resume(); // 读取数据
process.stdin.setEncoding('utf8')
process.stdin.on('data',function(data){   // 读取数据
    send(data.replace('\n', ''))
})