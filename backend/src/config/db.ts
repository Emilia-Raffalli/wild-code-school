import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: 'sqlite',
    database: 'good_corner.sqlite',
    entities: [],
    synchronize: true, //synchronise automatiquement la base de données(sans avoir besoin de faire des migrations : NE JAMAIS UTILISER EN PROD)
    logging: ['error', 'query'] // verifie les erreurs et les requêtes pour débugguer
});

export default dataSource;