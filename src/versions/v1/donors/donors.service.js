const models = require('../../../database');
const messageService = require('../../../shared/services/message.service');
const {eventTypeEnum} = require("../../../enums/event-type.enum");
const { donorsValidator } = require('./donors.validator');

function DonorsService() {
    const Donor = models['Donor'];
    async function getDonors() {
        try {
            return await Donor.findAll();
        } catch (e) {
            console.error(`Error occurred while getting donors`);
            throw e;
        }
    }

    async function getDonor(id) {
        try {
            return await Donor.findOne({
                where: {
                    donorId: id
                }
            });
        } catch (e) {
            console.error(`Error occurred while getting donor`);
            throw e;
        }
    }

    async function createDonor(firstName, lastName, bloodType) {
        try {
            const validity = donorsValidator.isValidDonorCreation({ firstName, lastName, bloodType });
            if (!validity.isValid) {
                return { success: false, error: validity.validityError };
            }
            var params = {
                MessageAttributes: {
                    "Event": {
                        DataType: "String",
                        StringValue: eventTypeEnum.NewDonorApplicant.code
                    }
                },
                MessageBody: {
                    cd: eventTypeEnum.NewDonorApplicant.code,
                    donor: {
                        fname: firstName,
                        lname: lastName,
                        bloodType
                    }
                },
                MessageDeduplicationId: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,  // Required for FIFO queues
                MessageGroupId: eventTypeEnum.NewDonorApplicant.code
            };

            const data = await messageService.sendMessage(params);
            return { success: !!data };
        } catch (e) {
            console.error(`Error occurred while creating donor`);
            throw e;
        }
    }

    async function updateDonor(id, firstName, lastName, bloodType) {
        try {
            const validity = donorsValidator.isValidDonorPatch(id, { firstName, lastName, bloodType });
            if (!validity.isValid) {
                return { success: false, error: validity.validityError };
            }
            var params = {
                MessageAttributes: {
                    "Event": {
                        DataType: "String",
                        StringValue: eventTypeEnum.EditDonorApplicant.code
                    }
                },
                MessageBody: {
                    cd: eventTypeEnum.NewDonorApplicant.code,
                    donor: {
                        fname: firstName,
                        lname: lastName,
                        bloodType
                    }
                },
                MessageDeduplicationId: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,  // Required for FIFO queues
                MessageGroupId: eventTypeEnum.EditDonorApplicant.code
            };

            const data = await messageService.sendMessage(params);
            return { success: !!data };
        } catch (e) {
            console.error(`Error occurred while updating donor`);
            throw e;
        }
    }
    async function deleteDonor(id, firstName, lastName, bloodType) {
        try {
            return { success: !!data };
        } catch (e) {
            console.error(`Error occurred while deleting donor`);
            throw e;
        }
    }
    return Object.freeze({
        getDonors,
        getDonor,
        createDonor,
        updateDonor,
        deleteDonor
    });
}

module.exports =  DonorsService();
