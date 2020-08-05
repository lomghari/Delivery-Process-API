const Sequelize = require("sequelize")
const ErrorCatch = require("../Util/ErrorCatch")
const Error = require("../Util/ErrorAPI")

const ShipmentProvider = require("../Models/ShipmentProviderModel")
const User = require('../Models/UserModel')

exports.CreateHub = ErrorCatch.ErrorCatchre(async(req,res,next)=>{
    const NewHub = await ShipmentProvider.create(req.body);
    const AllUser = await User.findAll({
      where: {
        Role : {
          [Sequelize.Op.ne]: "Customer"
        }
      }
    })
    
    if(AllUser){
      await NewHub.setUsers(AllUser)
    }
    
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
    const Hubs = await req.user.getShipmentProviders()
    res.status(200).
    json
    ({
      status : "Success",
      Hubs
    })
})

exports.DeleteHub = ErrorCatch.ErrorCatchre(async(req,res,next)=>{

})




