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
    Shipment_Provider_Id:
    {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    Total_Package:
    {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    Total_Failer_Packages:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Total_Seccess_Packages:
    {
       type: Sequelize.INTEGER,
       allowNull: false
    },
    Status:{
        type : Sequelize.STRING,
        allowNull: false
    },
    LogsFile:
    { 
        type : Sequelize.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        modelName:"Upload",
        tableName:"Upload_History",
        updatedAt: false
    }
)




module.exports = Upload;