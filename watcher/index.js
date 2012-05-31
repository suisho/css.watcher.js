var fs = require('fs');
var wt = require('fs-watch-tree').watchTree;
var it = require('./import_tree');
var importTree = new it.ImportTree();
exports.directory = null;
exports.changeCallback = function(){};
exports.start = function(){
  wt(this.directory,{},function(event){
    if(event.isDirectory()){
      return;
    }
    if(event.isDelete()){
      return;
    }
    try{
      change(event.name);
    }catch(e){
      console.log(e);
    }
  });
}

function change(file){
  var a = fs.readFileSync(event.name,'utf8');
  exports.changeCallback(file);
}