#!/bin/bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Build the application
next build