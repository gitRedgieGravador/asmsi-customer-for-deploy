const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("../dbconfig/mysql");

var Result = require("../responses/result");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var result = new Result();
const authorized = require("../middleware/authorization").authorized;
router.post("/cart", authorized, async (req, res) => {
  var add = req.body;
  try {
    var queryStatement = `call thesis.cartInsert(${add.custid}, ${add.productid}, ${add.quantity});`;
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1) {
          result.error = true;
          result.message = "Already in the basket.";
          res.json({ result });
        }
        result.error = false;
        result.message = "Successfully added to basket.";
        result.body = resp;
        res.json({ result });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        res.json({ result });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    res.json({ result });
  }
});
router.get("/cart/:id", (req, res) => {
  try {
    var queryStatement = `call thesis.cartGet(${req.params.id});`;
    mysql
      .query(queryStatement)
      .then(resp => {
        result.error = false;
        result.message = "Cart for id: " + req.params.id;
        result.body = resp[0];
        res.json({ result });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        res.json({ result });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    res.json({ result });
  }
});

router.delete("/basket/:id", (req, res) => {
  var pool = req.app.get('pool');
  pool.query(`call thesis.cartDelete(${req.params.id});`, resp => {
    if (resp.error) {
      return res.json(resp)
    } else {
      if (resp.body.affectedRows < 1) {
        result.error = true
        result.message = "Failed to remove from basket."
        return res.json({ result })
      }
      result.error = false
      result.message = "Item successfully remove from basket."
      return res.json({ result })
    }
  })
})

router.put("/checkout/:id/:checkout", (req, res) => {
  var pool = req.app.get('pool');
  pool.query(`call thesis.checkout(${req.params.id},${req.params.checkout});`, resp => {
    if (resp.error) {
      return res.json(resp)
    } else {
      if (resp.body.affectedRows < 1) {
        result.error = true
        result.message = "Failed to checkout."
        return res.json({ result })
      }
      result.error = false
      result.message = "Item successfully checkedout."
      return res.json({ result })
    }

  })
})

router.put("/quantity/:id/:quan", (req, res) => {
  var pool = req.app.get('pool');
  pool.query(`call thesis.checkoutQuan(${req.params.id},${req.params.quan});`, resp => {
    if (resp.error) {
      return res.json(resp)
    } else {
      if (resp.body.affectedRows < 1) {
        result.error = true
        result.message = "Failed to update quan."
        return res.json({ result })
      }
      result.error = false
      result.message = "Item quantity successfully updated."
      return res.json({ result })
    }

  })
})

router.post("/place-order/:id", (req, res) => {
  var pool = req.app.get('pool');
  console.log("orderss..")
  pool.query(`call thesis.placeOrder(${req.params.id});`, resp => {
    if (resp.error) {
      console.log("orderss.." ,resp)
      return res.json(resp)
    } else {
      if (resp.body.affectedRows < 1) {
        console.log("orderss.. 1")
        result.error = true
        result.message = "Opps! Something went wrong. Please try again in few minutes."
        return res.json({ result })
      }
      console.log("orderss.. 2")
      result.error = false
      result.message = "Successfully placed order."
      return res.json({ result })
    }

  })
})
module.exports = router;

//INSERT INTO thesis.cart(custid, productid, quantity ,status) VALUES (1,1,2,'added');
