const Sequelize = require("sequelize");
const XLSX = require("xlsx")
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");
const PackageInfo = require("../Models/PackagesInfoModel")
const PackageDelivery = require("../Models/PackagesDeliveryModel")
const PackageHistory = require("../Models/PackagesHistoryModel")
const Tracking = require("../Util/Tracking_Number");
const { sync } = require("../Models/PackagesInfoModel");


exports.InsertPackeges = ErorrCache.ErrorCatchre(async(req,res,next) =>{   
    const PackagesInfoArr = []
    req.body.Package_Seccuss.forEach(el => {    
        el.First_Provider  = req.body.Shipment_Provider_Id
        PackagesInfoArr.push(el)
    });

    req.SuccessPackage = []
    req.DuplicateArray = []

    PackagesInfoArr.forEach(async(el,i) => {
        try {
            const PackageInfoo = await req.user.createPackagesInfo(el)
            req.SuccessPackage.push(PackageInfoo)
        } 
        catch (error) {
            req.DuplicateArray.push(el)
        }
        
        if(i === PackagesInfoArr.length - 1){
            next();
        }
    })

    
});

exports.InsertInDelivryAndHistory = ErorrCache.ErrorCatchre(async(req,res,next) => {
     if(req.SuccessPackage.length === 0){
       return next();   
     }

     req.SuccessPackage.forEach(async(el,i)=>{
         await el.createPackagesDelivery({
            Shipment_Provider: req.body.Shipment_Provider_Id,
            Amount_To_Collect: el.Price,
            UpdateBy: req.user.id 
         })

         await el.createPackagesHistory({
            Shipment_Provider: req.body.Shipment_Provider_Id,
            Amount_To_Collect: el.Price,
            UpdateBy: req.user.id
         })

        if(i === req.SuccessPackage.length - 1){
            next();
        }
     })
    
})


exports.LogFileCreation = ErorrCache.ErrorCatchre(async (req,res,next) => {
    req.LogsArray = []
    if(req.DuplicateArray.length === 0 && req.body.Package_Logs.length === 0){
        return next()
    }

    req.DuplicateArray.forEach(element => {
        element.First_Provider = undefined
        element.Tracking_Number = undefined
        element.Logs = "Package Duplicated"
    })
        req.LogsArray = [...req.DuplicateArray,...req.body.Package_Logs]
    //  if(req.body.Total_Failer_Packages > 0 ){
    //      var wb = XLSX.utils.book_new()
    //      var ws = XLSX.utils.json_to_sheet(req.body.Package_Logs)
    //      XLSX.utils.book_append_sheet(wb,ws,"Log Data")
    //      pathfile = `Logs/LogsFile${Date.now()}-${req.user.id}.xlsx`
    //      XLSX.writeFile(wb,`Public/${pathfile}`)
    //  }


    next();
});



exports.Upload = ErorrCache.ErrorCatchre(async (req,res,next)=>{

    const Upload = await req.user.createUpload({
       Shipment_Provider_Id: req.body.Shipment_Provider_Id,
       Total_Package: req.body.Total_Package,
       Total_Failer_Packages: req.LogsArray.length,
       Total_Seccess_Packages: req.SuccessPackage.length,
       Status: req.LogsArray.length === 0 ? "Success" : "Fail"
    });
    
    req.Upload = Upload
  
    if(req.SuccessPackage.length === 0){
        return next()
    }

    const Package = await PackageInfo.findOne({ 
        order:[["id","DESC"]],
        limit : 1,
        where:{
            Tracking_Number : {
                [Sequelize.Op.ne]: null
            }
        }
     })
    var Number
    var NumberString
    var Today = new Date(Date.now())
    console.log(Today.getMonth())
    if(!Package){
       Number = 0
    }else if(new Date(Package.createdAt.getFullYear(), Package.createdAt.getMonth() ,Package.createdAt.getDate()) < new Date(Today.getFullYear() , Today.getMonth() , Today.getDate())){
        Number = 0;
    }else{
        NumberString = `${Package.Tracking_Number}`.split("-")[1]
        Number = parseInt(NumberString.slice(-4)) + 1
    }


    req.SuccessPackage.forEach(async(el,i)=>{
        await el.update({
            UploadId : Upload.id,
            Tracking_Number: `DX-${Today.getFullYear()}${Tracking.MonthString(Today.getMonth() + 1)}${Tracking.MonthString(Today.getDate())}${Tracking.ToforeNumberString(Number + i)}`
        })
        if(i === req.SuccessPackage.length - 1){
            next();
        }
    })

})



exports.UploadRenderResponse = ErorrCache.ErrorCatchre(async(req,res,next)=>{
    res.status(201)
    .json({
        Status: "Success",
        Data:{
         Upload   : req.Upload,
         LogsData : req.LogsArray
        }    
    })
})

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


