FROM node:23 AS builder

WORKDIR /usr/src/app

COPY . .

FROM node:23-alpine3.21

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]