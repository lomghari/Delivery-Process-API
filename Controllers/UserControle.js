const User = require("../Models/UserModel")
const Error = require("../Util/ErrorAPI")
const ErrorCatch = require("../Util/ErrorCatch");


exports.getUser =ErrorCatch.ErrorCatchre(async(req,res,next)=>{
        const user = User.findOne({where:{username : req.user.username}})
        res.status(200)
        .json({
            Status: "Seccess",
            user
        })
});


