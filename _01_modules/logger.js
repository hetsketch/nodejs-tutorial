'use strict';

//модуль фабрика
module.exports = function (module) {
  return function (/*...*/) {
    //делаем из arguments обычный массив и добавляем ему module.filename
    var args = [module.filename].concat([].slice.call(arguments));
    console.log.apply(console, args);
  }
}