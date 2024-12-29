# Stage 1: Build
FROM node:21.7.1-alpine AS builder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json tsconfig*.json .sequelizerc ./
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:21.7.1-alpine AS runtime
WORKDIR /usr/src/app

# Copy built files and necessary dependencies
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.sequelizerc ./
RUN npm install --only=production

EXPOSE 8000

CMD ["npm", "run", "start"]