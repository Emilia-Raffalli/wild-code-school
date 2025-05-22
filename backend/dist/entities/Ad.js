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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ad = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Tag_1 = require("./Tag");
const type_graphql_1 = require("type-graphql");
let Ad = class Ad extends typeorm_1.BaseEntity {
};
exports.Ad = Ad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Ad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Ad.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Ad.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], Ad.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Ad.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Ad.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Ad.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.ads, { nullable: false, eager: true }),
    (0, type_graphql_1.Field)(() => Category_1.Category),
    __metadata("design:type", Category_1.Category)
], Ad.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Tag_1.Tag, (tag) => tag.ads, {
        eager: true
    }),
    (0, typeorm_1.JoinTable)({
        name: "ads_tags",
        joinColumns: [{ name: "ad_id" }],
        inverseJoinColumns: [{ name: "tag_id" }]
    }),
    (0, type_graphql_1.Field)(() => [Tag_1.Tag]),
    __metadata("design:type", Array)
], Ad.prototype, "tags", void 0);
exports.Ad = Ad = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Ad);
