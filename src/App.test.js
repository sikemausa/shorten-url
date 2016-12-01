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
