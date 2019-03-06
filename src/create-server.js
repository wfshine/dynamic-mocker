//var opn = require('opn');
var fs = require('fs')

module.exports = function createServer(isHttps, port, onHandle) {
    port = parseInt(port, 10)
    var server;
    if (!isHttps) {
        var http = require('http');
        server = http.createServer(onHandle).listen(port);
    }
    else {
        if (port == '80') port = 443;
        var http = require('https');
        var options = {
            key: fs.readFileSync(__dirname + '/../ssl/server.key'),
            ca: [fs.readFileSync(__dirname + '/../ssl/ca.crt')],
            cert: fs.readFileSync(__dirname + '/../ssl/server.crt')
        };
        server = http.createServer(options, onHandle).listen(port);
    }
    var url = 'http' + (isHttps ? 's' : '') + '://localhost:' + port;
    console.log('dynamic-mocker running at  => ' + url + '/\n   ' + '\nCTRL + C to shutdown');
    //opn(url)
    return server
}