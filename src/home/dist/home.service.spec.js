"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var common_1 = require("@nestjs/common");
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
var mockCreateHome = {
    id: 24,
    address: 'Khorasm, Uzbekistan',
    number_of_bedrooms: 2,
    number_of_bathrooms: 5,
    city: 'Khorasm',
    listed_date: '2023-08-19T13:09:49.776Z',
    price: 300000,
    land_size: 200,
    propertyType: client_1.PropertyType.CONDO,
    realtor_id: 8
};
var mockImages = [
    {
        url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
];
var prisma;
describe('HomeService', function () {
    var service;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            home_service_1.HomeService,
                            {
                                provide: prisma_service_1.PrismaService,
                                useValue: {
                                    home: {
                                        findMany: jest.fn().mockReturnValue(mockGetHomes),
                                        create: jest.fn().mockReturnValue(mockCreateHome)
                                    },
                                    image: {
                                        createMany: jest.fn().mockReturnValue(mockImages)
                                    }
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(home_service_1.HomeService);
                    prisma = module.get(prisma_service_1.PrismaService);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('getHomes', function () {
        var filters = {
            city: 'Bukhara',
            price: {
                gte: 1000,
                lte: 400000
            },
            propertyType: client_1.PropertyType.CONDO
        };
        it('should call prisma findMany with correct params ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockPrismaFindmanyHomes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPrismaFindmanyHomes = jest.fn().mockReturnValue(mockGetHomes);
                        jest
                            .spyOn(prisma.home, 'findMany')
                            .mockImplementation(mockPrismaFindmanyHomes);
                        return [4 /*yield*/, service.getHomes(filters)];
                    case 1:
                        _a.sent();
                        expect(mockPrismaFindmanyHomes).toBeCalledWith(__assign(__assign({}, home_service_1.homeSelect), { where: filters }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw not found exception if homes are not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockPrismaFindmanyHomes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPrismaFindmanyHomes = jest.fn().mockReturnValue([]);
                        jest
                            .spyOn(prisma.home, 'findMany')
                            .mockImplementation(mockPrismaFindmanyHomes);
                        return [4 /*yield*/, expect(service.getHomes(filters)).rejects.toThrowError(common_1.NotFoundException)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('create', function () {
        var mockHomeParams = {
            numberOfBedrooms: 5,
            numberOfBathrooms: 2,
            city: 'Khorasm',
            price: 300000,
            address: 'Khorasm, Uzbekistan',
            landSize: 200,
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                },
                {
                    url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                },
            ],
            propertyType: client_1.PropertyType.CONDO
        };
        it('should call prisma home.create with correct payload', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockCreatingHome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCreatingHome = jest.fn().mockReturnValue(mockCreateHome);
                        jest.spyOn(prisma.home, 'create').mockImplementation(mockCreatingHome);
                        return [4 /*yield*/, service.createHome(mockHomeParams, 8)];
                    case 1:
                        _a.sent();
                        expect(mockCreatingHome).toBeCalledWith({
                            data: {
                                address: mockCreateHome.address,
                                city: mockCreateHome.city,
                                number_of_bedrooms: mockCreateHome.number_of_bedrooms,
                                number_of_bathrooms: mockCreateHome.number_of_bathrooms,
                                land_size: mockCreateHome.land_size,
                                propertyType: mockCreateHome.propertyType,
                                price: mockCreateHome.price,
                                realtor_id: 8
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call prisma image.createMany with the correct payload", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockCareateImageFn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCareateImageFn = jest.fn().mockReturnValue(mockImages);
                        jest
                            .spyOn(prisma.image, 'createMany')
                            .mockImplementation(mockCareateImageFn);
                        return [4 /*yield*/, service.createHome(mockHomeParams, 8)];
                    case 1:
                        _a.sent();
                        expect(mockCareateImageFn).toBeCalledWith({
                            data: [
                                {
                                    url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                    home_id: 24
                                },
                                {
                                    url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                    home_id: 24
                                },
                            ]
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
