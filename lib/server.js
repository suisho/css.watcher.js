"use strict";
var http = require("http");
var fs = require('fs');
var url = require('url');

//server起動
exports.startServer = function(port){
  http.createServer(function(req, res){
    //routing
    //todo: routing
    var parsed = url.parse(req.url);
    var view;
    switch(parsed.pathname){
      case "/":
        view = exports.indexView;
        break;
      case "/css":
        view = exports.cssView;
        break;
      default:
        view = exports.errorView;
        break;
    }
    res.end(view());
  }).listen(port);
};

/**
 * indexページを返す
 */
exports.indexView = function(){
  var tpl = fs.readFileSync("./lib/index.html");
  return tpl;
}

exports.cssView = function(){
  return "css";
}

exports.errorView = function(){
  return "error";
}