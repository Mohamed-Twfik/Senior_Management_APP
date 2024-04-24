# Base image
FROM node:17-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install nodemon
RUN npm install -g nodemon

# Install dependencies
RUN npm install

COPY . .

# Expose port
EXPOSE 5000

RUN chmod -R 777 /app/node_modules

# Start app
CMD ["npm", "start"]