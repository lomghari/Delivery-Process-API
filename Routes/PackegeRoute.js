const RoutePackege = require("express").Router();
const PackegeControle = require("../Controllers/PackegeControle");

RoutePackege.route("/insertmany").post(PackegeControle.InsertPackeges);






module.exports = RoutePackege;