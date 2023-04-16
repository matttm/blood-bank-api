const genericValidator = require('../../..//src/shared/validators/generic.validator');

describe('GenericValidator', () => {
    describe('containsNewField', () => {
        const fields = ['name', 'age', 'email'];
        const original = {
            name: 'John',
            age: 72,
            email: ''
        };
        it('should return true when the fields provided for patching is different than the original object', () => {
            const newValues = {
                name: 'John',
                age: 72,
                email: 'm@xavier.com'
            };
            const validity = genericValidator.containsUniqueField(fields, newValues, original);
            expect(validity.isValid).toBe(true);

        });
        it('should return false when the fields provided for patching are the same as the original object', () => {
            const newValues = {
                name: 'John',
                age: 72,
                email: ''
            };
            const validity = genericValidator.containsUniqueField(fields, newValues, original);
            expect(validity.isValid).toBe(false);

        });
    });
})
