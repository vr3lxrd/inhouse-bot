var express = require('express')
var app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, (err, client) => {
    const db = client.db('inhouse_players')
    app.listen(port, () => {
        console.log(`Link do servidor: http://localhost:${port}`)
    })
  })
  
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({
  type: ['application/json', 'text/plain']
}))

const register = require('./routes/register')
const users = require('./routes/users')
const desconectar = require('./routes/desconectar')
app.use('/desconectar', desconectar)
app.use('/register', register)
app.use('/users', users)

