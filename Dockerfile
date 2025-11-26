FROM node:20-alpine

WORKDIR /app

# Copia apenas o package.json para build mais rápido
COPY package*.json ./

# Instala TUDO, incluindo devDependencies
ENV NODE_ENV=development
RUN npm install

# Copia o schema antes do generate
COPY prisma ./prisma

RUN npx prisma generate

# Agora copia o resto do projeto
COPY . .

RUN chmod +x node_modules/.bin/tsc
RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/server.js"]
