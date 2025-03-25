
DROP TABLE IF EXISTS ads_tags;
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS categories;

PRAGMA foreign_keys=ON;


CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO categories(category_name)VALUES 
    ('Autre'),
    ('Vehicule'),
    ('Hifi'),
    ('Vêtements'),
    ('Électronique'),
    ('Véhicules'),
    ('Bébé & Enfant'),
    ('Services'),
    ('Animaux');

-- PRAGMA table_info(categories);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    tag_name VARCHAR(255) NOT NULL
);

INSERT INTO tags(tag_name) VALUES 
    ('Neuf'),('Soldé');

-- PRAGMA table_info(tags);

CREATE TABLE ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author VARCHAR(255) NOT NULL, 
    price FLOAT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    city VARCHAR(255),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);



-- PRAGMA table_info(ads);

INSERT INTO ads (title, description, author, price, createdAt, image, city, category_id) VALUES
("Vélo de ville Btwin comme neuf", "Vélo Btwin 6 vitesses, peu servi, excellent état.", "Pierre Durand", 120, "2024-09-01 10:15:00", NULL, "Paris",3), 
("Canapé convertible IKEA", "Canapé 3 places, convertible en lit, bon état.", "Sophie Martin", 250, "2024-08-15 14:30:00", NULL, "Lyon",4),  
("iPhone 12 Pro 128Go", "iPhone 12 Pro gris sidéral, très bon état, batterie 90%.", "Jean Lefèvre", 650, "2024-07-20 09:45:00", NULL, "Bordeaux",5),
("Voiture Renault Clio 4", "Clio 4 essence, 75 000 km, CT OK, dispo immédiate.", "Marie Dupont", 8200, "2024-06-10 16:20:00", NULL, "Bordeaux",2),
("Table basse scandinave", "Table basse en bois clair, design moderne.", "Lucas Bernard", 30, "2024-09-01 08:00:00", NULL, "Lyon",4), 
("PlayStation 5 + 2 manettes", "PS5 achetée en 2022, comme neuve, avec boîte.", "Emma Dubois", 480, "2024-05-22 13:10:00", NULL, "Paris", 5),  
("Tondeuse thermique Honda", "Tondeuse puissante, idéale pour grand jardin.", "David Morel", 220, "2024-04-30 11:50:00", NULL, "Bordeaux", 2), 
("Lot de vêtements bébé 6 mois", "Lot de 10 pièces : bodies, pyjamas, pantalons.", "Claire Fontaine", 30, "2024-09-01 09:30:00", NULL, "Lyon", 7),  
("MacBook Air M1 2021", "MacBook Air M1, 256Go SSD, parfait état.", "Antoine Girard", 850, "2024-03-15 18:40:00", NULL, "Paris", 5),  
("Scooter Piaggio 125cc", "Scooter 125cc, 15 000 km, roule parfaitement.", "Nicolas Rousseau", 1100, "2024-02-05 17:20:00", NULL, "Bordeaux", 2), 
("Appartement T2 45m² à louer", "T2 meublé, proche tram et commerces, dispo immédiate.", "Julie Lambert", 720, "2024-01-25 20:10:00", NULL, "Lyon", 8),  
("Sac à main Michael Kors", "Sac en cuir beige, très peu porté, valeur 300€.", "Manon Richard", 120, "2024-09-01 12:00:00", NULL, "Paris", 4), 
("Chaussures Nike Air Max 42", "Nike Air Max noires, état neuf, avec boîte.", "Thomas Caron", 60, "2023-12-18 10:05:00", NULL, "Bordeaux", 4), 
("Meuble TV en bois massif", "Meuble TV robuste, espace rangement, très bon état.", "Elodie Perrin", 35, "2023-11-30 15:45:00", NULL, "Lyon", 4), 
("Lave-linge Samsung 7kg", "Lave-linge récent, fonctionne parfaitement.", "Kevin Dubreuil", 180, "2023-10-21 09:00:00", NULL, "Paris", 5),  
("Guitare acoustique Yamaha", "Guitare folk Yamaha, idéale débutant ou confirmé.", "Florian Petit", 140, "2023-09-15 14:25:00", NULL, "Bordeaux", 3), 
("Lit bébé évolutif blanc", "Lit évolutif en bois, bon état, avec matelas.", "Amandine Charpentier", 30, "2023-08-10 11:10:00", NULL, "Lyon", 7),  
("Table de jardin + 4 chaises", "Salon de jardin en résine, résistant aux intempéries.", "Cédric Leroy", 130, "2023-07-05 17:50:00", NULL, "Paris", 8),  
("Montre Fossil chronographe", "Montre homme Fossil, bracelet cuir, fonctionne nickel.", "Jérémy Moreau", 85, "2023-06-22 16:00:00", NULL, "Bordeaux", 3), 
("Télévision LG 4K 55 pouces", "TV 4K UHD, excellent état, image parfaite.", "Valérie Robert", 370, "2023-05-12 19:30:00", NULL, "Lyon", 5);



CREATE TABLE ads_tags(
    ad_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (ad_id) REFERENCES ads(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id));


SELECT * FROM ads WHERE city= 'Bordeaux';

DELETE FROM ads WHERE price > 130;

UPDATE ads SET price = 0 WHERE createdAt LIKE '2024-09-01%';

SELECT * FROM ads WHERE createdAt LIKE '2024-09-01%';


SELECT COUNT(*) FROM ads WHERE city = 'Paris';

-- selectionner la moyenne des prix des annonces de Paris
SELECT AVG(price) AS average FROM ads WHERE city = 'Paris';

-- selectionner la moyenne des prix des annonces par ville, redéfinir les champs
SELECT 
    (SELECT AVG(price) FROM ads WHERE city = 'Paris') AS Paris,
    (SELECT AVG(price) FROM ads WHERE city = 'Bordeaux') AS Bordeaux,
    (SELECT AVG(price) FROM ads WHERE city = 'Lyon') AS Lyon;

-- requête plus simple pour récupérer les moyennes des prix par ville sans alias
SELECT city, AVG(price) FROM ads GROUP BY city;


SELECT * FROM ads;
SELECT * FROM tags;
SELECT * FROM categories;

INSERT INTO ads_tags (ad_id, tag_id) VALUES
    (1, 1),  
    (1, 2),  
    (1, 2),  
    (5, 1),  
    (8, 2);  



SELECT 
    ads.*, 
    cat.category_name, 
    tags.tag_name
FROM ads
INNER JOIN categories cat 
    ON ads.category_id = cat.id
LEFT JOIN ads_tags  
    ON ads.id = ads_tags.ad_id
LEFT JOIN tags 
    ON ads_tags.tag_id = tags.id
WHERE ads.author='Cédric Leroy'
;
