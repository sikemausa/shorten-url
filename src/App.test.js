import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const assert = require('assert');
const request = require('supertest');
const app = require('../server');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('GET /', () => {
   it('should return a 200 status code', (done) => {
     request(app)
       .get('/')
       .expect(200, done);
   });
 });

 describe('GET all urls', () => {

  beforeEach(() => {
    app.locals.urls = [{ id: 1,
                         url: 'http://www.google.com',
                         shortenedUrls: 'http://localhost:8080/acf785',
                         clicks: 3
                       }];
  });

  afterEach(() => {
    app.locals.urls = [];
  });

  it('should return a 201 status code', (done) => {
    request(app)
      .get('/urls')
      .expect(201, done);
  });

  it('should return a url stored in app.locals.urls', (done) => {
    request(app)
      .get('/urls')
      .expect(201, {
        urls: app.locals.urls
      }, done);
  });
});

describe('POST a url', () => {

  beforeEach(() => {
    app.locals.urls = [];
  });

  it('should create a new url', (done) => {
    const url = 'www.google.com';

    request(app)
      .post('/urls')
      .send({ url })
      .expect(201)
      .end(() => {
        assert.equal(app.locals.urls.length, 1);
        done();
      });
  });
});

// hello
