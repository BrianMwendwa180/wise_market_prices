# Wise Market Prices

## Project Overview

Wise Market Prices is a web application designed to empower small-scale farmers with timely market price insights and connections to local buyers. The backend provides RESTful API endpoints for authentication, market prices, categories, and user management. The frontend is built with React, TypeScript, and Tailwind CSS, offering a user-friendly interface for viewing market prices and finding buyers.

## How to Run the Project Locally

### Prerequisites

- Node.js and npm installed (recommended to install via nvm: https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Steps

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd wise_market_prices

# Install dependencies for both frontend and backend
npm install
cd backend
npm install
cd ..

# Start the backend server (runs on port 4000)
node backend/index.js

# In a separate terminal, start the frontend development server
npm run dev
```

### API Endpoints

- `POST /api/auth/register` - Register a new user. Requires JSON body with `username` and `password`.
- `POST /api/auth/login` - Login a user. Requires JSON body with `username` and `password`.
- `GET /api/auth/me` - Get current user profile. Requires Authorization header with Bearer token.
- Other endpoints:
  - `/api/prices`
  - `/api/categories`
  - `/api/users` (protected routes)

### Notes

- The backend uses JWT for authentication.
- Ensure API requests use the correct HTTP methods and URLs.
- A catch-all route is implemented to return a 404 JSON response for unknown routes.

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js (backend)
- bcryptjs, jsonwebtoken for authentication

## Deployment

You can deploy the project using your preferred hosting service. For local development, use the commands above.

## Additional Resources


