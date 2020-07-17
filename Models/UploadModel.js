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
    Shipment_Provider:
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    Total_Package:
    {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    Status:{
        type : Sequelize.STRING,
        allowNull: false
    },
    Uploaded_By:{
        type : Sequelize.INTEGER,
        allowNull : false
    }
},
    {
        sequelize,
        modelName:"Upload",
        tableName:"Upload_History"
    }
)




module.exports = Upload;