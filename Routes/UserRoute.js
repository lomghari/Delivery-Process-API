const RouteUser = require("express").Router();
const AuthControle = require("../Controllers/AuthControle");

RouteUser.route("/singup").post(AuthControle.singUp);

RouteUser.route("/login").post(AuthControle.LogIn);





module.exports = RouteUser;