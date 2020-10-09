const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("../dbconfig/mysql");

var Result = require("../responses/result");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const authorized = require("../middleware/authorization").authorized;

router.get('/order', authorized, async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = 'call thesis.orderlistGet();';
        mysql.query(queryStatement).then((resp) => {
            console.log("Order List : ", resp[0])
            result.error = false
            result.message = "List of all order."
            result.body = resp[0];
            res.json({ result })
        }).catch((err) => {
            result.error = true
            result.message = err;
            res.json({ result })
        })

    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

router.delete('/order/:transNo', authorized, async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = `call thesis.orderlistDelete('${req.params.transNo}');`;
        var pool = req.app.get('pool');
        pool.query(queryStatement, resp => {
            if (resp.error) {
                return res.json(resp)
            } else {
                result.error = false
                result.message = "Successfully placed order."
                return res.json({ result })
            }

        })

    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

//`${url}/order/${transNo}`
module.exports = router;

//INSERT INTO thesis.cart(custid, productid, quantity ,status) VALUES (1,1,2,'added');
