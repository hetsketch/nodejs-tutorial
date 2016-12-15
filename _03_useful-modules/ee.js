var EventEmmiter = require('events');

var server = new EventEmmiter;

//аргументы передаются по цепочке, обработчики срабатывают в том же порядке, в котором объявлены
server.on('request', function (request) {
  request.approved = true;
});

server.on('request', function (request) {
  console.log(request);
});

server.emit('request', {from: "Клиент"});
server.emit('request', {from: "Еще клиент"});

//сколько обработчиков весит на request
console.log(server.listenerCount('request'));

//если у него нет обработчика, то сгененрит исключение и поломает ноду
server.emit('error');