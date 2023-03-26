const models = require('../../../database');
// Load the AWS SDK for Node.js
var AWS = require('@aws-sdk/client-sqs');
const messageService = require('../../../shared/message.service');
const {eventTypeEnum} = require("../../../enums/event-type.enum");
const {bloodTypeCds} = require("../../../enums/blood=type.enum");

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
        const { firstName, lastName, bloodType } = req.body;
        if ( !firstName || !lastName || !bloodType) {
            console.error('Error: Required param was not provided');
            return res.send('Error: Required param was not provided');
        }
        if (!bloodTypeCds.includes(bloodType)) {
            console.error('Error: unknown blood type was provided');
            return res.send('Error: unknown blood type was provided');
        }
        var params = {
            MessageAttributes: {
                "Event": {
                    DataType: "String",
                    StringValue: eventTypeEnum.NewDonorApplication.code
                }
            },
            MessageBody: {
                cd: eventTypeEnum.NewDonorApplication.code,
                donor: {
                    fname: firstName,
                    lname: lastName,
                    bloodType
                }
            },
            MessageDeduplicationId: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,  // Required for FIFO queues
            MessageGroupId: eventTypeEnum.NewDonorApplication.code
        };

        const data = await messageService.sendMessage(params);
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
