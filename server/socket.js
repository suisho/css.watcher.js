var socket_io = require('socket.io');
exports.init = function(){
  var io = socket_io.listen(8911);
  io.sockets.on('connection', function (socket) {
    socket.emit('less_refresh', { hello: 'world' });
    socket.on('my other event', function (data) {
      ////console.log(data);
    });
  });
}