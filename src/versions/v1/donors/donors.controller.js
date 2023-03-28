const models = require('../../../database');
// Load the AWS SDK for Node.js
var AWS = require('@aws-sdk/client-sqs');
const messageService = require('../../../shared/message.service');
const {eventTypeEnum} = require("../../../enums/event-type.enum");
const {bloodTypeCds} = require("../../../enums/blood=type.enum");
const donorService = require('./donors.service');

async function getDonors(req, res) {
    try {
        const donors = await donorService.getDonors();
        return res.json(donors);
    } catch (e) {
        const error = 'Error while getting donors';
        console.error(`${error}`);
        return res.send(error);
    }
}

async function getDonor(req, res) {
    const id = req.params['donor-id'];
    try {
        const donor = await donorService.getDonor(id);
        return res.json(donor);
    } catch (e) {
        const error = 'Error while getting donor';
        console.error(`${error}`);
        return res.send(error);
    }
}

async function createDonor(req, res) {
    try {
        const { firstName, lastName, bloodType } = req.body;
        const isSuccess = donorService.getDonors(firstName, lastName, bloodType);
        return res.json({ success: isSuccess });
    } catch (e) {
        const error = 'Error while creating new donor';
        console.error(`${error}`);
        return res.send(error);
    }
}
module.exports = {
    getDonors,
    getDonor,
    createDonor
};
