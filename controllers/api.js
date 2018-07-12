const routes = require('express').Router();
const mongo = './database/mongo.js';
const fetch = require('node-fetch');
const request = require('request');


routes.get('/hello', (req, res) => {
  console.log('hi')
  res.send('hello')
});

routes.get('/users', (req, res) => {
  console.log('mongo working')
  var name = req.query.name;
  fetch(`https://inventorydb.herokuapp.com/users?name=${name}`)
    .then(resp => resp.json())
    .then(resp => {res.status(200).send(resp)})
})

routes.post('/users/post', (req, res) => {
  var clientServerOptions = {
    uri: 'http://localhost:4000/users/post',
    body: JSON.stringify(req.body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  request(clientServerOptions, function (error, response) {
    console.log(response.body);
    res.send(response.body)
    return;
  });
})




module.exports = routes;
