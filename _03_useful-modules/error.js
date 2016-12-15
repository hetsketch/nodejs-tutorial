var util = require('util');

function PhraseError(message) {
  this.message = message;
  //метод устанавливает стектрейс текущему объекту
  //второй параметр устанавливает верхнюю границу стектрейса
  Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);
//у ошибки должно быть имя
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
  this.message = message;
  this.status = status;
  Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


var phrases = {
  "Hello": "Привет",
  "world": "мир"
};

function getPhrase(name) {
  if (!phrases[name]) {
    throw new PhraseError("Нет такой фразы: " + name);
  }
  return phrases[name];
}

function makePage(url) {
  if (url != 'index.html') {
    throw new HttpError(404, "Нет такой страницы");
  }
  return util.format("%s, %s", getPhrase("Hell1o"), getPhrase("wofrld"));
}

try {
  var page = makePage("index.html");
  console.log(page);
} catch (e) {
  if (e instanceof HttpError) {
    console.log(e.status, e.message);
  } else {
    console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack)
  }
}