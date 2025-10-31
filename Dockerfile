# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy only the dependency files first for better caching
COPY package*.json ./

RUN npm install --save-dev @types/bcryptjs
RUN  npm install swr
RUN mkdir -p /app/public

# Copy the entire project and build
COPY . .
RUN npm run build


# ---- Run Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000




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
