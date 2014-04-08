var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 8888);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './', listing: true, index: true }
    }
});

// Start the server
server.start(function () {
    uri = server.info.uri;
    console.log('Server started at: ' + server.info.uri);
});
