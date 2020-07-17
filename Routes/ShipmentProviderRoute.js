const RouteHub = require("express").Router();
const HubControle = require("../Controllers/ShipmentProviderControle")


RouteHub.route("/createhub").post(HubControle.CreateHub)
RouteHub.route("/").get(HubControle.GetHubs)


module.exports = RouteHub