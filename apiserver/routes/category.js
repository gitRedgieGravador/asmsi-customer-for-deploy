const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require('../dbconfig/mysql');

var Result = require('../responses/result');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/categories', async (req, res) => {
    var result = new Result()
    try {
        var queryStatement = 'SELECT * FROM categories';
        mysql.query(queryStatement)
            .then((resp) => {
                result.error = false
                result.message = "List of all categories."
                result.body = resp;
                res.json({ result })
            }).catch((err) => {
                result.error = true
                result.message = err;
                res.json({ result })
            })
    } catch (error) {
        result.error = true
        result.message = err;
        res.json({ result })
    }
})

router.post('/categories', async (req, res) => {
    var result = new Result()
    try {
        var cat = req.body
        var queryStatement = `INSERT INTO categories(category)
        VALUES ('${cat.category}')`
        mysql.query(queryStatement).then((resp) => {
            if (resp.affectedRows < 1) {
                result.error = true
                result.message = "Category unsuccessfully added."
                return res.json({ result })
            }
            result.message = "Category successfully added."
            result.body = resp;
            return res.json({ result })
        }).catch((err) => {
            result.error = true
            result.message = err;
            result.body = null;
            return res.json({ result })
        })
    } catch (error) {
        result.error = true
        result.message = err;
        return res.json({ result })
    }
})
module.exports = router;