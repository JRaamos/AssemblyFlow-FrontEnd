FROM node:lts-alpine

RUN npm install -g serve

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 80
CMD [ "serve", "-s", "dist", "-l", "80" ]