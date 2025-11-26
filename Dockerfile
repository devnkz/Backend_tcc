FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instalar TODAS as dependências, inclusive devDependencies
RUN npm install

COPY . .

# Build TypeScript
RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/server.js"]
