var fs = require('fs');
var wt = require('fs-watch-tree').watchTree;

exports.directory = null;

exports.start = function(){
  wt(this.directory,{},function(event){
    if(event.isDirectory()){
      return;
    }
    if(event.isDelete()){
      return;
    }
    var a = fs.readFileSync(event.name,'utf8');
    console.log(event);
  });
}
