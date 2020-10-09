const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require("../awsconfig").config()

aws.config.update(config);

const s3 = new aws.S3()

//var result = require('../responses/result');

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'asmsi-photos',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let name = file.originalname.split(".")[0]
            cb(null, name + "-" + Date.now() + '.jpg')
        }
    })
})



router.post('/upload', upload.single('image'), function (req, res) {
    var result = new Result();
    result.message = "Photo Uploaded successfully."
    result.body = {
        image: req.file.filename
    }
    res.json({ result })
})

 
module.exports = router;

