const util = require("util");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Models/UserModel");
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");



const SignToken = username => {
    return JWT.sign({id : username},process.env.JWT_SICRIT,{expiresIn : process.env.JWT_TIMEOUT})
}


exports.singUp = ErorrCache.ErrorCatchre(async(req,res,next) =>{

    const username = req.body.username;
    const fullname = req.body.fullname;
    const role = req.body.role;
    const password = await bcrypt.hash(req.body.password,12);
    const newUser = await User.create
    ({
        username: username,
        fullname: fullname,
        password:password,
        role:role
    });


 const token = await SignToken(newUser.username)
 res.status(201).
    json
    ({
        status : "Success",
        token,
        data : 
        {
            newUser
        }
    })
});


exports.LogIn = ErorrCache.ErrorCatchre(async(req,res,next)=>{
  const {username,password} = req.body;

  if(!username || !password){
      
    return next(new Errors("Email or Password Requird",400));
}
  
  const user = await User.findAll({where : {username : username}});
 
  const inCorrect = await bcrypt.compare(password,user[0].dataValues.password)
 
  if(!user || !inCorrect){
    return next(new Errors("In found email or icorect password",401));
}
  const token = await SignToken(user.username)
  res.status(200).
  json
  ({
    status : "Success",
    token
  })
});

exports.Checker = ErorrCache.ErrorCatchre(async(req,res,next) => 
{
  if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
      return next(new Errors("Invalid token , Please login again",401));
  }

  const token = req.headers.authorization.split(" ")[1];

  if(!token){
      return  next(new Errors("Your token has expired! Please log in again", 401));
  }

  const decode = await util.promisify(JWT.verify)(token,process.env.JWT_SICRIT);
  const user = await User.findAll({where : {username : req.body.username}});
    if(!user){
        return next(new Errors("This dosen't exist in more!",401));
    }

    if(user.PassWordChanged(decode.iat)){
        return next(new Errors("Password Change,Please Login Again!",401));
    }
  
  req.user = user
 next();
});

exports.Pasport = (...roles) => {
    return (req,res,next) => {
     if(!roles.includes(req.user.role)){
         return next(new Errors("This is not for you",403));
     }
       next();
    }
}


// exports.PasswordForgot = ErorrCache.ErrorCatchre(async(req,res,next)=>{
//     const user = await Users.findOne({email:req.body.email});
//     if(!user){
//         return next(new Errors("User Didnt Found!!!",404));
//     }

  

//          const resetToken = user.createPasswordResetToken();
//          await user.save({validateBeforeSave:false});
        
//         const RestURL = `${req.protocol}://${req.get("host")}/api/V1/users/resetpassword/${resetToken}`;
//         const message = `Hello ${user.username} click on this link : ${RestURL} for Reset Your compte If you forgot your Password Please D'ont do this !`
//         try{   
//              await EmailSender({
//              email:user.email,
//              subject: "Reset Your PassWord",
//              message
//          })        
        
//         res.status(200)
//         .json({
//             status: "Success",
//             message: "Cheke Your Email",
//         });
//     }
//     catch(err)
//     {
//         user.passwordResetToken = undefined;
//         user.passwordResetTokenExp = undefined;
//         await user.save({validateBeforeSave:false});
//         next(new Errors(`Some Thing wrong With This Request ${err}`,500));
//     }
    
// });

// exports.passwordReset = ErorrCache.ErrorCatchre(async(req,res,next) =>{
//     const hashRestToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

//     const user = await Users.findOne({passwordResetToken:hashRestToken , passwordResetTokenExp :{$gt: Date.now()}});

//     if(!user){
//         return next(new Errors("User Dosont Exist",400));
//     }
    
//     user.passwordConfirmation = req.body.passwordConfirmation;
//     user.password = req.body.password;
//     user.passwordResetToken = undefined;
//     user.passwordResetTokenExp= undefined;
//     await user.save();

//     const token = await SignToken(user._id)
//     res.status(200).
//     json
//     ({
//       status : "Success",
//       token
//     })
// });

// exports.UpdatePassword = ErorrCache.ErrorCatchre(async(req,res,next)=>{
//     const user = await Users.findById(req.user.id).select("+password");

//     if(!user.IsTheSame(req.body.currentPassword,user.password)){
//         return next(new Errors("Password not Correct",400));
//     }


//     user.password = req.body.password;
//     user.passwordConfirmation = req.body.passwordConfirmation;

//     await user.save()

//     const token = await SignToken(user._id)
//     res.status(200).
//     json
//     ({
//       status : "Success",
//       token
//     })

   
// })