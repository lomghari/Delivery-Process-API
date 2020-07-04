const Sequelize = require("sequelize");
const db = require("../Util/Database");


const Hub = db.define("hub", 
{
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
     hubcity:{
         type : Sequelize.STRING,
         allowNull: false
     }

});


module.exports = Hub;