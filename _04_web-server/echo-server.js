var http = require('http');
var url = require('url');

var server = new http.Server(function (req,res) {
  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed);

  if (urlParsed.pathname == '/echo' && urlParsed.query.message == "hello") {
    res.setHeader('cache-control', 'no-cache');
    res.end("hello");

  } else {
    res.statusCode = 404;
    res.end("not found");
  }
});

server.listen(1337, '127.0.0.1');