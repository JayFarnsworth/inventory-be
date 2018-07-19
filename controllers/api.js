const routes = require('express').Router();
const mongo = './database/mongo.js';
const fetch = require('node-fetch');
const request = require('request');



routes.get('/', (req, res) => {
  console.log('hi')
  res.send('hello')
});

routes.get('/users', (req, res) => {
  fetch(`https://inventorydb.herokuapp.com/allusers`)
    .then(resp => resp.json())
    .then(resp => {res.status(200).send(resp)})
    .catch(error=>console.log(error))
})

routes.get('/user', (req, res) => {
  var id = req.query.id;
  fetch(`https://inventorydb.herokuapp.com/user`)
    .then(resp => resp.json())
    .then(resp => { res.status(200).send(resp) })
    .catch(error => console.log(error))
})

routes.post('/user', (req, res) => {
  var clientServerOptions = {
    uri: 'https://inventorydb.herokuapp.com/user',
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

routes.put('/user', (req, res) => {
  var userId = req.query.userId;
  var schoolId = req.query.schoolId;
  var idObject = {
    user: userId,
    school: schoolId
  }
  var clientServerOptions = {
    uri: `https://inventorydb.herokuapp.com/user?userId=${userId}&schoolId=${schoolId}`,
    body: JSON.stringify(req.body),
    method: 'PUT',
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

routes.delete('/user', (req, res) => {
  var userId = req.query.id;
  var clientServerOptions = {
    uri: `https://inventorydb.herokuapp.com/user?id=${userId}`,
    body: JSON.stringify(req.body),
    method: 'DELETE',
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

routes.get('/facilities', (req, res) => {
  fetch('https://inventorydb.herokuapp.com/allfacilities')
    .then(resp => resp.json())
    .then(resp => res.send(resp))
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

routes.post('/user', (req, res) => {
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
