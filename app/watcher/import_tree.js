/**
 *  @importの関連性を保つ
 */
var ImportTree = function(){};
ImportTree.prototype = {
  hash : {},
  /**
   *  from importする側
   *  to importされる側
   */
  push : function(from,to){
    var r = [];
    if(this.hash[from]){
      r = this.hash[from];
    }
    r.push(to);
  },
  set : function(from,toList){
    this.hash[from] = toList;
  },
  /** @returns Array*/
  get : function(from){
    return this.hash[from];
  },
  getChildren : function(parent){
    var _children = {};
    for(var from in this.hash){
      if(this.get(from).indexOf(parent) < 0){
        continue;
      }
      _children[from] = 1;
    }
    var children = [];
    //重複除去
    for(var _c in _children ){
      children.push(_c);
    }
    return children;
  },
  getDescendant : function(parent){
    var children = [];
    var _c = [parent];

    do{
      for(var j=0; j < _c.length;j++){
        var _children = this._getChildren(_c[j]);
        for(var i=0; i< _children.length; i++){
          if(children.indexOf(_children[i])){
            throw (new Error); //重複エラー
          }
          children.push(_children[i]);
        }
      }
    }while(_c.length == 0)
    
    return children;
  }
}
exports.ImportTree = ImportTree;

