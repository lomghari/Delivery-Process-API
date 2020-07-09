const Sequelize = require("sequelize");
const sequelize = require("../Util/Database");


class Hub extends Sequelize.Model{}


Hub.init({
    id : 
        {
            type : Sequelize.INTEGER,
            autoIncrument : true,
            allowNull: false,
            primaryKey : true
        },
        hubname:
        {
            type: Sequelize.STRING,
            allowNull : false,
            unique: 'compositeIndex'
        },
         hubcity:
         {
             type : Sequelize.STRING,
         }
},{sequelize,modelName:"Hub"});

// const Hub = db.define("Hub", 
// {
//     id : 
//     {
//         type : Sequelize.INTEGER,
//         autoIncrument : true,
//         allowNull: false,
//         primaryKey : true
//     },
//     hubname:
//     {
//         type: Sequelize.STRING,
//         allowNull : false,
//         unique: 'compositeIndex'
//     },
//      hubcity:{
//          type : Sequelize.STRING,
//          allowNull: false
//      }

// });


module.exports = Hub;