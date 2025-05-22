# Étape 1 : Choisir une image Node.js stable et légère
FROM node:lts-alpine

# Étape 2 : Créer un dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : Installer les dépendances du projet
COPY *.json . 

# Étape 4 : Copier tout le code source du projet
RUN npm install

# Étape 5 : Copier les fichiers de configuration
COPY src src

# RUN npx tsc


# Étape 6 : Définir les variables d'environnement (si tu en as)
# ENV NODE_ENV=production
# ENV PORT=4000

# Étape 7 : Exposer le port sur lequel ton serveur tourne
# EXPOSE 4000

# Étape 8 : Démarrer l’application
CMD ["npm", "start"]







#Dockerfile est la notice de montage du moule (de l'image)

# FROM node:lts-alpine

# COPY src src 
# COPY *.json . 
# RUN npm i

# RUN npm start
