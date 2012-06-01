
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var adapter = require('./adapter/hogan-express.js');
var hogan = require('hogan.js');
var fs = require('fs');
var app = module.exports = express.createServer();
var conf = JSON.parse(fs.readFileSync("config.json","utf8"));

// Configuration

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
  app.set('view options',{layout: false});
  app.set('views', __dirname + '/views');
  // use hogan (extension is html)
  app.set('view engine', 'html');
  app.register('html',adapter.init(hogan));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/less/:name', routes.less);
app.get('/client.js', routes.client);
app.get('/', routes.index);

var socket = require("./socket.js");
socket.listen(app);

//var watcher = new Watcher(conf.directory);
var watcher = require('./watcher');
watcher.directory = conf.less_directory;
watcher.changeCallback = function(file){
  socket.lessChange(file);
}
watcher.start();