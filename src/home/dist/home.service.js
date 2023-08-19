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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.HomeService = exports.homeSelect = void 0;
var common_1 = require("@nestjs/common");
var home_dto_1 = require("./dto/home.dto");
exports.homeSelect = {
    select: {
        id: true,
        address: true,
        city: true,
        price: true,
        propertyType: true,
        number_of_bedrooms: true,
        number_of_bathrooms: true,
        images: true
    }
};
var HomeService = /** @class */ (function () {
    function HomeService(prisma) {
        this.prisma = prisma;
    }
    HomeService.prototype.getHomes = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var homes, fetchHome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(filters);
                        return [4 /*yield*/, this.prisma.home.findMany(__assign(__assign({}, exports.homeSelect), { where: filters }))];
                    case 1:
                        homes = _a.sent();
                        if (!homes.length) {
                            throw new common_1.NotFoundException('No homes found');
                        }
                        return [2 /*return*/, homes.map(function (home) {
                                var _a;
                                if ((_a = home === null || home === void 0 ? void 0 : home.images) === null || _a === void 0 ? void 0 : _a.length) {
                                    fetchHome = __assign(__assign({}, home), { image: home === null || home === void 0 ? void 0 : home.images[0].url });
                                }
                                else {
                                    fetchHome = __assign(__assign({}, home), { image: '' });
                                }
                                delete fetchHome.images;
                                return new home_dto_1.HomeResponseDto(fetchHome);
                            })];
                }
            });
        });
    };
    HomeService.prototype.getHomeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var uniqiueHome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.home.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        uniqiueHome = _a.sent();
                        if (!uniqiueHome) {
                            throw new common_1.NotFoundException('Home not found');
                        }
                        return [2 /*return*/, new home_dto_1.HomeResponseDto(uniqiueHome)];
                }
            });
        });
    };
    HomeService.prototype.createHome = function (_a, userId) {
        var address = _a.address, city = _a.city, numberOfBathrooms = _a.numberOfBathrooms, numberOfBedrooms = _a.numberOfBedrooms, landSize = _a.landSize, propertyType = _a.propertyType, price = _a.price, images = _a.images;
        return __awaiter(this, void 0, void 0, function () {
            var home, homeImages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.home.create({
                            data: {
                                address: address,
                                city: city,
                                number_of_bedrooms: numberOfBathrooms,
                                number_of_bathrooms: numberOfBedrooms,
                                land_size: landSize,
                                propertyType: propertyType,
                                price: price,
                                realtor_id: userId
                            }
                        })];
                    case 1:
                        home = _b.sent();
                        homeImages = images.map(function (img) { return (__assign(__assign({}, img), { home_id: home.id })); });
                        return [4 /*yield*/, this.prisma.image.createMany({
                                data: homeImages
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, new home_dto_1.HomeResponseDto(home)];
                }
            });
        });
    };
    HomeService.prototype.updateHome = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var home, updatedHome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.home.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        home = _a.sent();
                        if (!home) {
                            throw new common_1.NotFoundException('Home not found');
                        }
                        return [4 /*yield*/, this.prisma.home.update({
                                where: {
                                    id: id
                                },
                                data: data
                            })];
                    case 2:
                        updatedHome = _a.sent();
                        return [2 /*return*/, new home_dto_1.HomeResponseDto(updatedHome)];
                }
            });
        });
    };
    HomeService.prototype.deleteHomeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var home;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.home.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        home = _a.sent();
                        if (!home) {
                            throw new common_1.NotFoundException('Home not found');
                        }
                        return [4 /*yield*/, this.prisma.home["delete"]({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.image.deleteMany({
                                where: {
                                    home_id: id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                msg: "Home deleted successfully",
                                success: true
                            }];
                }
            });
        });
    };
    HomeService.prototype.getRealtorByHomeId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var home;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.home.findUnique({
                            where: {
                                id: id
                            },
                            select: {
                                realtor: {
                                    select: {
                                        name: true,
                                        id: true,
                                        email: true,
                                        phone: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        home = _a.sent();
                        if (!home) {
                            throw new common_1.NotFoundException('Home not found');
                        }
                        return [2 /*return*/, home.realtor];
                }
            });
        });
    };
    HomeService.prototype.inquire = function (buyer, homeId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var realtor, newMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRealtorByHomeId(homeId)];
                    case 1:
                        realtor = _a.sent();
                        return [4 /*yield*/, this.prisma.message.create({
                                data: {
                                    realtor_id: realtor.id,
                                    buyer_id: buyer.id,
                                    home_id: homeId,
                                    message: message
                                }
                            })];
                    case 2:
                        newMessage = _a.sent();
                        return [2 /*return*/, { success: true, msg: "Message sent" }];
                }
            });
        });
    };
    HomeService.prototype.getHomeMessages = function (homeId) {
        return __awaiter(this, void 0, void 0, function () {
            var messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.message.findMany({
                            where: {
                                home_id: homeId
                            },
                            select: {
                                message: true,
                                buyer: {
                                    select: {
                                        name: true,
                                        phone: true,
                                        email: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        messages = _a.sent();
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    HomeService = __decorate([
        common_1.Injectable()
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
