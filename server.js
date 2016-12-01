const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const crc = require('crc');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Secret Box';
app.locals.urls = [];

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/urls', (request, response) => {
    response.send(app.locals.urls);
});

app.post('/urls', (request, response) => {
  const data = request.body;
  data.id = md5(data.url);
  data.url = data.url;
  data.shortenedUrl = crc.crc32(data.url).toString(16);
  data.clicks = data.clicks;
  data.date = data.date || Date.now();
  app.locals.urls.push(data);
  response.status(201).send({ data });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/urls/:shortenedUrl', (request, response) => {
  let targetUrl = app.locals.urls.filter((url) =>
  url.shortenedUrl===request.params.shortenedUrl)[0];

  if (!targetUrl) { response.send(`Please go away to somewhere that exists and never come back here.`)}
  ++targetUrl.clicks;
  response.redirect( targetUrl.url );
});
