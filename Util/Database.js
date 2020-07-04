const Sequelize = require("sequelize");


const sequelize = new Sequelize('admin_delivery','admin_delivery','delivery',{dialect:'mysql',  host: 'e-delivery.info'});

module.exports = sequelize;