
var server = require("./server");
var socket = require("./server/socket.js");
var conf = {
  "directory" : "./test/less/"
};
server.setConfig(conf);
server.startServer(8910);
socket.init(8911);