const models = require('../../../database');
const messageService = require('../../../shared/message.service');
const {eventTypeEnum} = require("../../../enums/event-type.enum");
const {bloodTypeCds} = require("../../../enums/blood=type.enum");

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
            if (!firstName || !lastName || !bloodType) {
                console.error('Error: Required param was not provided');
                throw 'Error: Required param was not provided';
            }
            if (!bloodTypeCds.includes(bloodType)) {
                console.error('Error: unknown blood type was provided');
                throw 'Error: unknown blood type was provided';
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
