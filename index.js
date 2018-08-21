const express = require('express')
const bodyParser = require('body-parser')
const urls = require('./urls')

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/', urls)

module.exports = app.listen(process.env.PORT || 3000)