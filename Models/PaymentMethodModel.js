const Sequelize = require("sequelize")
const sequelize = require("../Util/Database")

class PaymentMethod extends Sequelize.Model{}

PaymentMethod.init(
    {
        id:
        {
            type : Sequelize.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        Payment_Method:
        {
            type : Sequelize.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName:"PaymentMethod",
        tableName:"Payment_Method"
    }
)

module.exports = PaymentMethod