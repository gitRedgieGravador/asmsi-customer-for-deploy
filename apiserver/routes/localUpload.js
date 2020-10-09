const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Result = require('../responses/result')
const multer = require('multer')

const store = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, __dirname + '/../uploads');
        },
        filename: function(req, file, cb) {
            var name = file.originalname.split(".")[0]
            cb(null, name + "-" + Date.now() + '.jpg')
        }
    })
}

var upload = multer({
    storage: store.storage
});

router.post('/local-upload', upload.single('img'), function(req, res) {
    var result = new Result();
    result.message = "Photo Uploaded successfully."
    result.body = {
        image: req.file.filename
    }
    res.json({ result })
})

module.exports = router;