const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("../dbconfig/mysql");

var Result = require("../responses/result");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const authorized = require("../middleware/authorization").authorized;

router.get('/order',authorized, async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = 'call thesis.orderlistGet();';
        mysql.query(queryStatement).then((resp) => {
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

router.get('/pending',authorized, async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = 'call thesis.orderlistGetPending();';
        mysql.query(queryStatement).then((resp) => {
            result.error = false
            result.message = "List of pending order."
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
router.post('/order-checkout',authorized, async (req, res) => {
    var result = new Result()
    let data = req.body;
    try {
        var queryStatement = `call thesis.orderlistCheckout('${data.transNo}', '${data.cashier}');`;
        var pool = req.app.get('pool');
        pool.query(queryStatement, resp => {
            if (resp.error) {
                return res.json(resp)
            } else {
                if (resp.body.changedRows < 1) {
                    result.error = true
                    result.message = "Adding to checkout unsuccessfull."
                    return res.json({ result })
                }
                result.error = false
                result.message = "Successfully checkout."
                return res.json({ result })
            }
        })
    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

router.post('/order-pending',authorized, async (req, res) => {
    var result = new Result()
    let data = req.body;
    try {
        var queryStatement = `call thesis.orderlistAsPending('${data.transNo}', '${data.cashier}');`;
        var pool = req.app.get('pool');
        pool.query(queryStatement, resp => {
            console.log("pay: ",resp)
            if (resp.error) {
                return res.json(resp)
            } else {
                if (resp.body.changedRows < 1) {
                    result.error = true
                    result.message = "Adding to pending unsuccessfull."
                    return res.json({ result })
                }
                result.error = false
                result.message = "Successfully added to pending."
                return res.json({ result })
            }
        })
    } catch (err) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})


router.post('/order-pay',authorized, async (req, res) => {
    var result = new Result()
    let data = req.body;
    try {
        var queryStatement = `call thesis.orderlistPay('${data.transNo}', '${data.cashier}');`;
        var pool = req.app.get('pool');
        pool.query(queryStatement, resp => {
            if (resp.error) {
                return res.json(resp)
            } else {
                if (resp.body.changedRows < 1) {
                    result.error = true
                    result.message = "Payment unsuccessfull."
                    return res.json({ result })
                }
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

module.exports = router;

