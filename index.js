var conf = {
  "directory" : "./debug/less/"
};

//start server
var app = require("./app/app.js");
app.listen(8910,function(){
  console.log("start server");
});

