const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("./dbconfig/mysql");
// const sqlEvents = require('./dbconfig/events')
console.log("been here..1")
app.use(cors());
console.log("been here..2")
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
console.log("been here..3")
app.use("/static", express.static(path.join(__dirname, "uploads")));
var Result = require("./responses/result");
console.log("been here..4")
const { resolve } = require('path')
const history = require('connect-history-api-fallback')
const publicPath = resolve(__dirname, '../../dist')
const staticConf = { maxAge: '1y', etag: false }

app.use(express.static(publicPath, staticConf))
app.use('/', history())


const routeAuth = require("./routes/auth");
app.use(routeAuth);
console.log("been here..5")
const routelocal = require("./routes/localUpload");
app.use(routelocal);
console.log("been here..6")
const routeupload = require("./routes/upload");
app.use(routeupload);
console.log("been here..7")
const routeProducts = require("./routes/products");
app.use(routeProducts);
console.log("been here..8")
const routeUsers = require("./routes/users");
app.use(routeUsers);
console.log("been here..9")

const routeSales = require("./routes/salesReport");
app.use(routeSales);
console.log("been here..10")
const routeOrders = require("./routes/orderList");
app.use(routeOrders);
console.log("been here..11")
const routeCategory = require("./routes/category");
app.use(routeCategory);
console.log("been here..12")
const routeCart = require("./routes/cart");
app.use(routeCart);
console.log("been here..13")
let uploadRouter = require('./routes/upload.router.js');
app.use(uploadRouter);
console.log("been here..14")
let printRoute = require('./routes/printing.router.js');
app.use(printRoute);
console.log("been here..15")
//routes here


var port = process.env.PORT || 3232;
var fetch = require("node-fetch");
app.get("/test-3", async (req, res) => {
  const url = "https://pokeapi.co/api/v2/pokemon/ditto";
  const response = await fetch(url);
  const json = await response.json();
  res.json({ json });
});
console.log("been here..16")
// const server = 
app.listen(port, function () {
  // console.log(`\n.....Api server listening on port:${port}.....`);
  mysql
    .connectNOW()
    .then(success => {
      if (success) {
        console.log(".....Successfully Connected to MySql.....", success);
      }
    })
    .catch(err => {
      console.log(err);
    });
});
console.log("been here..17")
const MySql = require("./dbconfig/pool")
const pool = new MySql()

app.set('pool', pool);
console.log("been here..18")
app.get("/", (request, response) => {
  var result = new Result();
  result.message = "Hello the deployment succeed!!";
  result.error = false
  response.json(result);
});

console.log("been here..19")
/*
const bcrypt = require("bcryptjs");
const tokenkey = thesis2020BG9;
const jwt = require("jsonwebtoken");

var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 12;
rule.minute = 2;

schedule.scheduleJob(rule, function() {
  console.log("Today is recognized by Rebecca Black!");
});


*/
