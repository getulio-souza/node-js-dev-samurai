//vamos criar uma classe que sera responsavel pela manipulacao da tabala customers
import { Model, DataTypes } from "sequelize";

class Customer extends Model{
  static init(sequelize) {
    super.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.ENUM("ACTIVE", "ARCHIVED")
      },
      {
      sequelize,
      tableName: "customers"
    })
  }
}

export default Customer;