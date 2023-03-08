const models = require('../../../database');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'REGION'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

async function getDonors(req, res) {
    console.log(models);
    try {
        return models.Donor.findAll();
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function getDonor(req, res) {
    const id = req.params['donor-id'];
    try {
        return res.json({
            ...await models.Donor.findOne({
                where: {
                    donorId: id
                }
            })
        });
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function createDonor(req, res) {
    try {
        const { firstName, lastName } = req.params;
        var params = {
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 10,
            MessageAttributes: {
                "Title": {
                    DataType: "String",
                    StringValue: "The Whistler"
                }
            },
            MessageBody: "New Donor Application (NDA)",
            MessageDeduplicationId: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,  // Required for FIFO queues
            MessageGroupId: "NDA",  // Required for FIFO queues
            QueueUrl: process.env.SQS_QUEUE_URL
        };

        sqs.sendMessage(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });
        return res.status(200).send();
    } catch (e) {
        console.error(`Error: ${e}`);
        return res.json({ success: false });
    }
}
module.exports = {
    getDonors,
    getDonor,
    createDonor
};
