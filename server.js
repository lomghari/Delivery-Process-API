const detenv = require("dotenv");
const User = require("./Models/UserModel");
const Upload = require("./Models/UploadModel")
const PackagesInfo = require("./Models/PackagesInfoModel")
const PackagesDelivery = require("./Models/PackagesDeliveryModel")
const PackagesHistory = require("./Models/PackagesHistoryModel")
const Action = require("./Models/ActionModel")
const Workflow = require("./Models/WorkflowModel")
const PaymentMethod = require("./Models/PaymentMethodModel")
const ShipmentProvider = require("./Models/ShipmentProviderModel")
const PackagesStatus = require("./Models/PackagesStatusModel")
const db = require("./Util/Database");
detenv.config({path:`${__dirname}/config.env`});

const WorkflowArry = [{Workflow_Name :"Pickup"},{Workflow_Name :"Forward"},{Workflow_Name:"Reverse"}]
const ActionArry = [
    {Action_Name :"Upload"},
    {Action_Name :"Add"},
    {Action_Name:"Remove"},
    {Action_Name :"Dispatch"},
    {Action_Name :"Confirm"},
    {Action_Name:"Completed"},
    {Action_Name:"Create"}
]
const StatusArry = [
    {Status_Name :"Pending"},
    {Status_Name :"Ready_to_Pick"},
    {Status_Name :"Picked"},
    {Status_Name :"Not_Picked"},
    {Status_Name :"In_Transit"},
    {Status_Name :"At_the_Hub"},
    {Status_Name :"In_Delivery"},
    {Status_Name :"Delivered"},
    {Status_Name :"Not_Delivered"},
    {Status_Name :"In_Return"},
    {Status_Name :"Returned"},
    {Status_Name :"Not_Returned"},
]
const PaymentMethodArry = [{Payment_Method :"CashOnDelivery"}]





User.belongsToMany(ShipmentProvider,{through: "User_ShipmentProvider"});
ShipmentProvider.belongsToMany(User,{through: "User_ShipmentProvider"});

Upload.belongsTo(User,{constraints:true,onDelete: "CASCADE"})
User.hasMany(Upload)

PackagesInfo.belongsTo(User,{constraints: true,onDelete:"CASCADE", foreignKey:"Customer"})
User.hasMany(PackagesInfo)




const createTable = async () => {
    try {
        await db.sync({force: true})
        await Workflow.bulkCreate(WorkflowArry)
        await PackagesStatus.bulkCreate(StatusArry)
        await Action.bulkCreate(ActionArry)
        await PaymentMethod.bulkCreate(PaymentMethodArry)
        //await db.sync()
    } catch (error) {
        console.log(error)
    }
}

const app = require("./app");


createTable();

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server Start")
})
