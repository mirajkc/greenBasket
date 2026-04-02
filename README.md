# GreenBasket

GreenBasket is a full-stack MERN grocery ecommerce application with user and seller flows, cart and checkout management, Stripe payments, and a Dockerized deployment setup.

## Features

- User authentication with secure cookies
- Product browsing and category filtering
- Cart management with quantity updates
- Address management during checkout
- Order placement with Cash on Delivery and Stripe
- Seller panel for product and order management
- Newsletter email integration (Resend)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose)
- Media: Cloudinary
- Payments: Stripe
- Email: Resend
- Reverse Proxy: Nginx
- Containerization: Docker, Docker Compose

## Project Structure

```text
greenBasket/
	client/      # React + Vite frontend
	server/      # Express API + MongoDB integration
	nginx/       # Nginx reverse proxy config
	docker-compose.yml
```

## Prerequisites

- Node.js 20+ (22 recommended)
- npm
- MongoDB Atlas (or local MongoDB)
- Docker and Docker Compose (for containerized run)

## Environment Variables

Create a `server/.env` file with your actual credentials.

```env
PORT=4000
NODE_ENV=production

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

SELLER_EMAIL=admin@example.com
SELLER_PASSWORD=strong_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

STRIPE_PUBLISHABLE_KEYS=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

SMTP_PROVIDER=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_FROM=your_email@example.com
SMTP_PASSWORD=your_app_password

RESEND_KEY=your_resend_api_key
```

Notes:

- Do not add spaces around `=` in `.env` values.
- In Docker Compose, `server/.env` is mounted into the server container.
- Frontend API base URL is injected at build time as `VITE_BACKEND_URL=/` for Nginx same-origin proxying.

## Local Development (Without Docker)

1. Install server dependencies:

```bash
cd server
npm install
```

2. Install client dependencies:

```bash
cd ../client
npm install
```

3. Start backend:

```bash
cd ../server
npm run dev
```

4. Start frontend:

```bash
cd ../client
npm run dev
```

5. Open the frontend URL printed by Vite (typically `http://localhost:5173`).

## Run With Docker Compose

From the project root:

```bash
docker compose build --no-cache
docker compose up -d
```

Access the app at:

- `http://localhost`

Stop containers:

```bash
docker compose down
```

## Docker Service Overview

- `server`: Node.js API running on port `4000`
- `client`: Builds the Vite app and serves static assets via Nginx container image
- `nginx`: Public entrypoint on port `80`, proxies:
	- `/` to `client:80`
	- `/api` to `server:4000`

## Common Troubleshooting

### Missing Resend API key

If you see an error about missing API key:

- Confirm `RESEND_KEY` exists in `server/.env`
- Rebuild and restart containers:

```bash
docker compose build --no-cache
docker compose up -d
```

### Backend not reachable from frontend

- Ensure Nginx service is running and bound to port `80`
- Confirm the `nginx/default.conf` upstreams point to `client:80` and `server:4000`

### Stripe webhook issues

- Verify `STRIPE_WEBHOOK_SECRET`
- Ensure webhook endpoint targets the backend route exposed by your server

