var watcher = require('./watcher');

var server = require("./server");

var conf = {
  "directory" : "./debug/less/"
};

server.setConfig(conf);
server.startServer(8910);

//var watcher = new Watcher(conf.directory);
watcher.directory = conf.directory;
watcher.changeCallback = function(file){
  socket.lessChange(file);
}
watcher.start();