const Sequelize = require("sequelize")
const sequelize = require("../Util/Database")

class PackagesInfo extends Sequelize.Model{}


PackagesInfo.init(
{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    Tracking_Number:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Referance : 
    {
        type : Sequelize.STRING,
        allowNull : false,
    },
    Address : 
    {
        type : Sequelize.TEXT,
        allowNull : false
    },
    City : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    Customer_Name : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    Phone_Number : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    Customer: 
    {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    Price : 
    {
        type : Sequelize.DECIMAL(10,2),
        allowNull : false
    },
    First_Provider:
    {
        type : Sequelize.INTEGER,
    
    } 
},
{ 
    sequelize, 
    modelName:"PackagesInfo",
    tableName:"Packages_Info",
    indexes:
    [
        {
            unique:true,
            fields:["Customer" , "Referance"]
        }
    ]
 }
)




module.exports = PackagesInfo