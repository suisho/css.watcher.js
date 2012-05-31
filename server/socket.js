var socket_io = require('socket.io');
var io;

exports._socket;
exports.init = function(port){
  io = socket_io.listen(8911);
  io.set("origin","*");
  io.sockets.on('connection', function (socket) {
    exports._socket = socket;
    socket.broadcast.emit('init', { hello: 'world' });
  });
}

//とりあえずデータは飛んでるけども・・・
exports.lessChange = function(file){
  exports._socket.emit('less_refresh', { file : file });
  /*io.sockets.on('connection', function (socket) {
    console.log("file");
    socket.broadcast.emit('less_refresh', { file : file });
  });*/
} 