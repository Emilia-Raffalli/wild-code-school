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
exports.TagResolver = void 0;
const Tag_1 = require("../entities/Tag");
const type_graphql_1 = require("type-graphql");
const TagInput_1 = require("../inputs/TagInput");
let TagResolver = class TagResolver {
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield Tag_1.Tag.find({
                relations: ["ads"],
            });
            return tags;
        });
    }
    getTagById(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Tag_1.Tag.findOneByOrFail({ id: tagId });
        });
    }
    createTag(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = Tag_1.Tag.create(Object.assign({}, data));
                yield tag.save();
                return tag;
            }
            catch (error) {
                console.error("❌ Erreur lors de la création du tag:", error);
            }
        });
    }
    updateTag(tagId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tag = yield Tag_1.Tag.findOneByOrFail({ id: tagId });
                Object.assign(tag, data);
                yield tag.save();
                return true;
            }
            catch (error) {
                console.error("❌ Erreur lors de la mise à jour du tag:", error);
                return false;
            }
        });
    }
    deleteTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tag = yield Tag_1.Tag.findOneByOrFail({ id: tagId });
                if (!tag) {
                    throw new Error(`Le tag avec l'ID ${tagId} n'existe pas.`);
                }
                yield Tag_1.Tag.delete({ id: tagId });
                console.log('Tag has been deleted');
                return tagId;
            }
            catch (error) {
                console.error("❌ Erreur lors de la suppression de l'annonce:", error);
                throw new Error("Impossible de supprimer le tag");
            }
        });
    }
};
exports.TagResolver = TagResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Tag_1.Tag]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "getTags", null);
__decorate([
    (0, type_graphql_1.Query)(() => Tag_1.Tag),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "getTagById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Tag_1.Tag),
    __param(0, (0, type_graphql_1.Arg)('data', () => TagInput_1.TagInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TagInput_1.TagInput]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)("data", () => TagInput_1.TagInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "updateTag", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => type_graphql_1.ID),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "deleteTag", null);
exports.TagResolver = TagResolver = __decorate([
    (0, type_graphql_1.Resolver)(Tag_1.Tag)
], TagResolver);
