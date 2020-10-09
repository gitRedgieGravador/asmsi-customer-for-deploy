const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("../dbconfig/mysql");

var Result = require("../responses/result");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var result = new Result();
const authorized = require("../middleware/authorization").authorized;
const NodePrint = require("../controllers/printing.control")

router.get("/print", (req, res)=>{
    let data = {
        test: "test"
    }
    let printer = new NodePrint()
    try {
        printer.print(data,response=>{
            res.json({response})
        })
    } catch (error) {
        res.json({error})
    }
})

module.exports = router;