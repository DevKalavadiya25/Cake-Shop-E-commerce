# Bakery API

Backend API for bakery e-commerce application with Supabase authentication.

## Features

- User authentication with Supabase Auth
- Admin role-based access control
- Product management (CRUD operations)
- Supabase PostgreSQL database
- Express.js REST API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. The Supabase database is already configured. You just need to add the service role key to your `.env` file:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

You can find the service role key in your Supabase project settings.

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

## Creating an Admin User

To create an admin user:
1. Register a user through `/api/auth/register`
2. In Supabase Dashboard, go to Authentication > Users
3. Find your user and edit their user metadata
4. Add `"role": "admin"` to the user_metadata JSON

Example user_metadata:
```json
{
  "name": "Admin User",
  "role": "admin"
}
```
