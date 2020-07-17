const Sequelize = require("sequelize");
const sequelize = require("../Util/Database")


class Action extends Sequelize.Model{}



Action.init(
   {
       id : 
       {
           type: Sequelize.INTEGER,
           allowNull : false,
           primaryKey : true,
           autoIncrement : true
       },
       Action_Name:
       {
           type: Sequelize.STRING,
           allowNull : false
       }
   },
   {
       sequelize,
       modelName:"Action",
       tableName:"Actions"
   }
)


module.exports = Action