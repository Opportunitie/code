let net = require('net')
let client = net.connect(6667, 'irc.freenode.net', function(){

})
client.setEncoding('utf8')