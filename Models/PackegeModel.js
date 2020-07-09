const Sequelize = require("sequelize");
const sequelize  = require("../Util/Database");


class Packege extends Sequelize.Model{}


Packege.init({
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    referance : 
    {
        type : Sequelize.STRING,
        allowNull : false,
    },
    address : 
    {
        type : Sequelize.TEXT,
        allowNull : false
    },
    city : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    code_postal : 
    {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    customer_name : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    phone_number : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    region : 
    {
        type: Sequelize.STRING,
        allowNull : false
    },
    price : 
    {
        type : Sequelize.DOUBLE,
        allowNull : false
    }
},{ sequelize , modelName:"Packege"})



// const Packege = db.define("Packege",
// {
//     id:
//     {
//         type:Sequelize.INTEGER,
//         autoIncrement : true,
//         primaryKey : true,
//         allowNull : false
//     },

//     referance : 
//     {
//         type : Sequelize.STRING,
//         allowNull : false,
//     },
//     address : 
//     {
//         type : Sequelize.TEXT,
//         allowNull : false
//     },
//     city : 
//     {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     code_postal : 
//     {
//         type: Sequelize.INTEGER,
//         allowNull : false
//     },
//     customer_name : 
//     {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     phone_number : 
//     {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     region : 
//     {
//         type: Sequelize.STRING,
//         allowNull : false
//     },
//     price : 
//     {
//         type : Sequelize.DOUBLE,
//         allowNull : false
//     }
    

// });


module.exports = Packege;