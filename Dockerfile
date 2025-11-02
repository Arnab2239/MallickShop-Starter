# ----------------------------
# Stage 1: Build the Next.js App
# ----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies using clean install
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# ----------------------------
# Stage 2: Run Production App
# ----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy build output and essentials from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Expose Next.js port
EXPOSE 3000

# Use Next.js start command
CMD ["npm", "start"]
