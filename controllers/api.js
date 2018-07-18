const routes = require('express').Router();
const mongo = './database/mongo.js';
const fetch = require('node-fetch');
const request = require('request');


routes.get('/hello', (req, res) => {
  console.log('hi')
  res.send('hello')
});

routes.get('/users', (req, res) => {
  fetch(`https://inventorydb.herokuapp.com/allusers`)
    .then(resp => resp.json())
    .then(resp => {res.status(200).send(resp)})
    .catch(error=>console.log(error))
})

routes.get('/inventory', (req, res) => {
  fetch('https://inventorydb.herokuapp.com/inventory')
    .then(resp=>resp.json())
    .then(resp=>res.send(resp))
})

routes.post('/inventory', (req, res) => {
  var clientServerOptions = {
    uri: 'https://inventorydb.herokuapp.com/inventory',
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


// routes.get('/facilities')

routes.post('/users/post', (req, res) => {
  var clientServerOptions = {
    uri: 'https://inventorydb.herokuapp.com/users/post',
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
