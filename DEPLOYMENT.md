# Deployment Guide

## Frontend (Vercel)

1. Push the repository to GitHub.
2. Create a new Vercel project and connect the repository.
3. Set the framework preset to Vite.
4. Add the environment variable:
   - VITE_API_URL = https://your-backend-url.onrender.com
5. Deploy.

## Backend (Render)

1. Create a new Render web service from the repository.
2. Use the following build command:
   - npm install && npm run build:server
3. Use the following start command:
   - node dist-server/index.js
4. Add the environment variables:
   - PORT = 10000
   - CORS_ORIGIN = https://your-frontend-url.vercel.app
5. Deploy.

## Notes

- The frontend reads the API base URL from VITE_API_URL.
- The backend uses CORS_ORIGIN for the production Access-Control-Allow-Origin header.
- The Vite frontend is configured for SPA routing through vercel.json.
