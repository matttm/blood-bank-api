const {bloodTypeCds} = require("../../../enums/blood=type.enum");

function DonorsValidator() {
    const validity = {
        isValid: true,
        validityError: null
    }
    const isValidDonor = ({firstName, lastName, bloodType}) => {
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
    return Object.freeze({
        isValidDonor
    });
}

module.exports = new DonorsValidator();
