var util = require('util');

function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function () {
  console.log("Ходит " + this.name);
};

function Rabbit(name) {
  this.name = name;
}

//метод производит наследование от Animal
util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function () {
  console.log("Прыгает кролик " + this.name);
};

var rabbit = new Rabbit("Вася");
rabbit.jump();
rabbit.walk();
