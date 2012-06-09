//socket
var socket_io = require('socket.io');

var io = null;
exports.lessChange = function(file){
  io.sockets.emit('less_refresh', { file : file , time : new Date()});
};

exports.listen = function(server){
  console.log("listen socket");
  io = socket_io.listen(server);
  io.set("origin","*");
  io.set("log level",2);
  io.sockets.on('connection', function (socket) {
    //socket.emit('init', { hello: 'world' });
  });
}
