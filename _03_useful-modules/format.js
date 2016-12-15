var util = require('util');

//функция format форматирует строку)) и подставляет значения из аргументов
//%d - число, %s - строка, %j - json
//в консоле util.format работает автоматически
var str = util.format("My name is %s. I'm %d years old + %j", "Alex", 22, {gender:"male", height:185});
console.log(str);
//the same
console.log("My name is %s. I'm %d years old + %j", "Alex", 22, {gender:"male", height:185});