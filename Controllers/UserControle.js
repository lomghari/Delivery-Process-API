const Sequelize = require('sequelize')
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel")
const ShipmentProvader = require("../Models/ShipmentProviderModel")
const Error = require("../Util/ErrorAPI")
const ErrorCatch = require("../Util/ErrorCatch");


exports.getUser =ErrorCatch.ErrorCatchre(async(req,res,next)=>{
    const user = await User.findOne({where:{Username : req.user.dataValues.Username}})
    await user.update({
        Last_Login : Date.now()
    })
    user.Password = undefined
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