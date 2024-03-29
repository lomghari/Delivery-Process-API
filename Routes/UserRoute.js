const RouteUser = require("express").Router();
const AuthControle = require("../Controllers/AuthControle");
const UserControle = require("../Controllers/UserControle")

RouteUser.route("/singupadmin").post(AuthControle.singUp);
RouteUser.route("/login").post(AuthControle.LogIn);

RouteUser.route("/user").get(AuthControle.Checker,UserControle.getUser).patch(AuthControle.Checker,UserControle.UpdateUser).delete(AuthControle.Checker,UserControle.DeleteUser)
RouteUser.route("/active").patch(AuthControle.Checker,UserControle.ActiveUser)
RouteUser.route("/desactive").patch(AuthControle.Checker,UserControle.DesactiveUser)
RouteUser.route('/').get(AuthControle.Checker,UserControle.getAllUser).patch(AuthControle.Checker, UserControle.UpdateUsers)
RouteUser.route("/createuser").post(AuthControle.Checker,UserControle.CreateUser)
RouteUser.route("/riders").get(AuthControle.Checker, UserControle.getRider)

module.exports = RouteUser;