const models = require("../../../database");
const messageService = require("../../../shared/services/message.service");
const { eventTypeEnum } = require("../../../enums/event-type.enum");
const donorsValidator = require("./donors.validator");

function DonorsService() {
  async function getDonors() {
    try {
      return await models["Donor"].findAll();
    } catch (e) {
      console.error(`Error occurred while getting donors`);
      throw e;
    }
  }

  async function getDonor(id) {
    try {
      return await models["Donor"].findOne({
        where: {
          donorId: id,
        },
      });
    } catch (e) {
      console.error(`Error occurred while getting donor`);
      throw e;
    }
  }

  async function createDonor(firstName, lastName, bloodType) {
    try {
      const validity = donorsValidator.isValidDonorCreation({
        firstName,
        lastName,
        bloodType,
      });
      if (!validity.isValid) {
        return { success: false, error: validity.validityError };
      }
      const params = messageService.constructMessage(
        eventTypeEnum.NewDonorApplicant.code,
        {
          donor: {
            fname: firstName,
            lname: lastName,
            bloodType,
          },
        }
      );
      const data = await messageService.sendMessage(params);
      return { success: !!data };
    } catch (e) {
      console.error(e);
      throw new Error(`Error occurred while creating donor`);
    }
  }

  async function updateDonor(id, firstName, lastName, bloodType) {
    try {
      const currentDonor = await getDonor(id);
      const validity = donorsValidator.isValidDonorPatch(id, currentDonor, {
        firstName,
        lastName,
        bloodType,
      });
      if (!validity.isValid) {
        return { success: false, error: validity.validityError };
      }
      const params = messageService.constructMessage(
        eventTypeEnum.EditDonorApplicant.code,
        {
          id,
          donor: {
            id,
            fname: firstName,
            lname: lastName,
            bloodType,
          },
        }
      );
      const data = await messageService.sendMessage(params);
      return { success: !!data };
    } catch (e) {
      console.error(`Error occurred while updating donor`);
      throw e;
    }
  }
  async function deleteDonor(id) {
    try {
      const params = messageService.constructMessage(
        eventTypeEnum.DeleteDonorApplicant.code,
        {
          id,
          donor: {
            id,
          },
        }
      );
      const data = await messageService.sendMessage(params);
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
    deleteDonor,
  });
}

module.exports = DonorsService();
