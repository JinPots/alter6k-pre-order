const r1 = require('express').Router()
const a1 = require('express')()
const c1 = require('consola')
const m1 = require('mongoose')
const axios = require('axios')


/**
 * @param {r1} router 
 * @param {a1} app 
 * @param {c1} consola 
 * @param {m1} mongoose
 */
module.exports = (router, app, consola, mongoose) => {
    consola.info('\x1b[36mRouter setting up \x1b[0m')
    // Setup routes for homepage and pre-order
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
    app.get('/pre-order/:id', (req, res) => {
        const id = req.params.id
        consola.success('\x1b[33m' + req.ip + ' is viewing product ' + id)
        return res.sendFile(__dirname + '/public/pre-order.html')
    })

    app.get('/confirm-pre-order/:id', (req, res) => {
        const id = req.params.id
        return res.sendFile(__dirname + '/public/confirm-pre-order.html')
    })

    app.post('/order', (req, res) => {
        const data = req.body
        consola.info(data.name + ' confirmed pre-order' + data.productid)
        res.sendFile(__dirname + '/public/confirmed.html')
        const name = data.name
        const address = data.address
        const orderSchema = require('./schema')
        const order = new orderSchema({
            name: name,
            address: address,
            productid: data.productid
        })
        order.save()

        axios.post('https://discord.com/api/webhooks/981778492456833024/VENPBVLaO9P-pR30S-caIde3QzZxJWXTxCjbVci2IOgXqk6rQYOKAw17bXRZz3zbmGQS', {
            username: 'Atri-shop',
            embeds: [{
                title: 'New Pre-Order',
                description: 'New order from ' + name + '\n' + 'Product: ' + data.productid + '\n' + 'Address: ' + data.address,
                timestamp: new Date().toISOString(),
                color: '363933'
            }],
        }).then((result) => {
            consola.success('Order sent to Discord')            
        }).catch((err) => {
           consola.error(err) 
        });
    })

    consola.success('\x1b[32mRouter setted up')
}