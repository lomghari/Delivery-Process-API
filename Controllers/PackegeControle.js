const Sequelize = require("sequelize");
const XLSX = require("xlsx")
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");
const Packege = require("../Models/PackegeModel");
const Upload = require("../Models/UploadModel")
const PackageInfo = require("../Models/PackagesInfoModel")
const PackageDelivery = require("../Models/PackagesDeliveryModel")
const PackageHistory = require("../Models/PackagesHistoryModel")
const PackageStatus = require("../Models/PackagesStatusModel")
const Action = require("../Models/ActionModel")
const Workflow = require("../Models/WorkflowModel")
const ShipmentProvider = require("../Models/ShipmentProviderModel")
const PaymentMethod = require("../Models/PaymentMethodModel");


const ToforeNumberString = (number) => {
    var numberString = number + ""

    switch(numberString.length){
        case 1 : numberString = "000" + numberString
        break;
        case 2 : numberString = "00" + numberString
        break;
        case 3 : numberString = "0" + numberString
        break;
        case 4 : numberString = numberString
        break
    }

    return numberString;
}

const MonthString = (month) => {
    var monthStr = month + ""
    if(monthStr.length == 1){
        monthStr = "0" + monthStr
    }

    return monthStr
}


exports.InsertPackeges = ErorrCache.ErrorCatchre(async(req,res,next) =>{     
    
     const Statu = req.body.Total_Failer_Packages === 0 ? "Seccess" : "Fail"
     let pathfile = "default"
    //  if(req.body.Total_Failer_Packages > 0 ){
    //      var wb = XLSX.utils.book_new()
    //      var ws = XLSX.utils.json_to_sheet(req.body.Package_Logs)
    //      XLSX.utils.book_append_sheet(wb,ws,"Log Data")
    //      pathfile = `Logs/LogsFile${Date.now()}-${req.user.id}.xlsx`
    //      XLSX.writeFile(wb,`Public/${pathfile}`)
    //  }

     const Upload = await req.user.createUpload({
        Shipment_Provider_Id: req.body.Shipment_Provider_Id,
        Total_Package: req.body.Total_Package,
        Total_Failer_Packages: req.body.Total_Failer_Packages,
        Total_Seccess_Packages: req.body.Total_Seccess_Packages,
        Status: Statu,
        LogsFile: `/public/${pathfile}`
     });

     const Package = await PackageInfo.findAll({ 
        order:[["id","DESC"]],
        limit : 1,
     })
    var Number
    var NumberString
    var Today = new Date(Date.now())
    if(Package.length === 0){
       Number = 0
    }else if(new Date(Package[0].dataValues.createdAt.getFullYear(), Package[0].dataValues.createdAt.getMonth() ,Package[0].dataValues.createdAt.getDate()) < new Date(Today.getFullYear() , Today.getMonth() , Today.getDate())){
          Number = 0;
   }
        
   if(Package.length === 1){
       NumberString = `${Package[0].Tracking_Number}`.split("-")[1]
       Number = parseInt(NumberString.slice(-4)) + 1
   }
    const packagesInfoArr = []
     req.body.Package_Seccuss.forEach(el => {
         
         el.UserId = req.user.id
         el.Customer = req.user.id
         el.First_Provider  = req.body.Shipment_Provider_Id
         el.Tracking_Number = `DX-${Today.getFullYear()}${MonthString(Today.getMonth())}${MonthString(Today.getDate())}${ToforeNumberString(Number)}`
         packagesInfoArr.push(el)
         Number++
     })
    
     const PackageInfoResult = await PackageInfo.bulkCreate(packagesInfoArr , {validate : true})

     const Status = await PackageStatus.findOne({where:{id : 1}})
     const Actions = await Action.findOne({where:{id:1}})
     const PayMethod = await PaymentMethod.findOne({where:{id:1}})
     const Workflows = await Workflow.findOne({where:{id : 1}})
     const PackageDeliArr = []
        PackageInfoResult.forEach(el => {
               var PackageObject = {}
               PackageObject.Package_id = el.id
               PackageObject.Shipment_Provider = req.body.Shipment_Provider_Id
               PackageObject.Package_Action = Actions.Action_Name
               PackageObject.Package_Workflow = Workflows.Workflow_Name
               PackageObject.Package_Status = Status.Status_Name
               PackageObject.Payment_Method = PayMethod.Payment_Method
               PackageObject.Amount_To_Collect = el.Price
               PackageDeliArr.push(PackageObject)
        })

     const Package_Delivery = await PackageDelivery.bulkCreate(PackageDeliArr , {validate: true})
     const Package_History = await PackageHistory.bulkCreate(PackageDeliArr , {validate: true})



     res.status(201)
     .json({
         status : "Seccuss",
         Upload
     })
});


exports.getLastUploadlast = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    const Fullpackege = await req.user.getUploads({
        order:[["createdAt","DESC"]],
        limit : 1
    });
    
   
    res.status(200)
    .json({
        status : "Seccuss"
    })
})


exports.getPakegesByUser = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    const allFullPackege = await req.user.getUploads();
    let allPackege = []
    let Ids = []

    allFullPackege.forEach(element => {
        Ids.push(element.id);
       element.getPackeges().then(data => {
           allPackege.push(data);

       }).catch(err =>  console.log(err))

    });


    res.status(200)
    .json({
        status : "Seccuss",
        body: Ids
    })
})


