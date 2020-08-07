const Sequelize = require("sequelize");


const sequelize = new Sequelize('admin_app','admin_app','123456x',{dialect:'mysql',  host: 'foorsa.ma'});
const sequelizeLocal = new Sequelize('gestion_app','root','mamak',{dialect:'mysql',  host: 'localhost'});
module.exports = sequelizeLocal;