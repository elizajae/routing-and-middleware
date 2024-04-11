const app = require('./app');
const request = require('supertest');
const items = require('./fakeDb');



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });