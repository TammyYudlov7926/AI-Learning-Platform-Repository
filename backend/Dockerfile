# backend/Dockerfile
FROM node:18

WORKDIR /app

# רק קבצים מתוך backend מועתקים
COPY package*.json ./
COPY tsconfig.json ./
COPY .env .env
COPY .env ./


# התקנת התלויות
RUN npm install

# העתקת קוד המקור + Prisma schema
COPY prisma ./prisma
COPY src ./src
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# יצירת Prisma Client
RUN npx prisma generate

# קומפילציה של TypeScript
RUN npm run build

EXPOSE 8000

CMD ["node", "dist/server.js"]
