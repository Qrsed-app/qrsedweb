# Build stage
FROM node:lts AS builder

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies with npm (simpler)
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ---

# Runtime stage
FROM nginx:alpine

# Copy built files from the dist folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
