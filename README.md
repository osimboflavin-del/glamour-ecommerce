# Glamour Cosmetics — full-stack source

A real (non-demo) e-commerce site: an Express + Prisma REST API backend and a
React (Vite) frontend that calls it over HTTP. No mock data lives in the
frontend — every product, order, account and inquiry is read from and written
to the database through the API.

## Why you need to run this yourself

This code was generated in a sandboxed environment with no outbound network
access and no way to keep a server running after the chat ends, so it can't
be hosted live from here. Running it takes about 5 minutes.

## 1. Backend setup

```bash
cd backend
cp .env.example .env        # edit secrets if you like
npm install
npx prisma migrate dev --name init
npm run seed                 # creates admin@glamour.com / admin123 + sample products
npm run dev                  # API now running on http://localhost:4000
```

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                  # site now running on http://localhost:5173
```

Open http://localhost:5173 — sign up as a customer, or log in as
`admin@glamour.com` / `admin123` to reach `/admin`.

## What's real here

- **Auth**: passwords hashed with bcrypt, JWT access tokens (15 min) +
  httpOnly refresh token cookie (30 days), an `Admin` role gate on
  admin-only routes.
- **Products**: search / category filter / sort are real SQL queries
  (`GET /api/products?search=&category=&sort=`), not client-side filtering
  of a fixed array.
- **Checkout**: prices are recomputed server-side from the database (never
  trusts the frontend's numbers), stock is decremented in a DB transaction,
  and an order + order-items row is created.
- **Admin dashboard**: add/remove products, see every order, change order
  status, and view inquiries — all hitting the real API with the admin's
  JWT.

## Deploying it for real

- **Database**: swap `provider = "sqlite"` for `"postgresql"` in
  `backend/prisma/schema.prisma`, point `DATABASE_URL` at a hosted Postgres
  (e.g. Neon, Supabase, Railway), then `npx prisma migrate deploy`.
- **Backend**: deploy the `backend/` folder to Render, Railway or a small
  VPS. Set the same env vars as `.env.example`, with `CLIENT_ORIGIN` set to
  your deployed frontend's URL.
- **Frontend**: `npm run build` in `frontend/`, deploy the `dist/` folder to
  Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed
  backend's URL.
- **Payments**: wire in M-Pesa Daraja (STK Push) or Stripe/Paystack inside
  `backend/src/routes/orders.routes.js` at the point the order is created.
- **Social login**: add Passport.js Google/Facebook strategies as new routes
  under `backend/src/routes/auth.routes.js`, and point the frontend's
  "Continue with Google" button at that route.

## Folder structure

```
backend/    Express API, Prisma schema + seed, JWT auth, admin middleware
frontend/   React (Vite) app: pages, contexts (auth/cart), api.js client
```
