const messageService = require("../../../src/shared/services/message.service");

describe("MessageService", () => {
  describe("getDedupeId", () => {
    describe("when theres no id", () => {
      it("should stringify non-nested objects", () => {
        const object = {
          k1: "v1",
          k2: "v2",
        };
        expect(
          messageService.constructMessage("TEST", object)
            ?.MessageDeduplicationId
        ).toEqual("v1-v2");
      });
    });
    describe("when there is an id", () => {
      it("should be event witrh is", () => {
        const object = {
          id: 1,
          k1: "v1",
          k2: "v2",
        };
        expect(
          messageService.constructMessage("TEST", object)
            ?.MessageDeduplicationId
        ).toEqual("TEST-1");
      });
    });
  });
});
