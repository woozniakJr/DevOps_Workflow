# Étape 1 : Build (facultatif si transpilation TypeScript)
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Étape 2 : Exécution
FROM node:18-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 5000

CMD ["node", "src/index.js"]
