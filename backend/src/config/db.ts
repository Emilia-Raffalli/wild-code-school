import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import * as dotenv from 'dotenv';


dotenv.config();


console.log("DB config:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });



const dataSource = new DataSource({
    // type: 'sqlite',
    // database: "./data/good_corner.sqlite",
    
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    entities: [Ad, Category, Tag],
    synchronize: true, //synchronise automatiquement la base de données(sans avoir besoin de faire des migrations : NE JAMAIS UTILISER EN PROD)
    logging: ['error', 'query'] // verifie les erreurs et les requêtes pour débugguer
});

export default dataSource;

