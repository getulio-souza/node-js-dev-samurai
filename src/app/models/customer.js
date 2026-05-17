//vamos criar uma classe que sera responsavel pela manipulacao da tabala customers
import { Model, DataTypes } from "sequelize";

class Customer extends Model{
  static init(sequelize) {
    
  super.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["ACTIVE", "ARCHIVED"]
      }
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers"
    }
  );

  return this;
}
  //associando o customer ao contact - relação de um para muitos (hasMany)
  static associate(models){
    console.log('models:', models);
    console.log('Contact:', models.Contact);

    this.hasMany(models.Contact)
  }
}

export default Customer;