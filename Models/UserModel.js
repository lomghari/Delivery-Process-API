const Sequelize = require("sequelize");
const sequelize = require("../Util/Database");


class User extends Sequelize.Model{}

User.init({
    id : 
        {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
       Username:
        {
            type: Sequelize.STRING,
            allowNull : false
        },
         Password:{
             type : Sequelize.STRING,
             allowNull: false
         },
    
         Full_Name : {
             type : Sequelize.STRING,
             allowNull :  false
         },
         Email:{
             type : Sequelize.STRING,
             allowNull: false
         },
         Last_Login : {
             type: Sequelize.DATE,
             defaultValue : Sequelize.NOW,
             allowNull : false
         },
        Status:
         {
             type: Sequelize.BOOLEAN,
             defaultValue : true,
             allowNull : false
         } ,
         Role : 
         {
            type : Sequelize.ENUM
            ({
               values : ["Customer","Admin","Operateur","Manager",'Rider']
            }),
            allowNull :false
    
         },
         Current_Provider:
         {
            type : Sequelize.INTEGER,
            defaultValue : 1,
            allowNull : false
    
         }
},
{
    sequelize, 
    modelName:"User",
    tableName:"Users"
}
);



module.exports = User;