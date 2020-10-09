const AWS = require('aws-sdk');
const config = require("./awsconfig").config()

AWS.config.update(config);

function sendSMS(to_number, message) {
    return new AWS.SNS({ apiVersion: '2010-03-31' }).publish({
        Message: message,
        Subject: 'Admin',
        PhoneNumber: to_number,
        MessageStructure: 'string',
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: "ASMSI"
            },
            'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: "Promotional"
            }
        }
    }).promise();
}


// implementation of send service
// sendSMS("+639618034087", "message here.").then(resp => {
//     console.log("then: @1st ", resp)
// }).catch(err => {
//     console.log("err: ", err)
// })




module.exports = sendSMS;


/*
var aws = require('aws-sdk')
var config = require('./config');

aws.config.update({
    region: config.sns.region,
    accessKeyId: config.sns.accessKeyId,
    secretAccessKey: config.sns.secretAccessKey
});

var sns = new aws.SNS();
sns.setSMSAttributes({
    attributes: { DefaultSMSType: "Transactional" }
},
function (error) {
    if (error) {
        console.log(error);
    }
});

function sendSms(phoneNumber, body) {
    console.log(`Sending SMS. Phone: ${phoneNumber}, body: ${body}`);
    var params = {
        Message: body,
        MessageStructure: 'string',
        PhoneNumber: phoneNumber
    };

    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });
}



module.exports = {
    sendSms: sendSms,
}

*/