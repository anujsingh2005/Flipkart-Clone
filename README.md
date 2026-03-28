# Flipkart Clone

A full-stack Flipkart-inspired e-commerce application built with React, Express, and MySQL. The project includes product browsing, filtering, cart management, authentication, wishlist support, checkout, and order history.

## Features

- Product catalog with category filters, search, ratings, and pagination
- Product detail pages with images, pricing, stock, and specifications
- Cart management with quantity updates and checkout flow
- User authentication with signup, login, token validation, and protected wishlist routes
- Wishlist add/remove flow tied to authenticated users
- Order placement, confirmation, and order history
- MySQL-backed product, cart, wishlist, and order data
- Responsive UI built with Tailwind CSS and Vite

## Tech Stack

- Frontend: React 18, React Router, Axios, Tailwind CSS, Vite
- Backend: Node.js, Express, mysql2, JWT, bcryptjs
- Database: MySQL

## Project Structure

```text
.
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   `-- utils/
|   `-- vite.config.js
|-- package.json
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MySQL 8+

### 1. Install dependencies

From the project root:

```bash
npm install
npm run install-all
```

### 2. Configure environment variables

Create these files if they do not already exist:

- `backend/.env`
- `frontend/.env`

Example backend config:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flipkart_clone
DB_PORT=3306
PORT=5000
JWT_SECRET=replace-with-a-secure-secret
ALLOWED_ORIGINS=http://localhost:3000
```

Example frontend config:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Create the database

```sql
CREATE DATABASE flipkart_clone;
```

Run the schema and seed files:

```bash
mysql -u root -p flipkart_clone < backend/models/database.sql
mysql -u root -p flipkart_clone < backend/models/seed.sql
```

If you want to refresh product images after seeding:

```bash
node backend/models/updateImages.js
```

### 4. Run the app

From the root directory:

```bash
npm run dev
```

Apps will be available at:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Deployment

### Frontend on Vercel

Deploy the `frontend` directory as a Vite project.

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend-url`

SPA routing is already configured with [frontend/vercel.json](/d:/Flipkart%20Clone/frontend/vercel.json).

### Backend on Railway

Deploy the `backend` directory as a Node.js service.

- Root directory: `backend`
- Start command: `npm start`

Set these environment variables in Railway:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=replace-with-a-secure-secret
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

For the database, either:

- provision a Railway MySQL service and use `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, or
- provide a `MYSQL_URL`/`DATABASE_URL` connection string.

The backend now supports both the local `DB_*` variables and Railway-style MySQL variables.

## Available Scripts

### Root

```bash
npm run dev
npm run backend
npm run frontend
npm run install-all
```

### Backend

```bash
npm --prefix backend start
npm --prefix backend dev
```

### Frontend

```bash
npm --prefix frontend dev
npm --prefix frontend build
npm --prefix frontend preview
```

## Demo Notes

- The app supports authenticated users for wishlist and account-based flows.
- A demo/default user is also created for guest-cart behavior where needed.
- Product images are served locally from `frontend/public/products`.

## API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/validate-token`

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/categories`

### Cart

- `GET /api/cart/:userId`
- `POST /api/cart/:userId`
- `PUT /api/cart/:cartItemId`
- `DELETE /api/cart/:cartItemId`
- `DELETE /api/cart/user/:userId`

### Wishlist

- `GET /api/wishlist/:userId`
- `POST /api/wishlist/:userId`
- `DELETE /api/wishlist/product/:productId/user/:userId`

### Orders

- `POST /api/orders`
- `GET /api/orders/user/:userId`
- `GET /api/orders/:orderId`

## Current Status

- Wishlist and auth flow fixed for token-based users
- Product image set localized and updated across the catalog
- Order history and confirmation pages use product images

## License

This project is for learning and portfolio use.
