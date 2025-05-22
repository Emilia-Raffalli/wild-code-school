"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.CategoryResolver = void 0;
const Category_1 = require("../entities/Category");
const Ad_1 = require("../entities/Ad");
const type_graphql_1 = require("type-graphql");
const CategoryInput_1 = require("../inputs/CategoryInput");
let CategoryResolver = class CategoryResolver {
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = yield Category_1.Category.find();
            return categories;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.findOneByOrFail({ id: categoryId });
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = Category_1.Category.create(Object.assign({}, data));
                yield category.save();
                return category;
            }
            catch (error) {
                console.error("❌ Erreur lors de la création de la catégorie:", error);
            }
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let category = yield Category_1.Category.findOneByOrFail({ id: categoryId });
                if (!category) {
                    throw new Error("La catégorie n'a pas été trouvée");
                }
                else {
                    let ads = yield Ad_1.Ad.find({ where: { category: { id: categoryId } } });
                    if (ads.length > 0) {
                        throw new Error("Impossible de supprimer la catégorie car elle contient des annonces.");
                    }
                    yield Category_1.Category.delete({ id: categoryId });
                    console.log('Category has been deleted');
                    return category;
                }
            }
            catch (err) {
                console.error("❌ Erreur lors de la suppression de l'annonce:", err);
                throw new Error("Impossible de supprimer la catégorie");
            }
        });
    }
    updateCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let category = yield Category_1.Category.findOneByOrFail({ id: categoryId });
                if (!category) {
                    throw new Error("La catégorie n'a pas été trouvée");
                }
                else {
                    yield Category_1.Category.delete({ id: categoryId });
                    console.log('Category has been deleted');
                    return category;
                }
            }
            catch (err) {
                console.error("❌ Erreur lors de la suppression de l'annonce:", err);
                throw new Error("Impossible de supprimer la catégorie");
            }
        });
    }
};
exports.CategoryResolver = CategoryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategories", null);
__decorate([
    (0, type_graphql_1.Query)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategoryById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryInput_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
exports.CategoryResolver = CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)(Category_1.Category)
], CategoryResolver);
