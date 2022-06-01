const r1 = require('express').Router()
const a1 = require('express')()
const c1 = require('consola')
const m1 = require('mongoose')

/**
 * @param {r1} router 
 * @param {a1} app 
 * @param {c1} consola 
 * @param {m1} mongoose
 */
module.exports = (router, app, consola, mongoose) => {
    consola.info('Router setting up')
    // Setup routes for homepage and pre-order
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
    app.get('/pre-order/:id', (req, res) => {
        const id = req.params.id
        return res.sendFile(__dirname + '/public/pre-order.html')
    })

    app.get('/confirm-pre-order/:id', (req, res) => {
        const id = req.params.id
        return res.sendFile(__dirname + '/public/confirm-pre-order.html')
    })

    app.post('/order', (req, res) => {
        const data = req.body
        consola.log(data)
        res.sendFile(__dirname + '/public/confirmed.html')
        
        const name = data.name
        const address = data.address
        const orderSchema = require('./schema')
        const order = new orderSchema({
            name: name,
            address: address
        })
        order.save()

    })

    consola.success('Router setted up')
}