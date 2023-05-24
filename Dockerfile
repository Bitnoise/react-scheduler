## Prepare system image
FROM node:18.16-alpine3.16
WORKDIR /app

## Copy source files
COPY src ./src
COPY package.json yarn.lock tsconfig.json tsconfig.node.json index.html vite.config.ts ./

## Install dependencies
RUN yarn install --frozen-lockfile

## Expose port
EXPOSE 5173

## Run
CMD yarn run dev