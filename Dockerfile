FROM node:18-slim

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /app/server
RUN npm install --production

# Copy server files
COPY server/ .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"] 