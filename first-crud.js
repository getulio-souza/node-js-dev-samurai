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

//post - criar novo customer
server.post('/customers', (req, res) => {
    const {name, site} = req.body; //corpo que vai ser enviado na requisição
    const id = customers[customers.length -1].id + 1 //obtendo o último id cadastrado e somando mais 1
    const newCustomer = {id, name, site}; //definindo o que vai dentro do body

    //jogamos dentro do array de customers o novo customer
    customers.push(newCustomer)

    //retornar a resposta com o novo costumer criado
    return res.status(201).json(newCustomer)
})

server.listen(3000)
