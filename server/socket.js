var socket_io = require('socket.io');
var io;

exports.socket = null;
exports.init = function(port){
  io = socket_io.listen(8911);
  io.set("origin","*");
  io.sockets.on('connection', function (socket) {
    exports.socket = socket;
    socket.broadcast.emit('init', { hello: 'world' });
  });
}

//とりあえずデータは飛んでるけどもこのやり方で良いのか不明
exports.lessChange = function(file){
  if(exports.socket){
    exports.socket.emit('less_refresh', { file : file });
  }
} 