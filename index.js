const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    consola = require('consola'),
    https = require('https')


consola.LogLevel = 'info' 
// Setup mongoose and app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/src'))

// Connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/alter6k').then(async (result) => {
    consola.success('\x1b[32mMongoDB Connected')
}).catch((err) => {
    consola.error(err)
});

const { Router } = require('express')
// Setup router
const router = Router()
require('./router')(router, app, consola, mongoose)

app.listen(process.env.PORT, () => {
    consola.success('\x1b[32mServer Started')
})

// Setup https server
// const privateKey = fs.readFileSync('./ssl/privkey.pem', 'utf8')
// const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8')
// const ca = fs.readFileSync('./ssl/chain.pem', 'utf8')
// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// }
// const httpsServer = https.createServer(credentials, app)
// httpsServer.listen(443, () => {
//     consola.success('\x1b[32mHTTPS Server Started')
// })