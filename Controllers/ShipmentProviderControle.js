const Sequelize = require("sequelize")
const ErrorCatch = require("../Util/ErrorCatch")
const Error = require("../Util/ErrorAPI")

const ShipmentProvider = require("../Models/ShipmentProviderModel")


exports.CreateHub = ErrorCatch.ErrorCatchre(async(req,res,next)=>{
    const NewHub = await ShipmentProvider.create(req.body);
    res.status(200).
    json
    ({
      status : "Success",
      NewHub
    }) 
})


exports.UpdateHub= ErrorCatch.ErrorCatchre(async(req,res,next)=>{

})


exports.GetHub= ErrorCatch.ErrorCatchre(async(req,res,next)=>{
     
})

exports.GetHubs= ErrorCatch.ErrorCatchre(async(req,res,next)=>{
    const Hubs = await ShipmentProvider.findAll();

    res.status(200).
    json
    ({
      status : "Success",
      Hubs
    })
})

exports.DeleteHub = ErrorCatch.ErrorCatchre(async(req,res,next)=>{

})




