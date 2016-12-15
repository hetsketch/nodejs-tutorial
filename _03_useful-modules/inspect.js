//этот модуль позволяет красиво выводить объекты
var util = require('util');

var obj = {
  a: 5, 
  b: 12,
  //если у объекта есть метод inspect, то он вызовется автоматически
  //при вызове util.inspect(obj) или просто console.log(obj), т.к.
  //console.log вызывает inspect автоматически
  inspect: function () {
    return "Hello";
  }
};
obj.self = obj;

// console.log(util.inspect(obj));
//run automatically
console.log(obj);
