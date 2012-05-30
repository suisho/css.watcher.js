var http = require("http");
var fs = require('fs');
var url = require('url');
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
    res.end(view(params));
  }).listen(port);
};

//index page
exports.indexView = function(){
  var tpl = fs.readFileSync("./server/index.html");
  return tpl;
};

//css page
exports.cssView = function(params){
  var name = params[1];
  console.log(exports.config.directory);
  return "css"+name;
};

//error page
exports.errorView = function(){
  return "error";
};