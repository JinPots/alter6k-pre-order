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
        consola.log(data)
        consola.info(data.name + ' confirmed pre-order' + data.productid)
        res.sendFile(__dirname + '/public/confirmed.html')
        const name = data.name
        const address = data.address
        const orderSchema = require('./schema')
        let data2 = {
            name: name,
            address: address,
            productid: data.productid,
            phone: data.phone,
            email: data.email,
        }

        const order = new orderSchema(data2)
        order.save()

        axios.post('https://discord.com/api/webhooks/981778492456833024/VENPBVLaO9P-pR30S-caIde3QzZxJWXTxCjbVci2IOgXqk6rQYOKAw17bXRZz3zbmGQS', {
            username: 'Atri-shop',
            embeds: [{
                title: 'New Pre-Order',
                description: 'New order from **' + name + '**\n' + 'Product: **' + data.productid + '**\n' + 'Address: **' + data.address + '**\n' + 'Phone: **' + data.phone + '**\n' + 'Email: **' + data.email + '**\n Contact Info: **' + data.contact_info + '**\n Retard Check: ' + `**${data.retardCheck}**`,
                timestamp: new Date().toISOString(),
                color: '363933'
            }],
        }).then((result) => {
            consola.success('Order sent to Discord')            
        }).catch((err) => {
           consola.error(err) 
        });
    })

    app.get('/api/discord', (req, res) => {
        const client_secret = '1zOMj3Ya30jQlAbO_5WmPjEm3bMvL2_I' 
        const code = req.query.code
        const data_1 = new URLSearchParams();
        data_1.append('client_id', '964904199974428803');
        data_1.append('client_secret', client_secret);
        data_1.append('grant_type', 'authorization_code');
        data_1.append('code', code);    
        axios({
            method: 'post',
            url: 'https://discord.com/api/v10/oauth2/token',
            data: data_1,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(({data: result}) => {
            const data_2 = new URLSearchParams();
            data_2.append('access_token', result.access_token);
            axios({
                method: 'post',
                url: 'https://discord.com/api/v10/users/@me',
                data: data_2,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(({data: result}) => {
                res.send(result)
            }).catch((err) => {
                consola.error(err)
            })
        }).catch((err) => {
            consola.error(`Error while getting access_token: \n${err}`)
            return res.redirect('/')
        })
    })

    consola.success('\x1b[32mRouter setted up')
}