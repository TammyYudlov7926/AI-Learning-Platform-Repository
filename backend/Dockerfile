FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src/

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/server.js"]
