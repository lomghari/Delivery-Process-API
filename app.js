const express = require("express");
const app = express();
const morgan = require("morgan");
const Errorapi = require("./Util/ErrorAPI");
const GRH = require("./Controllers/ErrorControle");
app.use(express.json());

app.use(morgan());

const RouteUser = require("./Routes/UserRoute");
const RoutePackege = require("./Routes/PackegeRoute")

app.use('/api/v1/users',RouteUser);
app.use("/api/v1/packege",RoutePackege);


app.all('*',(req,res,next)=>{
next(new Errorapi(`This Url ${req.originalUrl} doesn't exist`,404));
});

app.use(GRH.GlobalErrorHandler);

module.exports = app;