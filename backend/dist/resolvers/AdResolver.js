"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdResolver = void 0;
const Ad_1 = require("../entities/Ad");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("../entities/Category");
const Tag_1 = require("../entities/Tag");
const typeorm_1 = require("typeorm");
const AdInputs_1 = __importStar(require("../inputs/AdInputs"));
let AdResolver = class AdResolver {
    getAds(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = filters || {};
            let ads = [];
            try {
                if (categoryId) {
                    ads = yield Ad_1.Ad.find({
                        where: {
                            category: { id: categoryId }
                        },
                        relations: ["category", "tags"],
                    });
                }
                else {
                    ads = yield Ad_1.Ad.find({
                        relations: ["tags"],
                    });
                }
                return ads || [];
            }
            catch (error) {
                // console.error("❌ Erreur lors de la récupération des annonces:", error);
                return [];
            }
        });
    }
    getAdById(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ad_1.Ad.findOneByOrFail({ id: adId });
        });
    }
    deleteAd(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ad = yield Ad_1.Ad.findOneByOrFail({ id: adId });
                if (!ad) {
                    throw new Error(`Le tag avec l'ID ${adId} n'existe pas.`);
                }
                yield Ad_1.Ad.delete({ id: adId });
                console.log('Ad has been deleted');
                return ad;
            }
            catch (err) {
                console.error("❌ Erreur lors de la suppression de l'annonce:", err);
                throw new Error("Impossible de supprimer l'annonce");
            }
        });
    }
    createAd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const ad = new Ad_1.Ad();
                ad.title = data.title;
                ad.description = (_a = data.description) !== null && _a !== void 0 ? _a : "";
                ad.author = (_b = data.author) !== null && _b !== void 0 ? _b : "";
                ad.price = (_c = data.price) !== null && _c !== void 0 ? _c : 0;
                ad.image = (_d = data.image) !== null && _d !== void 0 ? _d : "";
                ad.city = (_e = data.city) !== null && _e !== void 0 ? _e : "";
                ad.category = (_f = yield Category_1.Category.findOneByOrFail({ id: data.category })) !== null && _f !== void 0 ? _f : "";
                ad.tags = (_g = yield Tag_1.Tag.findBy({ id: (0, typeorm_1.In)(data.tags) })) !== null && _g !== void 0 ? _g : [];
                yield ad.save();
                return ad;
            }
            catch (error) {
                console.error("❌ Erreur lors de la création de l'annonce:", error);
                throw new Error("Impossible de créer l'annonce");
            }
        });
    }
    updateAd(adId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let ad = yield Ad_1.Ad.findOneByOrFail({ id: adId });
            try {
                Object.assign(ad, data);
                yield ad.save();
                return true;
            }
            catch (error) {
                console.log("error", error);
                throw new Error("Impossible de mettre à jour l'annonce");
            }
        });
    }
};
exports.AdResolver = AdResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Ad_1.Ad]),
    __param(0, (0, type_graphql_1.Arg)("filters", () => AdInputs_1.AdFiltersInput, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdInputs_1.AdFiltersInput]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "getAds", null);
__decorate([
    (0, type_graphql_1.Query)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "getAdById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "deleteAd", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdInputs_1.default]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "createAd", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data", () => AdInputs_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "updateAd", null);
exports.AdResolver = AdResolver = __decorate([
    (0, type_graphql_1.Resolver)(Ad_1.Ad)
], AdResolver);
