FROM mcr.microsoft.com/playwright:focal

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]