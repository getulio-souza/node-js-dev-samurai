 import Sequelize from "sequelize";
import config from "../config/database";

//importando os models para joga-los dentro de um array
import Customer from "../app/models/customer";
import Contact from "../app/models/contact";
import User from "../app/models/user";

const models = [Customer, Contact, User];

//essa classe sera responsavel por carregar todos os models (contact, customer, user)
class Database {
  constructor() {
    this.connection = new Sequelize(config);

    //chamando o metodo init
    this.init();

    //chamando o metodo associate
    // this.associate();
  }

  //criamos o metodo init para chamar o metodo init de cada model
  init() {
    models.forEach(model => model.init(this.connection))

    console.log('retorno init:',Object.keys(this.connection.models));

    models.forEach(model => {
      if(model.associate){
        model.associate(this.connection.models)
      }
    })
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models)
      }
    })
  }
}

export default new Database();