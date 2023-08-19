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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.HomeController = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var user_decorator_1 = require("src/user/decorators/user.decorator");
var roles_decorators_1 = require("src/decorators/roles.decorators");
var HomeController = /** @class */ (function () {
    function HomeController(homeService) {
        this.homeService = homeService;
    }
    HomeController.prototype.getHomes = function (city, minPrice, maxPrice, propertyType) {
        var price = minPrice || maxPrice
            ? __assign(__assign({}, (minPrice && { gte: parseFloat(minPrice) })), (maxPrice && { lte: parseFloat(maxPrice) })) : undefined;
        var filters = __assign(__assign(__assign({}, (city && { city: city })), (price && { price: price })), (propertyType && { propertyType: propertyType }));
        return this.homeService.getHomes(filters);
    };
    HomeController.prototype.getHomeById = function (id) {
        return this.homeService.getHomeById(id);
    };
    HomeController.prototype.createHome = function (body, user) {
        return this.homeService.createHome(body, user.id);
    };
    HomeController.prototype.updateHome = function (id, body, user) {
        return __awaiter(this, void 0, Promise, function () {
            var realtor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.homeService.getRealtorByHomeId(id)];
                    case 1:
                        realtor = _a.sent();
                        if (realtor.id !== user.id) {
                            throw new common_1.NotFoundException('No permission! You can only change your own information ');
                        }
                        return [2 /*return*/, this.homeService.updateHome(id, body)];
                }
            });
        });
    };
    HomeController.prototype.deleteHome = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var realtor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.homeService.getRealtorByHomeId(id)];
                    case 1:
                        realtor = _a.sent();
                        if (realtor.id !== user.id) {
                            throw new common_1.NotFoundException('No permission! You can only change your own information ');
                        }
                        return [2 /*return*/, this.homeService.deleteHomeById(id)];
                }
            });
        });
    };
    HomeController.prototype.inquire = function (homeId, user, _a) {
        var message = _a.message;
        return this.homeService.inquire(user, homeId, message);
    };
    HomeController.prototype.getHomeMessages = function (homeId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var realtor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.homeService.getRealtorByHomeId(homeId)];
                    case 1:
                        realtor = _a.sent();
                        console.log(realtor, user);
                        if (realtor.id !== user.id) {
                            throw new common_1.UnauthorizedException();
                        }
                        return [2 /*return*/, this.homeService.getHomeMessages(homeId)];
                }
            });
        });
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('city')),
        __param(1, common_1.Query('minPrice')),
        __param(2, common_1.Query('maxPrice')),
        __param(3, common_1.Query('propertyType'))
    ], HomeController.prototype, "getHomes");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], HomeController.prototype, "getHomeById");
    __decorate([
        roles_decorators_1.Roles(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
        common_1.Post(),
        __param(0, common_1.Body()),
        __param(1, user_decorator_1.User())
    ], HomeController.prototype, "createHome");
    __decorate([
        roles_decorators_1.Roles(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
        common_1.Put(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __param(2, user_decorator_1.User())
    ], HomeController.prototype, "updateHome");
    __decorate([
        roles_decorators_1.Roles(client_1.UserType.REALTOR, client_1.UserType.ADMIN),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, user_decorator_1.User())
    ], HomeController.prototype, "deleteHome");
    __decorate([
        roles_decorators_1.Roles(client_1.UserType.BUYER),
        common_1.Post('/inquire/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, user_decorator_1.User()),
        __param(2, common_1.Body())
    ], HomeController.prototype, "inquire");
    __decorate([
        roles_decorators_1.Roles(client_1.UserType.REALTOR),
        common_1.Get('/:id/messages'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, user_decorator_1.User())
    ], HomeController.prototype, "getHomeMessages");
    HomeController = __decorate([
        common_1.Controller('home')
    ], HomeController);
    return HomeController;
}());
exports.HomeController = HomeController;
