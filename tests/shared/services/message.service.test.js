const messageService = require("../../../src/shared/services/message.service");

describe("MessageService", () => {
  describe("getDedupeId", () => {
    it("should stringify non-nested objects", () => {
      const object = {
        k1: "v1",
        k2: "v2",
      };
      expect(
        messageService.constructMessage("TEST", object)?.MessageDeduplicationId
      ).toEqual("v1-v2");
    });
  });
});
