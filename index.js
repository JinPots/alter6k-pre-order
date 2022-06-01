const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    consola = require('consola')


consola.LogLevel = 'info' 
// Setup mongoose and app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/src'))

// Connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/alter6k').then(async (result) => {
    consola.success('MongoDB Connected')
}).catch((err) => {
    consola.error(err)
});

const { Router } = require('express')
// Setup router
const router = Router()
require('./router')(router, app, consola, mongoose)

app.listen(3000, () => {
    consola.success('Server Started')
})

