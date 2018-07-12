const http = require('http')
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = module.exports = express()
const server = http.createServer(app)
const port = parseInt(process.env.PORT || 4000)
const devMode = process.env.NODE_ENV !== 'production'
const mongo = require('./mongo.js')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(devMode ? 'dev' : 'combined'))
app.use(cors({ origin: true }))


app.get('/users', (req, res) => {
  console.log('mongo working')
  var name = req.query.name;
  mongo.findUser(name)
    .then(user => {
      console.log('we got here')
      res.send(user)
    })
})

app.post('/create', (req, res) => {
  console.log(req.body)
})

app.post('/users/post', function (req, res) {
  console.log('receiving data');
  console.log('body is ', req.body);
  mongo.createUser(req.body)
    .then(user => {
      console.log('created')
      res.send(req.body)
    })
})


app.use(notFound)
app.use(errorHandler)

server.listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port));

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important auto requests
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({ error: 'Url not found', status: 404, url })
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = devMode ? err.stack : undefined
  res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}
