-- Lotus Interiors catalog schema
-- Run in the Supabase SQL editor (or via supabase db push).

create extension if not exists "pgcrypto";

create table if not exists public.attribute_definitions (
  id text primary key,
  slug text not null unique,
  label text not null,
  type text not null check (
    type in ('text', 'number', 'select', 'multiselect', 'color', 'dimension_list')
  ),
  required boolean not null default false,
  filterable boolean not null default false,
  sort_order integer not null default 0,
  unit text not null default '',
  options jsonb not null default '[]'::jsonb,
  fields jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  active boolean not null default true,
  attribute_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  category_id text not null references public.categories (id) on delete restrict,
  original_price numeric not null default 0,
  sale_price numeric not null default 0,
  on_sale boolean not null default false,
  published boolean not null default true,
  image text not null default '',
  images jsonb not null default '[]'::jsonb,
  gallery_top text not null default '',
  gallery_bottom text not null default '',
  attributes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_published_idx on public.products (published);
create index if not exists products_attributes_gin on public.products using gin (attributes);

create table if not exists public.enquiries (
  id text primary key,
  product_id text not null default '',
  product_name text not null default '',
  product_snapshot jsonb not null default '{}'::jsonb,
  email text not null default '',
  phone text not null default '',
  message text not null default '',
  source text not null default 'contact',
  status text not null default 'new',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Private admin access via service role only. Public site reads through Next.js.
alter table public.attribute_definitions enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.enquiries enable row level security;

-- Storage bucket for product images (create once).
insert into storage.buckets (id, name, public, file_size_limit)
values ('product-images', 'product-images', true, 10485760)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;