exports.getPakeges = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    req.allFullPackege
    req.allHistory = {}
    if (req.user.Role === "Customer") {
        req.allFullPackege = await req.user.getPackagesInfos({
                          order:[['id','DESC']],
                          limit: 100
                      });
    //   if(req.query.Tracking_Number){
    //       req.query.Tracking_Number
    //           req.allFullPackege = await req.user.getPackagesInfos({
    //               where:{
    //                   Tracking_Number : {
    //                       [Sequelize.Op.like] : `%${req.query.Tracking_Number}%`
    //                   }
    //               },
    //               order:[['id']]
    //           });
    //    }
    //    if(req.query.Referance){
    //            req.allFullPackege = await req.user.getPackagesInfos({
    //                where:{
    //                    Referance : {
    //                        [Sequelize.Op.like] : `%${req.query.Referance}%`
    //                    }
    //                },
    //                order:[['id']]
    //            });
    //    }
    //     if(req.query.Phone_Number){
    //         req.allFullPackege = await req.user.getPackagesInfos({
    //             where:{
    //                 Phone_Number : {
    //                     [Sequelize.Op.like] : `%${req.query.Phone_Number}%`
    //                 }
    //             },
    //             order:[['id']]
    //         });
    //     }       
    }else{
        req.allFullPackege = await PackageInfo.findAll({
                            order:[['id','DESC']],
                            limit: 100
                    });
        // if(req.query.Tracking_Number){
        //     req.query.Tracking_Number
        //         req.allFullPackege = await PackageInfo.findAll({
        //             where:{
        //                 Tracking_Number : {
        //                     [Sequelize.Op.like] : `%${req.query.Tracking_Number}%`
        //                 }
        //             },
        //             order:[['id']]
        //         });
        //  }
        //  if(req.query.Referance){
        //          req.allFullPackege = await PackageInfo.findAll({
        //              where:{
        //                  Referance : {
        //                      [Sequelize.Op.like] : `%${req.query.Referance}%`
        //                  }
        //              },
        //              order:[['id']]
        //          });
        //  }
        //   if(req.query.Phone_Number){
        //       req.allFullPackege = await PackageInfo.findAll({
        //           where:{
        //               Phone_Number : {
        //                   [Sequelize.Op.like] : `%${req.query.Phone_Number}%`
        //               }
        //           },
        //           order:[['id']]
        //       });
        //   }       
    }
    
    req.allFullPackege.forEach(async (el,i) => {
        try{

            let PackagesHistory = await PackageHistory.findAll({
                where : {
                    Package: el.id
                },
                order:[['id']]
            })

            req.allHistory[el.id] = PackagesHistory
            if(i === req.allFullPackege.length - 1){
                next()
            } 
        }catch(err){
            console.error(err)
        }
    })    

})

exports.ProssecingPackageHestory = ErorrCache.ErrorCatchre( async (req, res, next)=>{
    req.PackagesHistoryPross = {}
    for (const el in req.allHistory) {
        req.PackagesHistoryPross[el] = []
        req.allHistory[el].forEach( async (element , i) => {
            try {
               var PackageHistoryToSend = {}
               var statusName = await element.getPackagesStatus()
               var WorkflowName = await element.getWorkflow()
               var usernames = await element.getUser()
               var PaymentMethodName = await element.getPaymentMethod()
               var HubName = await element.getShipmentProvider()
               var ActionName = await element.getAction()

               
               PackageHistoryToSend.Amount_To_Collect = element.Amount_To_Collect
               PackageHistoryToSend.Delivery_Run_Number = element.Delivery_Run_Number
               PackageHistoryToSend.Driver = element.Driver
               PackageHistoryToSend.Attempts = element.Attempts
               PackageHistoryToSend.Master_Bag_Number = element.Master_Bag_Number
               PackageHistoryToSend.Location = element.Location
               PackageHistoryToSend.createdAt = element.createdAt
               PackageHistoryToSend.Package_Action = ActionName.Action_Name
               PackageHistoryToSend.Shipment_Provider = HubName.Provider_Name
               PackageHistoryToSend.Payment_Method = PaymentMethodName.Payment_Method
               PackageHistoryToSend.Package_Workflow = WorkflowName.Workflow_Name
               PackageHistoryToSend.UpdateBy = usernames.Username
               PackageHistoryToSend.Package_Status = statusName.Status_Name

               req.PackagesHistoryPross[el].push(PackageHistoryToSend)

               if(el === Object.keys(req.allHistory)[Object.keys(req.allHistory).length - 1] && i === req.allHistory[el].length - 1 ){
                next()
               }
            } catch (error) {
                console.log(error)
            }
        })
    }
})

exports.GetPendingPackage = ErorrCache.ErrorCatchre(async (req, res, next) => {
    const Packages = await PackageDelivery.findAll({
        where: {
            Package_Status: 1
        },
        order: [['createdAt','DESC']],
        attributes: ['id','UpdateBy','Package_Status','createdAt']
        
    })
    if (!Packages) {
      return next(new Errors("Package Pending Dosent Found",400))
    }

    res.status(200)
    .json({
        Status: "Seccuss",
        Packages
    })
})


exports.UpdatePackagesStatus = ErorrCache.ErrorCatchre( async (req,res,next) => {
    console.log("hola") 
    const Packages = await PackageInfo.findAll({
        where: {
            id:{
                [Sequelize.Op.in] : req.body.PackagesToChange
            }
        }
    })
    Packages.forEach( async (el, i ) => {
     const packageDelivry = await el.getPackagesDelivery()
     const PackageDeliveryUpdate = await packageDelivry.update({
        Package_Status :req.body.PackageStatus ,
        UpdateBy: req.user.id,
        Driver: req.body.Driver
      })
      PackageDeliveryUpdate.dataValues.createdAt = undefined
      PackageDeliveryUpdate.dataValues.updatedAt = undefined
      PackageDeliveryUpdate.dataValues.id = undefined
      await el.createPackagesHistory(PackageDeliveryUpdate.dataValues)

      if(i === Packages.length - 1) {
        next()
      }
    })
})

exports.UpdatePackagesStatusRes = ErorrCache.ErrorCatchre( async (req, res, next) =>{
    res.status(200)
    .json({
        Status: 'Seccuss'
    })
})

exports.RenderPackageSearch = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    res.status(200)
    .json({
        status : "Seccuss",
        allFullPackege : req.allFullPackege,
        allHistory : req.PackagesHistoryPross
    })
})