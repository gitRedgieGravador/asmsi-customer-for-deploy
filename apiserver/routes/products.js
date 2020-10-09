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

router.get("/products",  async (req, res) => {
  var result = new Result();
  try {
    var queryStatement = "SELECT * FROM products";
    mysql
      .query(queryStatement)
      .then(resp => {
        result.error = false;
        result.message = "List of all products.";
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

router.get("/products/:id",  async (req, res) => {
  var result = new Result();
  try {
    var id = req.params.id;
    var queryStatement = `SELECT * FROM products where productid=${id}`;
    mysql
      .query(queryStatement)
      .then(resp => {
        result.message = "List of all products. sp";
        result.body = resp[0];
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

router.post("/products", async (req, res) => {
  var result = new Result();
  try {
    var pro = req.body;
    var queryStatement = `INSERT INTO products(productname, description, price, img, stocks, category, minstock) 
            VALUES ('${pro.productname}','${pro.description}','${pro.price}','${pro.img}','${pro.stocks}','${pro.category}','${pro.minstock}')`;
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1) {
          result.error = true;
          result.message = "Product unsuccessfully added.";
          return res.json({
            result
          });
        }
        result.message = "Product successfully added.";
        result.body = resp;
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        result.body = null;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});

router.delete("/products/:productid", async (req, res) => {
  var result = new Result();
  try {
    var pro = req.params.productid;
    console.log("id: ", pro);
    var queryStatement = `DELETE FROM products WHERE productid = ${pro}`;
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1) {
          result.error = true;
          result.message = "Product unsuccessfully deleted.";
          return res.json({
            result
          });
        }
        result.message = "Product successfully deleted.";
        result.body = resp;
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        result.body = null;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});

router.put("/products", async (req, res) => {
  var result = new Result();
  try {
    var pro = req.body;
    var queryStatement = `UPDATE products SET productname='${pro.productname}',description='${pro.description}',
        price='${pro.price}',img='${pro.img}',stocks='${pro.stocks}',category='${pro.category}',minstock='${pro.minstock}' WHERE productid = ${pro.productid}`;
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp.affectedRows < 1 || resp.changedRows < 1) {
          result.error = true;
          result.message = "Product unsuccessfully updated.";
          return res.json({
            result
          });
        }
        result.message = "Product successfully updated.";
        result.body = resp;
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        result.body = null;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});

router.post("/search", async (req, res) => {
  var result = new Result();
  try {
    var pro = req.body;
    var queryStatement = `SELECT * FROM thesis.products where category like '%${pro.search}%';`;
    mysql
      .query(queryStatement)
      .then(resp => {
        if (resp == null) {
          result.error = true;
          result.message = "Nothing found.";
          return res.json({
            result
          });
        }
        result.message = "List of products with category " + pro.search;
        result.body = resp;
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        result.body = null;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});
router.post("/searchbychar", async (req, res) => {
  var result = new Result();
  try {
    var pro = req.body;
    var queryStatement = `call thesis.searchbychar('${pro.search}');`;
    mysql
      .query(queryStatement)
      .then(response => {
        var resp = response[0];
        if (resp == null) {
          result.error = true;
          result.message = "Nothing found.";
          return res.json({
            result
          });
        }
        result.message = "List of products with category " + pro.search;
        result.body = resp;
        return res.json({
          result
        });
      })
      .catch(err => {
        result.error = true;
        result.message = err;
        result.body = null;
        return res.json({
          result
        });
      });
  } catch (err) {
    result.error = true;
    result.message = err;
    return res.json({
      result
    });
  }
});
module.exports = router;

//INSERT INTO thesis.cart(custid, productid, quantity ,status) VALUES (1,1,2,'added');