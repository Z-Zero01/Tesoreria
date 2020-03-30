const morgan = require('morgan')
const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')

const app = express()

// Variables globales
require('./config/config')
//Conexión a la base de datos
require('./database/connect.js')

// Middlewares para las peticiones
//app.use( morgan('dev'))
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

//Declaración de las rutas
app.use('/api', require('./routes/index.js'));

http.createServer(app).listen(process.env.PORT, function createServer() {
  console.log('Server running')
})