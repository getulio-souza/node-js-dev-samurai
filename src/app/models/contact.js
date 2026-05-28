import Sequelize, {Model} from "sequelize";

class Contact extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                status: Sequelize.ENUM("ACTIVE", "ARQUIVED"),
                customer_id: Sequelize.INTEGER
            },
            {
                sequelize,
                modelName: "Contact",
                tableName: "contact"
            }
        )
    }

    static associate(models){
      this.belongsTo(models.Customer, {
        foreignKey: {
          name: "customer_id",
          as: "customer"
          }
        })
    }
}

export default Contact;