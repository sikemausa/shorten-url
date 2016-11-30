const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Secret Box';
app.locals.urls = [];

app.get('/', (request, response) => {
  response.send('Hello World!');
});

// app.get('/urls/:id', (request, response) => {
//   const { id } = request.params;
//   const message = app.locals.urls[id];
//
//   if (!message) { return response.sendStatus(404); }
//
//   response.send({ id, message });
// });

app.get('/urls/:id', (request, response) => {
  const { id } = request.body.id;
  const message = app.locals.urls[id];

  if (!message) { return response.sendStatus(404); }

  response.send({ id, message });
});



app.get('/urls', (request, response) => {
    response.send(app.locals.urls);
});

app.post('/urls', (request, response) => {
  const data = request.body;
  data.id = data.id || Date.now();
  data.url = data.url;
  data.shortenedUrl = data.shortenedUrl;
  data.clicks = data.clicks;
  data.date = data.date || Date.now();
  app.locals.urls.push(data);
  response.status(201).send({ data });
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
