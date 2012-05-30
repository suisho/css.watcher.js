var http = require("http");
var fs = require('fs');
var url = require('url');
var less = require('less');
exports.config = {};

exports.setConfig = function(config){
  exports.config = config;
}

//server起動
exports.startServer = function(port){
  console.log("start server");
  http.createServer(function(req, res){
    var router = {
      '\/css\/(.*)' : exports.cssView,
      '\/?' : exports.indexView
    };
    //routing
    //todo: routing切り離し
    var parsed = url.parse(req.url);
    var view = undefined;
    var params = [];
    for(var rule in router){
      var regex = new RegExp(rule);
      if(regex.test(parsed.pathname)){
        view = router[rule];
        params = parsed.pathname.toString().match(regex);
        break;
      }
    }
    if(view === undefined){
      view = exports.errorView;
    }
    //渡す値はオブジェクト化したい
    view(req,res,params);
  }).listen(port);
};

//index page
exports.indexView = function(req,res){
  var tpl = fs.readFileSync("./server/index.html");
  res.end(tpl);
};

//css page
exports.cssView = function(req,res,params){
  var name = params[1];
  var parser = new(less.Parser)({
    paths : [exports.config.directory]
  })
  var data = fs.readFileSync(exports.config.directory + name);
  parser.parse(data.toString(),function(error,tree){
    var css = tree.toCSS({});
    res.end(css);
  })
};

//error page
exports.errorView = function(req,res,param){
  return req.end("error");
};