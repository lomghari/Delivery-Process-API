const RoutePackege = require("express").Router();
const PackegeControle = require("../Controllers/PackegeControle");
const AuthControle = require("../Controllers/AuthControle");




RoutePackege.route("/insertmany").post(AuthControle.Checker,PackegeControle.InsertPackeges,PackegeControle.InsertInDelivryAndHistory,PackegeControle.LogFileCreation,PackegeControle.Upload,PackegeControle.UploadRenderResponse);
RoutePackege.route("/getLastUpdate").get(AuthControle.Checker,PackegeControle.getLastUploadlast)


RoutePackege.route("/getpackege").get(AuthControle.Checker,PackegeControle.getPakeges,PackegeControle.RenderPackageSearch)


module.exports = RoutePackege;