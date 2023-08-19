"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@nestjs/testing");
var home_service_1 = require("./home.service");
var prisma_service_1 = require("src/prisma/prisma.service");
var client_1 = require("@prisma/client");
var home_controller_1 = require("./home.controller");
var mockGetHomes = [
    {
        id: 7,
        address: 'Bukhara, Uzbekistan',
        city: 'Bukhara',
        price: 300000,
        propertyType: client_1.PropertyType.CONDO,
        number_of_bedrooms: 2,
        number_of_bathrooms: 4,
        image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
];
var prisma;
var homeService;
describe('HomeController', function () {
    var controller;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        controllers: [home_controller_1.HomeController],
                        providers: [
                            {
                                provide: home_service_1.HomeService,
                                useValue: {
                                    getHomes: jest.fn().mockReturnValue(mockGetHomes)
                                }
                            },
                            prisma_service_1.PrismaService,
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    controller = module.get(home_controller_1.HomeController);
                    prisma = module.get(prisma_service_1.PrismaService);
                    homeService = module.get(home_service_1.HomeService);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('getHomes', function () {
        it('should construct filter object corectly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockGetHomesFn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetHomesFn = jest.fn().mockReturnValue(mockGetHomes);
                        jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomesFn);
                        return [4 /*yield*/, controller.getHomes('Bukhara', '1000', '400000', client_1.PropertyType.CONDO)];
                    case 1:
                        _a.sent();
                        expect(mockGetHomesFn).toBeCalledWith({
                            city: 'Bukhara',
                            price: {
                                gte: 1000,
                                lte: 400000
                            },
                            propertyType: client_1.PropertyType.CONDO
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
