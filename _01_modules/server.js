'use strict';
//в nodejs каждый модуль независим, то есть нельзя получить доступ к переменным и функциям
//одного модуля из другого. Для этого используется объект exports в том модуле, функционал которого
//хотим предоставить

//если нужна глобальная переменная, то вместо exports пишем global, то есть самы верхний элемент
//но так обычно не поступают
let User = require('./user');
//подключили модуль
// let db = require('./db');
//можно писать так, но тогда нужно добавить в NODE_PATH=.
let db = require('db');
//инициализировали его, он закешировался, больше инициализации не требуется
db.connect();


//with global var
// let petya = new User("Петя");

function run() {
  //simple require

  // let petya = user.User("Петя");
  //теперь может писать так из-за того что module.exports = User;
  let petya = new User("Петя");
  console.log("User is required!");
  petya.hello();
  console.log(db.getPhrase("Run successful"));
}

//module.parent говорит нам какой модуль использует текущий
//так делают, если нужно импортировать модуль как часть чего-то
if (module.parent) {
  exports.run = run;  
} else {
  run();
}


