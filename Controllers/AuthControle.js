const util = require("util");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Models/UserModel");
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");



const SignToken = id => {
    return JWT.sign({id : id},process.env.JWT_SICRIT,{expiresIn : process.env.JWT_TIMEOUT})
}


exports.singUp = ErorrCache.ErrorCatchre(async(req,res,next) =>{

    const username = req.body.username;
    const fullname = req.body.fullname;
    const role = req.body.role;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,12);
    const newUser =  await User.create
    ({
        Username: username,
        Email : email,
        Full_Name: fullname,
        Password:password,
        Role:role
    });


 const token = await SignToken(newUser.id)
   res.cookie("jwt",token,{
     expires :  new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
     httpOnly : true
   })

 res.status(201).
    json
    ({
        status : "Success",
        token
    })
});


exports.LogIn = ErorrCache.ErrorCatchre(async(req,res,next)=>{
  
  const {email,password} = req.body;
  if(!email || !password){
      
    return next(new Errors("Email or Password Requird",400));
}
  
  const user = await User.findOne({where : {Email : email}});
   
  const inCorrect = await bcrypt.compare(password,user.dataValues.Password)
 
  if(!user || !inCorrect){
    return next(new Errors("In found email or icorect password",401));
}


const token = await SignToken(user.id)
res.cookie("jwt",token,{
  expires :  new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  httpOnly : true
})

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
  let token = req.headers.authorization.split(" ")[1];

  if(!token){
      return  next(new Errors("Your token has expired! Please log in again", 401));
  }

  const decode = await util.promisify(JWT.verify)(token,process.env.JWT_SICRIT);
  const user = await User.findOne({where : {id : decode.id}});
   
    if(!user){
        return next(new Errors("This dosen't exist in more!",401));
    }

    // if(user.PassWordChanged(decode.iat)){
    //     return next(new Errors("Password Change,Please Login Again!",401));
    // }
  req.user = user.dataValues
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


exports.PasswordForgot = ErorrCache.ErrorCatchre(async(req,res,next)=>{
    const user = await Users.findOne({email:req.body.email});
    if(!user){
        return next(new Errors("User Didnt Found!!!",404));
    }
         const resetToken = user.createPasswordResetToken();
         await user.save({validateBeforeSave:false});
        
        const RestURL = `${req.protocol}://${req.get("host")}/api/V1/users/resetpassword/${resetToken}`;
        const message = `Hello ${user.username} click on this link : ${RestURL} for Reset Your compte If you forgot your Password Please D'ont do this !`
        try{   
             await EmailSender({
             email:user.email,
             subject: "Reset Your PassWord",
             message
         })        
        
        res.status(200)
        .json({
            status: "Success",
            message: "Cheke Your Email",
        });
    }
    catch(err)
    {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExp = undefined;
        await user.save({validateBeforeSave:false});
        next(new Errors(`Some Thing wrong With This Request ${err}`,500));
    }
    
});

exports.passwordReset = ErorrCache.ErrorCatchre(async(req,res,next) =>{
    const hashRestToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await Users.findOne({passwordResetToken:hashRestToken , passwordResetTokenExp :{$gt: Date.now()}});

    if(!user){
        return next(new Errors("User Dosont Exist",400));
    }
    
    user.passwordConfirmation = req.body.passwordConfirmation;
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExp= undefined;
    await user.save();

    const token = await SignToken(user._id)
    res.status(200).
    json
    ({
      status : "Success",
      token
    })
});

exports.UpdatePassword = ErorrCache.ErrorCatchre(async(req,res,next)=>{
    const user = await Users.findById(req.user.id).select("+password");

    if(!user.IsTheSame(req.body.currentPassword,user.password)){
        return next(new Errors("Password not Correct",400));
    }


    user.password = req.body.password;
    user.passwordConfirmation = req.body.passwordConfirmation;

    await user.save()

    const token = await SignToken(user._id)
    res.status(200).
    json
    ({
      status : "Success",
      token
    })

   
})