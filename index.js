var watcher = require('./watcher');

var server = require("./server");
var socket = require("./server/socket.js");
var conf = {
  "directory" : "./debug/less/"
};

server.setConfig(conf);
server.startServer(8910);
socket.init(8911);

//var watcher = new Watcher(conf.directory);
watcher.directory = conf.directory;
watcher.changeCallback = function(file){
  socket.lessChange(file);
}
watcher.start();