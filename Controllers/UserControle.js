const User = require("../Models/UserModel")
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