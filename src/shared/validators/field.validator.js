function FieldValidator() {
    const containsNewField = (fields, object) => {
        const validity = { isValid: true, validityError: ''};
        if (fields.map((key) => object[key]).filter(Boolean).length === 0) {
            const err ='Error: no new field was provided';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        return validity;
    };
    const containsUniqueField = (fields, o1, o2) => {
        const validity = {isValid: true, validityError: ''};
        if (fields.filter((key) => !o1[key] || o1[key] === o2[key]).length === fields.length) {
            const err = 'Error: all patch fields are up to date';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        return validity;
    };
    const areAllFieldsNonNull = (fields, object) => {
        const validity = {isValid: true, validityError: ''};
        if (fields.filter((key) => !object[key])) {
            const err = 'Error: object contains a null required field';
            console.error(err);
            validity.isValid = false;
            validity.validityError = err;
        }
        return validity;
    }
    return Object.freeze({
        containsNewField,
        containsUniqueField,
        areAllFieldsNonNull
    });
}

module.exports = new FieldValidator();
