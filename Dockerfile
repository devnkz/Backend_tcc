FROM node:20-alpine

WORKDIR /app

# Copia só o essencial primeiro para cache de build
COPY package*.json ./

RUN npm install

# Copia apenas o schema ANTES do generate
COPY prisma ./prisma

# Gera o Prisma Client
RUN npx prisma generate

# Agora copia o resto do projeto
COPY . .

# Compila TypeScript
RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/server.js"]
