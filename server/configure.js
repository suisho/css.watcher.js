var config = {}

exports.init = function(object){
  config = object;
};

exports.get = function(key){
  return config[key];
};

exports.set = function(key,value){
  config[key] = value;
}
