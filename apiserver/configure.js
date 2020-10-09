const bodyParser = require('body-parser')
// const api = require('./app.js')

const routeAuth = require("./routes/auth");
const routelocal = require("./routes/localUpload");
const routeupload = require("./routes/upload");
const routeProducts = require("./routes/products");
const routeUsers = require("./routes/users");
const routeSales = require("./routes/salesReport");
const routeOrders = require("./routes/orderList");
const routeCategory = require("./routes/category");
const routeCart = require("./routes/cart");
let uploadRouter = require('./routes/upload.router.js');
let printRoute = require('./routes/printing.router.js');
const mysql = require("./dbconfig/mysql");
const { resolve } = require('path')
const history = require('connect-history-api-fallback')
const { PORT = 3232 } = process.env
const express = require('express')
module.exports = app => {
  app.use(bodyParser.json())
  // app.use('/api', api)
  app.use(routeAuth);
  app.use(routelocal);
  app.use(routeupload);
  app.use(routeProducts);
  app.use(routeUsers);
  app.use(routeSales);
  app.use(routeOrders);
  app.use(routeCategory);
  app.use(routeCart);
  app.use(uploadRouter);
  app.use(printRoute);

  const publicPath = resolve(__dirname, '../dist')
  const staticConf = { maxAge: '1y', etag: false }

  app.use(express.static(publicPath, staticConf))
  app.use('/', history())
  // Go
  app.listen(PORT, function () {
    // console.log(`\n.....Api server listening on port:${port}.....`);
    mysql
      .connectNOW()
      .then(success => {
        if (success) {
          console.log(".....Successfully Connected to MySql.....", PORT);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  const MySql = require("./dbconfig/pool")
  const pool = new MySql()

  app.set('pool', pool);
}