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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Ad_1 = require("./entities/Ad");
const Category_1 = require("./entities/Category");
const Tag_1 = require("./entities/Tag");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const AdResolver_1 = require("./resolvers/AdResolver");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const TagResolver_1 = require("./resolvers/TagResolver");
const CategoryResolver_1 = require("./resolvers/CategoryResolver");
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Request Handler
//req : requete, res : response (le _req pour dire à typescript que l'on sait que l'on doit préciser le request)
// app.get("/ads", async (req, res) => {
//   const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;
//   console.log(categoryId);
//   const adId = req.query.adId?parseInt(req.query.adId as string) : null;
//   console.log(adId);
//   try {
//     let ads;
//     if (categoryId) {
//       ads = await Ad.find({
//         where: { 
//           category: { id: categoryId 
//           } 
//         },
//         relations: { 
//           category: true 
//         }, 
//       });
//     } else if (adId) {
//       ads = await Ad.findOneBy({
//         id: adId,
//     })
//     } else {
//       ads = await Ad.find();  
//     } 
//     res.json(ads);
//   } catch (error) {
//       console.error("❌ Erreur lors de la récupération des annonces:", error);
//       res.status(500).json({ error: "Erreur de récupération des annonces" });
//   }
// });
app.get("/ads/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    console.log("Search Term:", searchTerm);
    try {
        let searchResult = yield Ad_1.Ad.find({
            where: {
                title: (0, typeorm_1.Like)(`%${searchTerm}%`),
            }
        });
        res.json(searchResult);
    }
    catch (error) {
        console.error("❌ Erreur lors de la récupération des annonces:", error);
        res.status(500).json({ error: "Erreur de récupération des annonces" });
    }
}));
// app.get("/categories", async (_req, res) => {
//   try {
//       const categories = await Category.find();  
//       console.log(categories);  
//       res.json(categories);  
//   } catch (error) {
//       console.error("❌ Erreur lors de la récupération des categories:", error);
//       res.status(500).json({ error: "Erreur de récupération des categories" });
//   }
// });
// app.get("/tags", async (req, res) => {
//   const tags = await Tag.find();
//   console.log(tags);
//   res.json(tags);
// })
// app.post("/ads", async (req, res) => {
//   const { title, description, author, price, createdAt, image, city, categoryId, tags } = req.body;  
//   try {
//       const ad = new Ad();
//       ad.title = title;
//       ad.description = description;
//       ad.author = author;
//       ad.price = price;  
//       ad.createdAt = createdAt;  
//       ad.image = image; 
//       ad.city = city; 
//       ad.category = categoryId;
//       ad.tags = tags
//       console.log(categoryId);
//       await ad.save(); 
//       res.status(201).send('ad has been created !');
//     } catch (error) {
//       console.error("❌ Erreur lors de la création de l'annonce:", error);
//       res.status(500).json({ error: "Erreur de création de l'annonce" });
//   }
// });
// app.post("/categories", async (req, res) => {
//   const categoriesData = req.body;
//   try {
//     categoriesData.map((categoryData:Category) => {
//       if (!categoryData.categoryName) {
//         throw new Error("Each category must have a categoryName");
//       }
//       console.log(`Creating category: ${categoryData.categoryName}`);
//       const category = new Category();
//       category.categoryName = categoryData.categoryName;
//       category.save();
//     });
//     res.send('categories créées avec succès.')
//   } catch (error){
//     res.status(500).send(error);
//   }
// });
app.post("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const category = new Category_1.Category();
        category.categoryName = categoryName;
        yield category.save();
        res.status(201).send('catgegory has been created !');
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
}));
app.post("/tags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = new Tag_1.Tag();
    tag.tagName = req.body.tagName;
    yield tag.save();
    res.status(201).send('tag has been created !');
}));
//:id les deux points indiquent que c'est un paramètre de route
app.delete("/ads/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    try {
        yield Ad_1.Ad.delete({ id: id });
        res.send('Ad has been deleted');
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
}));
// app.get("/ads/:id", async (req, res) => {
//   const id = Number.parseInt(req.params.id);
//   try {
//     const ad = await Ad.findOneByOrFail({id: id});
//     res.json(ad);   
//     console.log('Ad has been find !');
//   }
//   catch (err){
//     console.log("err", err);
//     res.status(500).send(err);
//   }
// });
// app.delete("/categories/:id", async (req, res) => {
//   const id = Number.parseInt(req.params.id);
//   try {
//     await Category.delete({id: id});
//     res.send('Category has been deleted');
//   }
//   catch (err){
//     console.log("err", err);
//     res.status(500).send(err);
//   }
// });
app.put("/ads/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    const ad = yield Ad_1.Ad.findOneByOrFail({ id: id });
    try {
        const { title, description, author, price, image, city, categoryId, tags } = req.body;
        ad.title = title;
        ad.description = description;
        ad.author = author;
        ad.price = price;
        ad.image = image;
        ad.city = city;
        ad.category = categoryId;
        ad.tags = tags;
        // res.json(ad);
        yield ad.save();
        res.json('annonce mise à jour avec succès !');
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}));
app.put("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    try {
        //fonction update native permettant de modifier partiellement l'entité en base. (par exemple dans ma route put, je ne lui passe qu'un titre à la modif.)
        yield Category_1.Category.update({ id: id }, req.body);
        res.send("Category has been updated !");
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}));
app.put("/tags/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    try {
        //fonction update native permettant de modifier partiellement l'entité en base. (par exemple dans ma route put, je ne lui passe qu'un titre à la modif.)
        yield Tag_1.Tag.update({ id: id }, req.body);
        res.send("Tag has been updated !");
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}));
// app.delete("/ads/:id", (req, res) => {
//     console.log(req.params.id);
//     ads = ads.filter((ad) => {
//        return ad.id !== Number.parseInt(req.params.id);
//     });
//     res.send("The ad was deleted");
// });
// app.put("/ads/:id", (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
//     //array.map
//     ads = ads.map((ad) => {
//         if(Number.parseInt(req.params.id) === ad.id) {
//             return req.body;
//         } else {
//             return ad;
//         }
//     });
//     res.send('ok');
// });
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Example app listening on port ${port}`);
    try {
        yield db_1.default.initialize();
        console.log("Database connected successfully!");
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [AdResolver_1.AdResolver, TagResolver_1.TagResolver, CategoryResolver_1.CategoryResolver]
    });
    const apolloServer = new server_1.ApolloServer({ schema: schema });
    const { url } = yield (0, standalone_1.startStandaloneServer)(apolloServer, {
        listen: { port: 4200 },
    });
    console.log(`🚀  Server ready at: ${url}`);
});
start();
