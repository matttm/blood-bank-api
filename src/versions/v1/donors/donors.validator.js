const {bloodTypeCds} = require("../../../enums/blood=type.enum");

function DonorsValidator() {
    const validity = {
        isValid: true,
        validityError: null
    }
    const isValidNewDonor = ({firstName, lastName, bloodType}) => {
        if (!firstName || !lastName || !bloodType) {
            console.error('Error: Required param was not provided');
            validity.isValid = false;
            validity.validityError =  'Error: Required param was not provided';
        }
        if (!bloodTypeCds.includes(bloodType)) {
            console.error('Error: unknown blood type was provided');
            validity.isValid = false;
            validity.validityError =  'Error: unknown blood type was provided';
        }
        return validity;
    };
    const isValidDonorPatch = (donorPatch, donor) => {
        const fields = [
            'firstName',
            'lastName',
            'bloodType'
        ];
        if (fields.map((key) => donorPatch[key]).filter(Boolean).length === 0) {
            const err ='Error: new field was provided';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        // TODO think bout this
        if (!bloodTypeCds.includes(bloodType)) {
            const err = 'Error: unknown blood type was provided';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        if (fields.filter((key) => !donorPatch[key] || donorPatch[key] === donor[key]).length === fields.length) {
            const err = 'Error: unknown blood type was provided';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        return validity;
    };
    return Object.freeze({
        isValidNewDonor,
        isValidDonorPatch
    });
}

module.exports = new DonorsValidator();
