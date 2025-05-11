FROM node:18-slim

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /app/server
RUN npm install --production

# Copy server files
COPY server/ .

# Set environment variables
ENV PORT=8000
ENV NODE_ENV=production
ENV DEBUG=express:*

# Expose the port
EXPOSE 8000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start the server with debugging
CMD ["node", "--trace-warnings", "server.js"] 