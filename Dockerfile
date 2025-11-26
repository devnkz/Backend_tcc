FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Gera o Prisma Client dentro do container
RUN npx prisma generate

COPY . .

# Build TS
RUN npx tsc

EXPOSE 3000
CMD ["node", "dist/server.js"]
