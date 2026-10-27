# Supabase setup (optional)

With `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set, **all catalog data and image uploads go to Supabase** (Postgres + Storage). Local `data/catalog.json` and `public/uploads` are not used.

Offline escape hatch only: set `CMS_STORAGE=file` (not recommended for production).

## Steps

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`schema.sql`](./schema.sql).
3. Copy **Project URL** and **service_role** key into `.env`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Seed from the local catalog:

```bash
npm run sync:supabase
```

5. Restart `npm run dev`. The catalog store auto-selects Supabase when those env vars are set.

## Notes

- Keep the **service role** key server-side only (never `NEXT_PUBLIC_`).
- Product uploads go to the `product-images` storage bucket when Supabase is enabled.
- Admin auth remains the existing password cookie — Supabase Auth is not required for v1.

### Existing projects

If you already ran an older schema, add gallery support, enquiry snapshots, and raise the upload limit with:

```sql
alter table public.products
  add column if not exists images jsonb not null default '[]'::jsonb;

alter table public.enquiries
  add column if not exists product_snapshot jsonb not null default '{}'::jsonb;

update storage.buckets
set file_size_limit = 10485760,
    public = true
where id = 'product-images';
```
