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




//Association Between User-ShipmentProvader Table
User.belongsToMany(ShipmentProvider,{through: "User_ShipmentProvider"});
ShipmentProvider.belongsToMany(User,{through: "User_ShipmentProvider"});

//Association between User-Upload table
User.hasMany(Upload,{foreignKey:"Custumer"})
Upload.belongsTo(User,{foreignKey:"Custumer"})

//Association Between Upload-PackageInfo
Upload.hasMany(PackagesInfo,{foreignKey:"UploadId"})
PackagesInfo.belongsTo(Upload,{foreignKey:"UploadId"})

//Association between User-PackageInfo
User.hasMany(PackagesInfo,{foreignKey:"Custumer"})
PackagesInfo.belongsTo(User,{foreignKey:"Custumer"})

//Association Between PackageInfo-PackageDelivery
PackagesInfo.hasOne(PackagesDelivery,{foreignKey:"Package"})
PackagesDelivery.belongsTo(PackagesInfo,{foreignKey:"Package"})

//Association Between PackageInfo-PackageHistory
PackagesInfo.hasMany(PackagesHistory,{foreignKey:"Package"})
PackagesHistory.belongsTo(PackagesInfo,{foreignKey:"Package"})

//PackageDelivery Proccess 
Action.hasMany(PackagesDelivery,{foreignKey:{
    name:"Package_Action",
    defaultValue: 1
}})
PackagesDelivery.belongsTo(Action, {onDelete:true,foreignKey:{
    name:"Package_Action",
    defaultValue: 1
}})

ShipmentProvider.hasMany(PackagesDelivery,{foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})
PackagesDelivery.belongsTo(ShipmentProvider,{onDelete:true,foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})

PaymentMethod.hasMany(PackagesDelivery, {foreignKey:{
    name:"Payment_Method",
    defaultValue: 1
}})
PackagesDelivery.belongsTo(PaymentMethod , {onDelete:true,foreignKey:{
    name:"Payment_Method",
    defaultValue: 1
}})

Workflow.hasMany(PackagesDelivery, {foreignKey : {
    name:"Package_Workflow",
    defaultValue: 1
}})
PackagesDelivery.belongsTo(Workflow, {onDelete:true,foreignKey : {
    name:"Package_Workflow",
    defaultValue: 1
}})

PackagesStatus.hasMany(PackagesDelivery,{foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})
PackagesDelivery.belongsTo(PackagesStatus, {onDelete:true,foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})

//PackageHistory Proccess 
Action.hasMany(PackagesHistory,{foreignKey:{
    name:"Package_Action",
    defaultValue: 1
}})
PackagesHistory.belongsTo(Action,{onDelete:true,foreignKey:{
    name:"Package_Action",
    defaultValue: 1
}})

ShipmentProvider.hasMany(PackagesHistory,{foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})
PackagesHistory.belongsTo(ShipmentProvider,{onDelete:true,foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})

PaymentMethod.hasMany(PackagesHistory, {foreignKey:{
    name:"Payment_Method",
    defaultValue: 1
}})
PackagesHistory.belongsTo(PaymentMethod , {onDelete:true,foreignKey:{
    name:"Payment_Method",
    defaultValue: 1
}})

Workflow.hasMany(PackagesHistory, {foreignKey : {
    name:"Package_Workflow",
    defaultValue: 1
}})
PackagesHistory.belongsTo(Workflow, {onDelete:true,foreignKey : {
    name:"Package_Workflow",
    defaultValue: 1
}})

PackagesStatus.hasMany(PackagesHistory,{foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})
PackagesHistory.belongsTo(PackagesStatus, {onDelete:true,foreignKey:{
    name:"Shipment_Provider",
    defaultValue: 1
}})




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


//createTable();

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server Start")
})
