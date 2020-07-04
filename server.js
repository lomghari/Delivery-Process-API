const detenv = require("dotenv");
const User = require("./Models/UserModel");
const Hub = require("./Models/HubModel");
const Upload = require("./Models/UploadModel")
const Packege = require("./Models/PackegeModel");
//const UserHub = require("./Models/UserHubModel")
const db = require("./Util/Database");
detenv.config({path:`${__dirname}/config.env`});


User.belongsToMany(Hub,{through: "UserHub"});
Hub.belongsToMany(User,{through: "UserHub"});


const createTable = async () => {
    try {
      
        await db.sync({force : true})
    } catch (error) {
        
    }
}

const app = require("./app");


 createTable();
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    
})
