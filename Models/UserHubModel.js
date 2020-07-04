const Sequelize = require("sequelize");
const db = require("../Util/Database");


const UserHub = db.define("UserHub",
{
    id : 
    {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    }
});