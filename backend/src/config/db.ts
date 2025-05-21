import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";


const dataSource = new DataSource({
    type: 'sqlite',
    // database: 'good_corner.sqlite',
    database: "./data/good_corner.sqlite",
    entities: [Ad, Category, Tag],
    synchronize: true, //synchronise automatiquement la base de données(sans avoir besoin de faire des migrations : NE JAMAIS UTILISER EN PROD)
    logging: ['error', 'query'] // verifie les erreurs et les requêtes pour débugguer
});

export default dataSource;