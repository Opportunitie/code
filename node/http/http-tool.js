let http = require('http')
const { Server } = require('node:http')
let qs = require('querystring')
// 实用node库，superagent 
// 类似axios
// 方法有get,post,put,del,head
let request = require('superagent')
request.get('url').set('ContentType','text/plain').send({q:'qwer'}).end()

// 实用node库 up

module.exports  =http.createServer(function(req,res){
    res.writeHead(200);
    res.end('DONE')
})

// $ up -watch -port 80 server.js