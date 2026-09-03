# Order Backend — Planned Work

## The problem

Checkout currently has no backend. Payment goes to Paystack client-side, and
once it succeeds, the "order confirmed" screen shows purely from client-side
state (`checkout-page.jsx`). There is no server-side verification, no order
record, and no notification — the only record of a sale lives in the
Paystack dashboard. Nothing here is fake or broken today, it's just missing.

## What to build, in order

1. **Server-side payment verification** — a serverless function
   (`/api/verify-payment`) that calls Paystack's server API with the
   **secret key** to confirm a transaction actually succeeded, before the
   confirmation screen is shown. Closes the gap where a client-side-only
   "success" state could be spoofed.

2. **Record the order** — same or a second function writes the order
   (customer info, cart items, total, Paystack reference, status) to a
   database.

3. **Notify on new orders** — send an email (via Resend or SendGrid) on
   every successful order so orders don't require manually checking a
   dashboard.

4. **Admin view** — a simple password-protected `/admin/orders` page in
   this app listing rows from the database. Doesn't need to be a full admin
   panel, just a table.

5. **Optional, more robust: Paystack webhook** — instead of (or alongside)
   step 1, have Paystack POST to a webhook URL on successful payment. This
   is the standard production pattern and also catches cases where the
   browser closes before the client-side callback fires.

## Decisions already made

- **Hosting**: stays on Vercel. Steps 1–3 are just serverless functions
  living alongside the existing app — no need to leave Vercel or go
  headless/Shopify for this.
- **Database**: Vercel Postgres (Neon under the hood). Create it from the
  Vercel dashboard → project → **Storage** tab → **Create Database** →
  Postgres. Vercel can inject the connection string as an env var directly.

## What's needed before starting

- **Paystack secret key** — Paystack dashboard → **Settings → API Keys &
  Webhooks** → copy the **Secret Key** (`sk_test_...` or `sk_live_...`).
  This is different from the existing `VITE_PAYSTACK_PUBLIC_KEY` and must
  only ever be used server-side (add it in Vercel → Environment Variables
  as `PAYSTACK_SECRET_KEY`, never in client code).
- **Database created** in Vercel's Storage tab (see above).

Once both of those are in place, come back and ask to build this out —
verify-payment function, order table/schema, webhook handler, and the
admin orders page, in one pass.
