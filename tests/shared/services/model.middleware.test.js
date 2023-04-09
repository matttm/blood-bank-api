const modelService = require('../../../src/shared/services/model.service');
const {isModelExistentMiddleware} = require("../../../src/shared/middleware/model.middleware");
const {MockResponse} = require("../../mocks/response.mock");

// jest.mock('../../../src/shared/services/model.service', () => {
//     const originalModule = jest.requireActual('../../../src/shared/services/model.service');
//
//     console.log(originalModule)
//     //Mock the default export and named export 'foo'
//     return {
//         ...originalModule,
//         isModelExistent: () => Promise.resolve(true)
//     };
// });
describe('ModelMiddleware', () => {
    let req = null;
    let res = null;
    let next = null;
    let countSpy = null;
    // Object.defineProperty(modelService, 'isModelExistent', {
    //     value: jest.fn(),
    //     writable: true,
    //     configurable: true
    // })
    beforeEach((object, method) => {
        req = { params: { id: 1 } };
        res = new MockResponse();
        next = jest.fn();
        countSpy = jest.spyOn(modelService, 'isModelExistent');
    });
    afterEach(() => {
        countSpy.restore();
    });
    it('should call isExist and call next on good data', async () => {
        countSpy.mockResolvedValue(true);
        await isModelExistentMiddleware({}, 'dummy')(req, res, next);
        expect(countSpy).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
})
