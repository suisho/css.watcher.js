//socket
var socket_io = require('socket.io');
var io = null;

exports.lessChange = function(){
  console.error("this function is not prepare");
};

exports.listen = function(server){
  console.log("listen socket");
  io = socket_io.listen(server);
  io.set("origin","*");
  io.sockets.on('connection', function (socket) {
    console.log("aaaa");
    socket.broadcast.emit('init', { hello: 'world' });
    //add lessChange function
    exports.lessChange = function(file){
      socket.emit('less_refresh', { file : file });
    }
  });
}
