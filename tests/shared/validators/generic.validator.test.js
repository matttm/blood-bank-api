const genericValidator = require("../../..//src/shared/validators/generic.validator");

describe("GenericValidator", () => {
  const fields = ["name", "age", "email"];
  describe("containsNewField", () => {
    const expectedError = "Error: all patch fields are up to date";
    const original = {
      name: "John",
      age: 72,
      email: "",
    };
    const testingTable = [
      {
        title:
          "should return true when the fields provided for patching is different than the original object",
        patchObject: {
          name: "John",
          age: 72,
          email: "m@xavier.com",
        },
        expect: true,
        expectedError: "",
      },
      {
        title:
          "should return false when the fields provided for patching are the same as the original object",
        patchObject: {
          name: "John",
          age: 72,
          email: "",
        },
        expect: false,
        expectedError,
      },
      {
        title:
          "should return true when the a fields provided for patching is null and the others are unique compared to the original object",
        patchObject: {
          name: "Mike",
          age: null,
          email: null,
        },
        expect: true,
        expectedError: "",
      },
    ];
    for (const test of testingTable) {
      it(test.title, () => {
        const newValues = test.patchObject;
        const validity = genericValidator.containsUniqueField(
          fields,
          newValues,
          original
        );
        expect(validity.isValid).toBe(test.expect);
      });
    }
  });
  describe("areAllFieldsNonNull", () => {
    const expectError = "Error: object contains a null required field";
    const testingTable = [
      {
        title: "should return false when all fields are null",
        object: {
          name: null,
          age: null,
          email: null,
        },
        expect: false,
        expectError,
      },
      {
        title: "should return false when one field is null",
        object: {
          name: "Jake",
          age: null,
          email: null,
        },
        expect: false,
        expectError,
      },
      {
        title:
          "should return false when all fields in object are vaalid, but is missing property fromfield list",
        object: {
          name: "null",
          age: 41,
        },
        expect: false,
        expectError,
      },
      {
        title: "should return true when no fields are null",
        object: {
          name: "Jake",
          age: 68,
          email: "me@wood.com",
        },
        expect: true,
        expectError: "",
      },
    ];
    for (const test of testingTable) {
      it(test.title, () => {
        const newValues = test.object;
        const validity = genericValidator.areAllFieldsNonNull(
          fields,
          newValues
        );
        expect(validity.isValid).toBe(test.expect);
        expect(validity.validityError).toBe(test.expectError);
      });
    }
  });
});
