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
  }

  //criamos o metodo init para chamar o metodo init de cada model
  init() {
    models.forEach(model => model.init(this.connection))
  }
}

export default Database;