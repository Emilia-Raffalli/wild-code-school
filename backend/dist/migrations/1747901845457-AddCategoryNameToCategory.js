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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCategoryNameToCategory1747901845457 = void 0;
const typeorm_1 = require("typeorm");
class AddCategoryNameToCategory1747901845457 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Ajouter la colonne sans contrainte NOT NULL
            yield queryRunner.addColumn("category", new typeorm_1.TableColumn({
                name: "categoryName",
                type: "varchar",
                length: "100",
                isNullable: true, // temporairement nullable
            }));
            // 2. Mettre une valeur par défaut pour les lignes existantes
            yield queryRunner.query(`
          UPDATE "category" SET "categoryName" = 'Sans nom'
        `);
            // 3. Rendre la colonne NOT NULL
            yield queryRunner.changeColumn("category", "categoryName", new typeorm_1.TableColumn({
                name: "categoryName",
                type: "varchar",
                length: "100",
                isNullable: false,
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Annule l'opération si on revient en arrière
            yield queryRunner.dropColumn("category", "categoryName");
        });
    }
}
exports.AddCategoryNameToCategory1747901845457 = AddCategoryNameToCategory1747901845457;
