const Sequelize = require("sequelize");
const db = require("../Util/Database");

const Upload = db.define("upload",
{
    id:
    {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false     
    },
    fullpackege:
    {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    numberofpackege:
    {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});


module.exports = Upload;