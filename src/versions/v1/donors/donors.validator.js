const {bloodTypeCds} = require("../../../enums/blood=type.enum");
const genericValidator = require('../../../shared/validators/generic.validator');


function DonorsValidator() {
    const fields = [
        'firstName',
        'lastName',
        'bloodType'
    ];
    const isValidDonorCreation = (donor) => {
        let validity;
        validity = genericValidator.areAllFieldsNonNull(fields, { ...donor });
        if (!validity.isValid) {
            console.error('Error: a required param for a donor was not provided');
            return validity;
        }
        if (!bloodTypeCds.includes(donor.bloodType)) {
            console.error('Error: unknown blood type was provided');
            validity.isValid = false;
            validity.validityError =  'Error: unknown blood type was provided';
            return validity;
        }
        return validity;
    };
    const isValidDonorPatch = (id, donorPatch, donor) => {
        let validity;
        validity = genericValidator.isModelExistent(model, id);
        if (!validity.isValid) {
            const err ='Error: donor id does not exist';
            console.error(err);
            return validity;
        }
        validity = genericValidator.containsNewField(fields, { ...donor });
        if (!validity.isValid) {
            const err ='Error: no new field was provided';
            console.error(err);
            return validity;
        }
        // TODO think bout this
        if (donorPatch.bloodType && !bloodTypeCds.includes(donorPatch.bloodType)) {
            const err = 'Error: unknown blood type was provided';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
            return validity;
        }
        validity = genericValidator.containsUniqueField(fields, { ...donorPatch }, { ...donor });
        if (!validity.isValid) {
            const err = 'Error: all patch fields are up to date';
            console.error(err);
            return validity;
        }
        return validity;
    };
    return Object.freeze({
        isValidDonorCreation,
        isValidDonorPatch
    });
}

module.exports = new DonorsValidator();
