const genericValidator = require('../../..//src/shared/validators/generic.validator');

describe('GenericValidator', () => {
    describe('containsNewField', () => {
        const fields = ['name', 'age', 'email'];
        const original = {
            name: 'John',
            age: 72,
            email: ''
        };
        const testingTable = [
            {
                title: 'should return true when the fields provided for patching is different than the original object',
                patchObject: {
                    name: 'John',
                    age: 72,
                    email: 'm@xavier.com'
                },
                expect: true
            },
            {
                title: 'should return false when the fields provided for patching are the same as the original object',
                patchObject: {
                    name: 'John',
                    age: 72,
                    email: ''
                },
                expect: false
            },
            {
                title: 'should return true when the a fields provided for patching is null and the others are unique compared to the original object',
                patchObject: {
                    name: 'Mike',
                    age: null,
                    email: null
                },
                expect: true
            }
        ];
        for (const test of testingTable) {
            it(test.title, () => {
                const newValues = test.patchObject;
                const validity = genericValidator.containsUniqueField(fields, newValues, original);
                expect(validity.isValid).toBe(test.expect);
            });
        }
    });
    describe('areAllFieldsNonNull', () => {});
})
