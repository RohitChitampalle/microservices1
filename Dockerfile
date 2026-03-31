# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3001

# Start app
CMD ["node", "app.js"]
