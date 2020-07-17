const Sequelize = require("sequelize")
const sequelize = require("../Util/Database")

class ShipmentProvider extends Sequelize.Model{}


ShipmentProvider.init(
    {
        id:
        {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        Provider_Name : 
        {
            type : Sequelize.STRING,
            allowNull : true,
            unique: true
        },
        Address:
        {
            type : Sequelize.STRING,
            allowNull : true
        },
        City:
        {
            type : Sequelize.STRING,
            allowNull : true
        },
        Phone:
        {
            type : Sequelize.STRING,
            allowNull : true
        }
    },
    {
        sequelize,
        modelName:"ShipmentProvider",
        tableName : "Shipment_Provider"
    }
)

module.exports = ShipmentProvider