# Use the official Node.js image
FROM node:20.18.0

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to access the app
EXPOSE 3000

# Run the app in development mode
CMD ["yarn", "dev"]
