const models = require('../../../database');
const messageService = require('../../../shared/message.service');
const {eventTypeEnum} = require("../../../enums/event-type.enum");
const {bloodTypeCds} = require("../../../enums/blood=type.enum");
const { donorsValidator } = require('./donors.validator');

function DonorsService() {
    async function getDonors() {
        try {
            return await models.Donor.findAll();
        } catch (e) {
            console.error(`Error occurred while getting donors - ${e}`);
            throw e;
        }
    }

    async function getDonor(id) {
        try {
            return await models.Donor.findOne({
                where: {
                    donorId: id
                }
            });
        } catch (e) {
            console.error(`Error occurred while getting donor - ${e}`);
            throw e;
        }
    }

    async function createDonor(firstName, lastName, bloodType) {
        try {
            const validity = donorsValidator.isValidDonor({ firstName, lastName, bloodType });
            if (!validity.isValid) {
                return res.send(validity.validityError);
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
            return !!data;
        } catch (e) {
            console.error(`Error occurred while creating donor - ${e}`);
            throw e;
        }
    }
    return Object.freeze({
        getDonors,
        getDonor,
        createDonor
    });
}

module.exports = new DonorsService();
