const ErrorApi = require("../Util/ErrorAPI");

const HandlingCatchRongId = (err) =>{
 const message = `wrong ${err.path} : ${err.value._id}`;
 return new ErrorApi(message,400);
}


const HandlingDuplicatioError = (err) => {
  return new ErrorApi(` ${err.original.sqlMessage} `,400);
}

const HandlingValidation=(err)=>{
  const errors = Object.values(err.errors).map(el => el.properties.message);
  const message = `Invalid ${errors.join(".  ")} `;
  return  new ErrorApi(message,400);
}

const HandlingJWTError = () => new ErrorApi("Invalid Token , Please Login Again!",401);
const HandlingJWTExpiration = () => new ErrorApi("Token has Expiration, Please Login Again!",401);
const ErrorToSendDev = (err,res) =>
{
  res.status(err.statusCode)
  .json({
    status: err.status,
    message: err.message,
    error : err,
    name: err.name,
    stack : err.stack,
    errr:
    {
      err
    }
  })
}

const ErrorToSendProd = (err,res) =>{
  if(err.IsOperational){
    res.status(err.statusCode)
    .json({
      status: err.status,
      message: err.message,
    })
  }else{
    console.error("error :boom:",err);
    res.status(500)
    .json({
      status: "Error",
      message: "Chabka :boom: Thie thing Rowng",
    })

  }
}



const ErrorRequireField = (err)=>{
  err.error.map(el => el.message)
}





exports.GlobalErrorHandler = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    if(process.env.NODE_ENV === "development"){
     
      ErrorToSendDev(err,res);
    }
    else if(process.env.NODE_ENV === "production"){
      let error = Object.assign(err);
      if(error.name === "CastError") error = HandlingCatchRongId(error);
      if(error.original.sqlState == 23000){
           error = HandlingDuplicatioError(error);
      } 
        
      if(error.name === "ValidationError") error = HandlingValidation(error);
      if(error.name === "JsonWebTokenError") error = HandlingJWTError();
      if(error.name === "TokenExpiredError") error= HandlingJWTExpiration();
      ErrorToSendProd(error,res);
    }
    }