const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("../dbconfig/mysql");

var Result = require("../responses/result");
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

const authorized = require("../middleware/authorization").authorized;
router.post("/salesreport",  async (req, res) => {
    var result = new Result();
    var type = req.body.type;
    var clause = '';
    if(type === 'daily') {
      clause = 'Date( order_date ) =  Date( NOW() - INTERVAL 1 DAY )'
    }else if(type === 'weekly'){
      var lastdate = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - (new Date().getDay() + 2));
      var firstdate = new Date(lastdate.getFullYear(), lastdate.getMonth(), lastdate.getDate() - 6);
      clause = 'order_date >= "' +  firstdate.getFullYear() + '-' + (firstdate.getMonth() + 1) + '-' + firstdate.getDate() +
      ' '+ firstdate.getHours() + ':' + firstdate.getMinutes() + ':' + firstdate.getSeconds() + '" AND order_date <= "'  +  lastdate.getFullYear() + '-' +
      (lastdate.getMonth() + 1 ) + '-' + lastdate.getDate() + ' '+ lastdate.getHours() + ':' +lastdate.getMinutes() +':' +lastdate.getSeconds() + '" '      
    }else if(type === 'monthly'){
      clause = 'Month( order_date ) = Month( NOW() - INTERVAL 1 MONTH )'      
    }
    try {
      var queryStatement = 'SELECT prod.productname as name, SUM(sales.product_id * sales.price) as sales_total FROM salesreport sales RIGHT JOIN products prod ON sales.product_id = prod.productid where ' + clause +' group by product_id order by SUM(sales.product_id * sales.price) desc LIMIT 5';
      mysql
        .query(queryStatement)
        .then(resp => {
          result.error = false;
          result.message = type + " List of all product sales.";
          result.body = resp;
          res.json({
            result
          });
        })  
        .catch(err => {
          result.error = true;
          result.message = err;
          res.json({
            result
          });
        });
    } catch (err) {
      result.error = true;
      result.message = err;
      res.json({
        result
      });
    }
  });
  module.exports = router;












