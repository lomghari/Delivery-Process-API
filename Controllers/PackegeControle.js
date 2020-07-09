const Sequelize = require("sequelize");
const ErorrCache = require("../Util/ErrorCatch");
const Errors = require("../Util/ErrorAPI");
const Packege = require("../Models/PackegeModel");
const Upload = require("../Models/UploadModel");


exports.InsertPackeges = ErorrCache.ErrorCatchre(async (req,res,next) =>{     
    console.log(req.user)
     const FullPackege = await req.user.createUpload({
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


exports.getLastUploadlast = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    const Fullpackege = await req.user.getUploads({
        order:[["createdAt","DESC"]],
        limit : 1
    });
    
   
    res.status(200)
    .json({
        status : "Seccuss",
        body: Fullpackege
    })
})


exports.getPakegesByUser = ErorrCache.ErrorCatchre(async (req,res,next)=>{
    const allFullPackege = await req.user.getUploads();
    let allPackege = []
    let Ids = []

    allFullPackege.forEach(element => {
        Ids.push(element.id);
       element.getPackeges().then(data => {
           allPackege.push(data);

       }).catch(err =>  console.log(err))

    });


    res.status(200)
    .json({
        status : "Seccuss",
        body: Ids
    })
})


