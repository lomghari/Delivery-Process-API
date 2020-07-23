const express = require("express");
var path = require('path');
const app = express();
const morgan = require("morgan");
const Errorapi = require("./Util/ErrorAPI");
const GRH = require("./Controllers/ErrorControle");
const compression = require("compression");

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, 'Public')));
app.use(morgan());
app.use(compression());

const RouteUser = require("./Routes/UserRoute");
const RoutePackege = require("./Routes/PackegeRoute")
const RouteHub = require("./Routes/ShipmentProviderRoute")

app.get("/",(req,res)=>{
    res.send("hello word");
})
app.use('/api/v1/users',RouteUser);
app.use("/api/v1/packege",RoutePackege);
app.use("/api/v1/hub",RouteHub)

app.all('*',(req,res,next)=>{
next(new Errorapi(`This Url ${req.originalUrl} doesn't exist`,404));
});

app.use(GRH.GlobalErrorHandler);

module.exports = app;