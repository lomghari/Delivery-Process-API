const Sequelize = require("sequelize");
const sequelize = require("../Util/Database");

class Upload extends Sequelize.Model{}

Upload.init({
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
},{sequelize,modelName:"Upload"})




// const Upload = db.define("Upload",
// {
//     id:
//     {
//         type: Sequelize.INTEGER,
//         autoIncrement : true,
//         primaryKey : true,
//         allowNull : false     
//     },
//     fullpackege:
//     {
//         type : Sequelize.STRING,
//         allowNull : false,
//         unique : true
//     },
//     numberofpackege:
//     {
//         type : Sequelize.INTEGER,
//         allowNull : false
//     }
// });


module.exports = Upload;