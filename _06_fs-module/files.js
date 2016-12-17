var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');

var ROOT = __dirname + "/public";

http.createServer(function (req, res) {

  if (!hasPermissions(req)) {
    res.statusCode = 403;
    res.end("Tell me the secret of access");
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function hasPermissions(req) {
  return url.parse(req.url, true).query.secret == 'sec';
}

function sendFileSafe(filePath, res) {
  try {
    //декодируем урл, чтобы он правильно выводился
    //(нормальное отображение русских букв, символов пробела и т.д)
    filePath = decodeURIComponent(filePath);
  } catch (e) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  //проверка нулевого байта, если он есть, то его передали намеренно
  //~ - побитовое НЕ, формула такая -(n+1) ~10 = -11
  //так проверяем элемент в нулевой позиции
  if (~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }
  //normalize убирает ненужные символы из пути(двойные слеши)
  //join пресоединяет к ROOT filePath
  filePath = path.normalize(path.join(ROOT, filePath));

  //нормализируем ROOT ибо пути винды
  if (filePath.indexOf(path.normalize(ROOT)) != 0) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    sendFile(filePath, res);
  });
}

function sendFile(filePath, res) {
  fs.readFile(filePath, function (err, content) {
    if (err) throw err;
    console.log(path);
    var mime = require('mime').lookup(filePath);
    res.setHeader('Content-Type', mime + "; charset=utf-8");
    res.end(content);
  })
}