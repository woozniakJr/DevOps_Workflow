# Étape 1 : Build de l'app React avec Vite
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copie du fichier .env.production avant le build
COPY .env.production .env.production

RUN npm run build

# Étape 2 : Serveur nginx pour le frontend
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
