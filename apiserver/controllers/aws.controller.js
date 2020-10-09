var stream = require('stream');

const s3 = require('../config/s3.config.js');
var Result = require('../responses/result');
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	let keyname = req.file.originalname.split(".")[0] + "-" + Date.now() + '.jpg';

	params.Key = keyname;
	params.Body = req.file.buffer;
	var result = new Result();
	s3Client.upload(params, (err, data) => {
		if (err) {
			result.error = true
			result.message = err
			res.json({ result })
		}
		console.log('File uploaded successfully! -> keyname = ' + keyname)
		result.error = false
		result.message = "Image uploaded successfully! keyname: " + keyname 
		result.body = {
			file_url: `https://asmsi-photos.s3.amazonaws.com/${keyname}`,
		}
		res.json({ result })

	});
}