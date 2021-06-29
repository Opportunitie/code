let net = require('net')
let count = 0
let user = {};
let server = net.createServer(function (conn) {
    // conn.write('11')
    count++
    conn.setEncoding('utf8')

    conn.on('data', function (data) {
        console.log('data', data);
    })

    conn.on('close', function () {
        count--
    })
})

server.listen(3000, function () {
    console.log('server listening on :3000');
})