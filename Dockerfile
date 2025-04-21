# Use a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install bash and curl
RUN apk add --no-cache bash curl

# Install Bun (ensure a consistent version for stability)
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Copy package.json and bun.lockb (if available) for dependency installation
COPY package.json bun.lockb* ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code into the container
COPY . .

# Expose the application port (optional, update based on your app)
EXPOSE 3000

# Specify the default command to run the application
CMD ["bun", "start"]
