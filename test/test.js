const assert = require('assert');
const request = require('supertest');
const app = require('../server');


describe('GET all urls', () => {
  beforeEach(() => {
   app.locals.urls = [{ id: 1, url: 'www.google.com', shortenedUrl: 'google', clicks: 3 }];
 });

 afterEach(() => {
   app.locals.urls = [];
 });

 it('should return status 201 if successful', (done) => {
   request(app).get('/urls')
               .expect(201, done);
    });
});
