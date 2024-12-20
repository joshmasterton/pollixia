FROM node:18

WORKDIR /app

COPY api/package*.json .

RUN npm install

COPY api/. .

RUN npm run build

EXPOSE 80

ENV NODE_ENV=production

CMD ["npm", "run", "prod"]
