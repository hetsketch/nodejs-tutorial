var http = require('http');
var fs = require('fs');
var url = require('url');

var server = new http.Server(function (req, res) {
  var parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname == "/") {
    //SYNC
    // try {
    //   var index = fs.readFileSync("index.html");
    // } catch(e) {
    //   console.log(e);
    // }
    // res.end(index);

    //ASYNC
    //при асинхронной работе с файлом, вторым параметром выступает колбэк функция,
    //которая вызовется после рабты с файлом. при ошибке, она вызывается с аргументом err
    //при успехе - null, данные. всегда следует обрабатывать ошибки, чтобы не было фантомного 
    //поведения
    fs.readFile('index.html', function (err, data) {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end("Ошибка работы с файлом");
        return;
      }
      res.end(data);
    });

  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(8000, '127.0.0.1');