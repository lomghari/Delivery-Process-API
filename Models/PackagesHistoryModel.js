const Sequelize = require("sequelize")
const sequelize = require("../Util/Database")


class PackagesHistory extends Sequelize.Model{}



PackagesHistory.init(
    {
       id : 
       {
           type : Sequelize.INTEGER,
           allowNull : false,
           autoIncrement : true,
           primaryKey : true
       },
       Package_id:
       {
           type : Sequelize.INTEGER,
           allowNull : false
       },
       Shipment_Provider:
       {
           type: Sequelize.INTEGER
       },
       Package_Workflow:
       {
           type : Sequelize.STRING,
           allowNull : false
       },
       Package_Status:
       {
           type : Sequelize.STRING,
           allowNull : false
       },
       Package_Action:
       {
           type: Sequelize.STRING,
           allowNull : false
       },
       Payment_Method:
       {
           type: Sequelize.STRING,
           allowNull : false
       },
       Amount_To_Collect:
       {
           type : Sequelize.DECIMAL(10,2),
           allowNull : false
       },
       Delivery_Run_Number:
       {
           type : Sequelize.STRING
       },
       Driver:
       {
           type : Sequelize.INTEGER
       },
       Attempts:
       {
           type : Sequelize.INTEGER
       },
       Master_Bag_Number:
       {
           type : Sequelize.STRING
       },
       Location:
       {
           type : Sequelize.STRING
       }
    },
    {
        sequelize,
        modelName:"PackagesHistory",
        tableName:"Packages_History"
    }
)


module.exports = PackagesHistory