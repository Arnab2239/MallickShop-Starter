# MallickShop - Starter

This scaffold provides a minimal, working 3-tier architecture example using Next.js (frontend + API routes as application tier) and MongoDB (data tier). It includes Redux-based cart state and JWT auth endpoints.

## Quickstart (development)
1. Copy `.env.example` to `.env.local` and fill values.
2. Install deps: `npm install`
3. Start dev server: `npm run dev`

## Docker compose (production-like)
1. `docker-compose up --build`
2. App: http://localhost:3000

## Notes
- This is a starter scaffold to get you deploying fast. Replace JWT secret, add HTTPS, add rate-limiting and validation for production.
- For full-featured checkout, integrate a payment gateway (Stripe, Razorpay).
