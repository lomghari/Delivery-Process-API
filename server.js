const detenv = require("dotenv");
const User = require("./Models/UserModel");
const Hub = require("./Models/HubModel");
const Upload = require("./Models/UploadModel")
const Packege = require("./Models/PackegeModel");
const db = require("./Util/Database");
detenv.config({path:`${__dirname}/config.env`});


User.belongsToMany(Hub,{through: "User_Hub"});
Hub.belongsToMany(User,{through: "User_Hub"});

Upload.belongsTo(User,{constraints:true,onDelete: "CASCADE"});
User.hasMany(Upload);

Packege.belongsTo(Upload,{constraints: true,onDelete:"CASCADE"});
Upload.hasMany(Packege);


Hub.belongsToMany(Packege,{through:"Packege_Hub"});
Packege.belongsToMany(Hub,{through:"Packege_Hub"})

// const createTable = async () => {
//     try {
//         // await db.sync({force: true})
//         // await db.sync()
//     } catch (error) {
//         console.log(error)
//     }
// }

const app = require("./app");


//  createTable();

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server Start")
})
