const RoutePackege = require("express").Router();
const PackegeControle = require("../Controllers/PackegeControle");
const AuthControle = require("../Controllers/AuthControle");




RoutePackege.route("/insertmany").post(AuthControle.Checker,PackegeControle.InsertPackeges);
RoutePackege.route("/getLastUpdate").get(AuthControle.Checker,PackegeControle.getLastUploadlast)
//RoutePackege.route("/getPackege").get(AuthControle.Checker,PackegeControle.getPakegesByUser)


module.exports = RoutePackege;