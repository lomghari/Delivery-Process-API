const Sequelize = require("sequelize");
const sequelize = require("../Util/Database");


class Workflow extends Sequelize.Model{}

Workflow.init(
    {
        id :
        {
            type: Sequelize.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        Workflow_Name : 
        {
            type: Sequelize.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName:"Workflow",
        tableName:"Workflow"
        
    }
)

module.exports = Workflow