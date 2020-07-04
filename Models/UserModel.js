const Sequelize = require("sequelize");
const db = require("../Util/Database");


const User = db.define("user", 
{
    id : 
    {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    username:
    {
        type: Sequelize.STRING,
        allowNull : false,
        unique: 'compositeIndex'
    },
     password:{
         type : Sequelize.STRING,
         allowNull: false
     },

     fullname : {
         type : Sequelize.STRING,
         allowNull :  false
     },

     last_login : {
         type: Sequelize.DATE,
         defaultValue : Sequelize.NOW,
         allowNull : false
     },
     stat:
     {
         type: Sequelize.BOOLEAN,
         defaultValue : true,
         allowNull : false
     } ,
     role : 
     {
        type : Sequelize.ENUM
        ({
           values : ["Customer","Admin","Operateur","Manager","Rider"]
        }),
        allowNull :false

     },
     currentHubId:
     {
        type : Sequelize.INTEGER,
        defaultValue : 1,
        allowNull : false

     }




});


module.exports = User;