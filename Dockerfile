# FINNISH - AI-powered Scientific Illustration Tool
# Multi-stage Docker build for production deployment

# =============================================================================
# Stage 1: Dependencies
# =============================================================================
FROM node:20-alpine AS deps

WORKDIR /app

# Install system dependencies for native modules (potrace, canvas support)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production=false

# =============================================================================
# Stage 2: Builder
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for configuration
ARG VITE_API_URL
ARG VITE_ANTHROPIC_API_KEY
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_ANTHROPIC_API_KEY=${VITE_ANTHROPIC_API_KEY}

# Build the application
RUN npm run build

# =============================================================================
# Stage 3: Production Runner (Static files with nginx)
# =============================================================================
FROM nginx:alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S finnish && \
    adduser -S finnish -u 1001 -G finnish && \
    chown -R finnish:finnish /usr/share/nginx/html && \
    chown -R finnish:finnish /var/cache/nginx && \
    chown -R finnish:finnish /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R finnish:finnish /var/run/nginx.pid

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# Stage 4: Development Runner
# =============================================================================
FROM node:20-alpine AS development

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

# Copy package files and install deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
