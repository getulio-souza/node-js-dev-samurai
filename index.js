const express = require('express');

const server = express();

// server.get('/hello', (req, res) => {
//     //obtendo os paramentos para a rota
//     const { nome, idade } = req.query;

//     return res.json({
//         title: 'hello world',
//         message: `hello, ${nome}, how are you?`,
//         idade: idade
//     })
// })

//nome

server.get('/hello/', (req, res) => {
    const {nome} = req.params;

    return res.json({
        message: `hello, ${nome}, how are you? I hope you are doing well!`,
    })
})

server.listen(3000)

// https://www.youtube.com/watch?v=5UgIxA32Q5I