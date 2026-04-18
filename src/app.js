const express = require('express');
const routes = require('./routes')

class App {
  constructor() {
    this.server = express();
    //chamando os metodos abaixo dentro do constructor
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  
}

module.exports = new App().server;