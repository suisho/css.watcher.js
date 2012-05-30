var server = require("./server");
var conf = {
  "directory" : "./test/less/"
};
server.setConfig(conf);
server.startServer(8910);