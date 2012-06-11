// reloader
var socket = io.connect('http://localhost:8910');
socket.proceceed = {}
socket.on('less_refresh', function (data) {
  var links = document.getElementsByTagName("link");
  var num = links.length;
  if(socket.proceceed[data.time]){
    return;
  }
  console.log(data);
  socket.proceceed[data.time] = true;
  for(var i=0; i< num; i++){
    var link = links[i];
    var clone = link.cloneNode();
    var version = (new Date()).getTime();
    var baseUrl = link.href.split("?")[0];
    var queries = {};
    
    var href = buildUrl(link.href,version);
    link["data-version"] = "old";
    link["data-url"] = baseUrl;
    clone["data-version"] = "clone";
    clone["data-url"] = baseUrl;
    
    clone.setAttribute("href", href );
    clone.onload = function(){
      var removeCss = getCss(this["data-url"],"old");
      if(removeCss){
        removeCss.parentNode.removeChild(removeCss);
      }else{
        //console.log(this);
      }
    }
    //clean();
    document.getElementsByTagName('head')[0].appendChild(clone);
  }
  
  
  function buildUrl(url,version){
    var urlSplit = link.href.split("?") || [];
    var q = urlSplit[1] || "";
    var params = q.split("&") || [];
    var queries = {}
    for(var i=0; i < params.length ; i++){
      if(params[i] ){
        var kv = params[i].split("=");
        queries[kv[0]] = kv[1];
      }
    }
    
    queries["_v"] = version;
     
    var result = urlSplit[0]+"?";
    for(var k in queries){
      if(queries[k]){
        result += k + "=" + queries[k];
      }else{
        result += k;
      }
    }
    
    return result;
  }
  
  function clean(){
    var links = document.getElementsByTagName("link");
    for(var i=0; i< links.length; i++){
      var link = links[i];
      if(link["data-version"] == "old"){
        link.parentNode.removeChild(link);
      }
    }
  }
  
  function getCss(url, version){
    var links = document.getElementsByTagName("link");
    for(var i=0; i< links.length; i++){
      var link = links[i];
      if(link["data-url"] === url && link["data-version"] == version){
        return link;
      }
    }
    return null;
  }
});