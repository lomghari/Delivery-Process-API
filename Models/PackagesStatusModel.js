const Sequelize = require("sequelize")
const sequelize = require("../Util/Database")



class PackagesStatus extends Sequelize.Model{}

PackagesStatus.init(
    {
        id:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey : true,
            allowNull: false
        },
        Status_Name:
        {
            type : Sequelize.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName : "PackagesStatus",
        tableName:"Packages_Status"
    }
);

module.exports = PackagesStatus