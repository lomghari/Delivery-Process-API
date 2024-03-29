const Sequelize = require('sequelize')
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel")
const ShipmentProvader = require("../Models/ShipmentProviderModel")
const Error = require("../Util/ErrorAPI")
const ErrorCatch = require("../Util/ErrorCatch");


exports.getUser =ErrorCatch.ErrorCatchre(async(req,res,next)=>{
    const user = await User.findOne(
        {
            where:
            {
                Username : req.user.dataValues.Username
            },
            attributes: {
                exclude: ['Password']
            }
        })
    await user.update({
        Last_Login : Date.now()
    })
    res.status(200)
    .json({
        Status: "Seccess",
        user
    })
});


exports.CreateUser = ErrorCatch.ErrorCatchre( async (req,res,next)=>{
    const password = await bcrypt.hash(req.body.password,12);
    const newUser =  await User.create
    ({
        Username: req.body.username,
        Email : req.body.email,
        Full_Name: req.body.fullname,
        Password:password,
        Role:req.body.role
        
    });

    const AllHub = await ShipmentProvader.findAll({
        where:{
           id:{
               [Sequelize.Op.in] : req.body.HubIds
           }
        }
    })

    if(AllHub){
      await newUser.setShipmentProviders(AllHub)
    }

    res.status(201)
    .json({
        Status : "Seccess"
    })
})


exports.UpdateUser = ErrorCatch.ErrorCatchre(async (req,res,next) => {

    await req.user.update(req.body)
    res.status(200)
    .json({
        Status : "Seccess"
    })
})

exports.getAllUser = ErrorCatch.ErrorCatchre(async (req,res,next)=> {
    const Users = await User.findAll({
        attributes: {
            exclude: ['Password']
        },
        include: {
            model: ShipmentProvader,
            required: true
        }
    })

    res.status(200)
    .json({
        Status: "Seccess",
        Users
    })
})
exports.UpdateUsers = ErrorCatch.ErrorCatchre(async (req, res, next)=>{
    const UserUpdate = await User.findOne({
        where: {
            id: req.body.Ids
        }
    })
    if(req.body.AddHubs.length !== 0) {
        const AllHub = await ShipmentProvader.findAll({
            where:{
               id:{
                   [Sequelize.Op.in] : req.body.AddHubs
               }
            }
        })

        await UserUpdate.addShipmentProviders(AllHub)
    }

    if(req.body.RemovedHubs.length !== 0) {
        const AllHubR = await ShipmentProvader.findAll({
            where:{
               id:{
                   [Sequelize.Op.in] : req.body.RemovedHubs
               }
            }
        })

        await UserUpdate.removeShipmentProviders(AllHubR)
    }

    const UpdatedUser = await UserUpdate.update(req.body.User)
    const HubsUser = await UpdatedUser.getShipmentProviders()
    await UpdatedUser.update({Current_Provider: HubsUser[0]})

    res.status(200)
    .json({
        status: 'Seccess',
        UserUpdate
    })
})
exports.DesactiveUser = ErrorCatch.ErrorCatchre(async (req,res,next)=>{
 const user = await User.findOne({
        where: {
            id: req.body.id
        }
    })
  user.Status = false
            await user.save()
  res.status(200)
  .json({
      status: 'Seccess'
  })
})


exports.ActiveUser = ErrorCatch.ErrorCatchre(async (req,res,next)=>{
    const user = await User.findOne({
           where: {
               id: req.body.id
           }
       })
     user.Status = true
               await user.save()
     res.status(200)
     .json({
         status: 'Seccess'
     })
   })

   exports.DeleteUser = ErrorCatch.ErrorCatchre(async (req,res,next)=>{
    const user = await User.findOne({
           where: {
               id: req.body.id
           }
       })
    await user.destroy()
     res.status(200)
     .json({
         status: 'Seccess'
     })
   })

   exports.getRider = ErrorCatch.ErrorCatchre(async (req, res, next) => {
       const Riders = await User.findAll({
           where: {
               Role: 'Rider'
           },
           attributes: ['Username','id']
       })
       
       if (Riders.length === 0) {
          return next(new Error("Aucan Rider in this hub",404))
       }

       res.status(200)
       .json({
           Status: "Success",
           Riders
       })
   })
   