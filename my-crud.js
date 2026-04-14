const express = require('express')
const server = express();

server.use(express.json())

const usersList = [
    {id: 1, content: 'um texto aqui', autor: 'Maria'},
    {id: 2, content: 'um texto aqui 2', autor: 'jose'},
    {id: 3, content: 'um texto aqui 3', autor: 'Paulo'},
]

//get de todos
server.get('/usuarios', (req, res) => {
    return res.status(200).json(usersList)
});

//get de um unico usuario
server.get('/usuarios/:id', (req, res) => {

    //pegando o id por params
    const id = Number(req.params.id);
    const getUser = usersList.find((user) => user.id === id);

    if(!getUser) return res.json({
        message: 'usuario não existe'
    })

    return res.json(getUser);
})

//criando novo usuario (primeiro parametro a rota, segundo a funcao de callback com req, res)
server.post('/usuarios', (req, res) => {
    //body que vou enviar - content e autor (id é gerado automaticamente)
    const {content, autor} = req.params.body;

    // definir o id que ele vai ter - tem que ser baseado no ultimo id do array
    const id = usersList[usersList.length -1].id + 1

    return res.json({
        content: content,
        autor: autor,
        id: id
    })
})

server.listen(4000)

// 01:43 > https://www.youtube.com/watch?v=5UgIxA32Q5I&t=3769s
