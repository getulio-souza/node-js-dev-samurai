const express = require('express');

const server = express();

server.get('/hello', (req, res)=> {
 return res.json({
    title: 'hello world',
    message: 'hello my friend, how are you?'
})
})

server.listen(3000)