#!/usr/bin/node 
var fs = require('fs');
var http = require('http');

var conf = JSON.parse(fs.readFileSync("config.json","utf8"));

console.log(conf); 
exports.index = function(req, res){
  res.render('index', { title: 'おっちゃん！' });
};

/** 
 *  return css or converted less
 */
var less = require('less');
exports.less = function(req, res){
  res.setHeader('Content-Type', 'text/css');
  var name = req.params.name;
  var parser = new(less.Parser)({
    paths : [conf.less_directory]
  })
  var data = fs.readFileSync(conf.less_directory +"/"+ name);
  parser.parse(data.toString(),function(error,tree){
    var css = tree.toCSS({});
    res.send(css);
  })
};

/**
 *  return client source
 */
exports.client = function(req,res){
  var host = "localhost";
  var port = 8910;
  var option = {host : host,
                port : port,
                path : "/socket.io/socket.io.js",
                method : "GET"}
  var source ="";
  var reloader = fs.readFileSync("app/public/js/socket.js");
  //socket.io.jsのソースを取得
  http.get(option, function(_response){
    var body = ""
    _response.on('data', function(data) {
      body += data;
    });
    _response.on('end', function() {
      source += body;
      source += reloader;
      res.send(source);
    });
  });
}