const RouteUser = require("express").Router();
const AuthControle = require("../Controllers/AuthControle");
const UserControle = require("../Controllers/UserControle")

RouteUser.route("/singupadmin").post(AuthControle.singUp);
RouteUser.route("/login").post(AuthControle.LogIn);

RouteUser.route("/").get(AuthControle.Checker,UserControle.getUser)
RouteUser.route("/createuser").post(AuthControle.Checker,UserControle.CreateUser)


module.exports = RouteUser;