var stream = require('stream');
 
const s3 = require('../config/s3.config.js');
var Result = require('../responses/result');
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	let keyname = req.file.originalname.split(".")[0] + "-" + Date.now() + '.jpg';

	params.Key = keyname;
	params.Body = req.file.buffer;
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		console.log('File uploaded successfully! -> keyname = ' + keyname)
		res.json({message: 'File uploaded successfully! -> keyname = ' + keyname});
		
	});
}