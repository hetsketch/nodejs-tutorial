'use strict';
//можем также подключить json файл, если это требуется
let db = require('../db');
//connect() не нужен

let logger = require('logger')(module);

function User(name) {
  this.name = name;
}

User.prototype.hello = function (cur) {
  logger(db.getPhrase("Hello") + ", " + this.name);
};

//помещаем нашего User'a в объект exports
// exports.User = User;

//если записать так, то получим только функцию User
module.exports = User;

//global
// global.User = User;

//выводим объект module, в котором содержится информация
//о модуле
// console.log(module);