-- ============================================================
-- Cozy Paws Cattery — Supabase schema
-- Run this once in your Supabase project: SQL Editor → New query
-- → paste everything → Run.
-- ============================================================

-- ---------- Tables ----------
-- Each table stores the app object as jsonb; the app maps it 1:1.
create table if not exists public.kittens (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- NOTE: these policies are permissive (anyone with the anon key can
-- write) because the admin login is front-end only. Good enough to
-- launch; tighten with Supabase Auth when you're ready.
alter table public.kittens   enable row level security;
alter table public.orders    enable row level security;
alter table public.inquiries enable row level security;
alter table public.videos    enable row level security;

drop policy if exists "public access" on public.kittens;
create policy "public access" on public.kittens
  for all using (true) with check (true);

drop policy if exists "public access" on public.orders;
create policy "public access" on public.orders
  for all using (true) with check (true);

drop policy if exists "public access" on public.inquiries;
create policy "public access" on public.inquiries
  for all using (true) with check (true);

drop policy if exists "public access" on public.videos;
create policy "public access" on public.videos
  for all using (true) with check (true);

-- ---------- Realtime ----------
alter publication supabase_realtime add table public.kittens;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.inquiries;
alter publication supabase_realtime add table public.videos;

-- ---------- Storage bucket for video uploads ----------
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

drop policy if exists "videos public read" on storage.objects;
create policy "videos public read" on storage.objects
  for select using (bucket_id = 'videos');

drop policy if exists "videos public insert" on storage.objects;
create policy "videos public insert" on storage.objects
  for insert with check (bucket_id = 'videos');

drop policy if exists "videos public delete" on storage.objects;
create policy "videos public delete" on storage.objects
  for delete using (bucket_id = 'videos');

-- Done. The website seeds the starter kittens automatically on its
-- first load, so no manual inserts are needed.
