const express = require('express');
const server = express();

server.use(express.json());

let customers = [
    {id: 1, name: 'dev samurai', site: 'http://devsamurai.com.br'},
    {id: 2, name: 'Google', site: 'http://google.com'},
    {id: 3, name: 'UOL', site: 'http://uol.com.br'},
];

//all customers
server.get("/customers", (req, res) => {
    return res.json(customers);
})

//single customer
server.get('/customers/:id', (req, res) => {

    const id = Number(req.params.id);
    const customer = customers.find((item)=> item.id === id);
    const status = customer ? 200 : 404;

    if(!customer) {
        return res.status(404).json({
            message: 'Cliente não encontrado'
        })
    }

    return res.status(status).json(customer)
})

server.listen(3000)
const express = require('express');
const server = express();

server.use(express.json());

let customers = [
    {id: 1, name: 'dev samurai', site: 'http://devsamurai.com.br'},
    {id: 2, name: 'Google', site: 'http://google.com'},
    {id: 3, name: 'UOL', site: 'http://uol.com.br'},
];

//all customers
server.get("/customers", (req, res) => {
    return res.json(customers);
})

//single customer
server.get('/customers/:id', (req, res) => {

    const id = Number(req.params.id);
    const customer = customers.find((item)=> item.id === id);
    const status = customer ? 200 : 404;

    return res.status(status).json(customer)
})

server.listen(3000)