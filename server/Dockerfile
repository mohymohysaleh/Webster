FROM node:18-slim

WORKDIR /app/server

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY server/ .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"] 