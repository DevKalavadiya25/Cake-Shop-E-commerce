# Bakery API

Backend API for bakery e-commerce application with JWT authentication.

## Features

- User authentication with JWT
- Admin role-based access control
- Product management (CRUD operations)
- MongoDB database
- Express.js REST API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB URI and JWT secret.

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer <token>
```

## Default Admin Account

Create an admin user by sending a POST request to `/api/auth/register` with `role: "admin"`.
