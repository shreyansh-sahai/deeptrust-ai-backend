# Simple single-stage Dockerfile (larger image but simpler)

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile

# Copy Prisma files first
COPY prisma.config.ts ./
COPY src/infrastructure/database/combine-schemas.js ./src/infrastructure/database/
COPY src/infrastructure/database/schemas ./src/infrastructure/database/schemas

# Copy source code (needed for prisma.config.ts imports)
COPY src ./src

# Generate Prisma Client (DATABASE_URL not needed for generation, using dummy value)
RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" yarn prisma:generate

# Copy TypeScript and NestJS configuration files (needed for build)
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Set NODE_ENV (change to 'production' for production deployments)
ENV NODE_ENV=development

# Start the application
CMD ["node", "dist/main"]

