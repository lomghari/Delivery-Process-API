const Sequelize = require("sequelize");
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");
const Packege = require("../Models/PackegeModel");
const Upload = require("../Models/UploadModel");


exports.InsertPackeges = ErorrCache.ErrorCatchre(async (req,res,next) =>{
    
    
     const FullPackege = await Upload.create({
         fullpackege: req.body.fullpackege,
         numberofpackege : req.body.packeges.length  
     });
    
     const Packeges = await Packege.bulkCreate(req.body.packeges);

     res.status(201)
     .json({
         status : "Seccuss",
         body : Packeges
     })

});



