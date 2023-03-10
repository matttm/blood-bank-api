const models = require('../../../database');
// Load the AWS SDK for Node.js
var AWS = require('@aws-sdk/client-sqs');
const {SendMessageCommand} = require("@aws-sdk/client-sqs");

// Create an SQS service object
var sqs = new AWS.SQSClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.SQS_ACCESS_KEY,
        secretAccessKey: process.env.SQS_SECRET_KEY
    }
});

async function getDonors(req, res) {
    try {
        const donors = await models.Donor.findAll();
        return res.json(donors);
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function getDonor(req, res) {
    const id = req.params['donor-id'];
    try {
        const donor = await models.Donor.findOne({
            where: {
                donorId: id
            }
        })
        return res.json(donor);
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function createDonor(req, res) {
    try {
        const { firstName, lastName } = req.body;
        var params = {
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
        const command = new SendMessageCommand(params);

        const data = await sqs.send(command);
        return res.json({ success: true });
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
