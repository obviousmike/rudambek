# Shopify Setup Checklist

Steps to get a Shopify store ready so it can be connected to this frontend
as a headless backend (products, inventory, cart, checkout, payments).
Everything here happens in the Shopify admin — no code changes yet.

## 1. Create the store

- [ ] Sign up at shopify.com and choose a plan (Basic is fine to start)
- [ ] Set store currency to **GHS**
- [ ] Set store address/region to Ghana

## 2. Turn on payments (Paystack)

Shopify's own payment processor isn't available in Ghana, so Paystack runs
as a payments app instead.

- [ ] Admin → **Settings → Payments → Add payment method**
- [ ] Search for and install **Paystack**
- [ ] Enter your Paystack API keys (from the Paystack dashboard)
- [ ] Activate Paystack, run one test transaction with test keys before going live

## 3. Add the product catalog (~200 products)

At this size, don't add products one-by-one — use Shopify's **CSV import**
instead (**Products → Import**, top right).

- [ ] Download Shopify's sample product CSV as a template (**Products → Import
      → "Download a sample CSV file"**)
- [ ] Fill it in — one row per size/variant, with the same product handle
      repeated across its size rows (this is how Shopify groups variants
      under one product). Columns to fill per product:
  - Title, Description, Type (category), Tags
  - Price, Compare at Price (for sale pricing)
  - Image Src (a URL Shopify can fetch — see image note below)
  - Option1 Name = "Size", Option1 Value = XS/S/M/L/XL/XXL per row
  - Variant Inventory Qty (real stock count per size)
- [ ] Images: CSV import pulls images from URLs, so product photos need to
      be reachable online first (e.g. uploaded somewhere temporary, or added
      to Shopify's Files first) rather than pasted from your computer
- [ ] Run the import, spot-check ~10–15 random products for correct price,
      image, and size options before trusting the rest
- [ ] Group products into **Collections** (Dresses, Kaftans, Men's,
      Two-Piece Sets, Evening Wear, etc.) — either as a column in the CSV
      (`Product Category`) or after import via **Collections → automated
      rules** matching on Type/Tags, so 200 products don't have to be
      sorted into collections by hand

If the 200 products already exist somewhere as a spreadsheet, product
feed, or export from another store, say so — it's often possible to
reshape that directly into Shopify's CSV format instead of re-entering
everything from scratch.

## 4. Generate a Storefront API token

This is what lets the existing React frontend read products and manage
carts without touching Shopify's admin.

- [ ] Admin → **Settings → Apps and sales channels → Develop apps**
- [ ] Create an app (e.g. "Rudambek Storefront")
- [ ] Under **API credentials**, configure **Storefront API** scopes:
      `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`
      (or `unauthenticated_write_carts` on newer API versions)
- [ ] Install the app, then copy the **Storefront API access token**
- [ ] Note the store's `.myshopify.com` domain

## 5. Hand off to development

Send over (privately, not in chat/plaintext where it'll be logged):

- [ ] Storefront API access token
- [ ] Store domain (`your-store.myshopify.com`)
- [ ] Confirmation Paystack is activated and tested

Once these are in hand, the next step is wiring the frontend to fetch
products from Shopify via the Storefront API and replacing the local
`product-store.js` catalog — that part is code, not admin work.

## A note on scale (10 → 200 products)

The current site loads all products into memory at once from a small
local file, which works fine for 10 items but not for 200. Connecting to
Shopify will also require changing how the Shop/Categories pages fetch
products — paged loading (e.g. 24–48 at a time, fetching more as you
scroll or page) instead of one big list. That's expected and part of the
same integration work, not something to solve separately.
