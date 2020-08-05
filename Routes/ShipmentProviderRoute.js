const RouteHub = require("express").Router();
const HubControle = require("../Controllers/ShipmentProviderControle")
const AuthControles = require("../Controllers/AuthControle")

RouteHub.route("/createhub").post(AuthControles.Checker,HubControle.CreateHub)
RouteHub.route("/").get(AuthControles.Checker,HubControle.GetHubs)


module.exports = RouteHub