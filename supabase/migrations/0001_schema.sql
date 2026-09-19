-- GIMA admin CMS — initial schema.
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run),
-- then run 0002_seed.sql afterwards.

create extension if not exists pgcrypto;

-- ── updated_at trigger helper ────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── Singletons ────────────────────────────────────────────────────────────

create table site_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  tagline text not null,
  phone text not null,
  phone2 text,
  whatsapp text not null,
  email text not null,
  address text not null,
  hours text not null,
  map_embed text not null,
  social_facebook text,
  social_instagram text,
  social_youtube text,
  social_whatsapp text,
  default_og_image text,
  updated_at timestamptz not null default now()
);

create table hero (
  id uuid primary key default gen_random_uuid(),
  headline_lines text[] not null default '{}',
  sub_copy text not null,
  cta_primary_label text not null,
  cta_primary_href text not null,
  cta_secondary_label text not null,
  cta_secondary_href text not null,
  stats jsonb not null default '[]',
  trust_badges jsonb not null default '[]',
  background_image text not null,
  updated_at timestamptz not null default now()
);

create table about_hero (
  id uuid primary key default gen_random_uuid(),
  eyebrow text not null,
  headline text not null,
  headline_highlight text,
  body text not null,
  cta_label text not null,
  cta_href text not null,
  image text not null,
  badge_label text not null,
  badge_value text not null,
  updated_at timestamptz not null default now()
);

create table instructor (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  dan text not null,
  style text not null,
  short_bio text not null,
  bio text not null,
  bio_extended text not null,
  image text not null,
  stats jsonb not null default '[]',
  qualifications text[] not null default '{}',
  achievements text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table achievements_meta (
  id uuid primary key default gen_random_uuid(),
  stats jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- ── List content ──────────────────────────────────────────────────────────

create table programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  age_range text not null,
  short_description text not null,
  description text not null,
  image text not null,
  features text[] not null default '{}',
  duration text not null,
  schedule text not null,
  featured boolean not null default false,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  title text not null,
  category text not null check (category in ('leadership','technical','administration','advisory','coaches')),
  rank text not null,
  bio text,
  credentials jsonb not null default '[]',
  achievements text[] not null default '{}',
  image text not null,
  featured boolean not null default false,
  stats jsonb,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text not null,
  category text not null check (category in ('training','tournaments','events','black-belt')),
  width int not null,
  height int not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type text not null check (type in ('camp','grading','tournament','seminar')),
  status text not null check (status in ('upcoming','past')),
  date date not null,
  end_date date not null,
  time text not null,
  venue text not null,
  description text not null,
  image text not null,
  featured boolean not null default false,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table achievement_entries (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  result text not null,
  medals jsonb not null default '{"gold":0,"silver":0,"bronze":0}',
  description text not null,
  image text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table branches (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  type text not null check (type in ('headquarters','branch')),
  address text not null,
  phone text not null,
  email text not null,
  hours text not null,
  map_embed text not null,
  features text[] not null default '{}',
  featured boolean not null default false,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  rating int not null check (rating between 1 and 5),
  quote text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table timeline_items (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table core_values (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title text not null,
  description text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table why_choose_us_reasons (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title text not null,
  description text not null,
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  program text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);

-- ── updated_at triggers (skip contact_submissions — it has no updated_at) ──

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'site_settings','hero','about_hero','instructor','achievements_meta',
    'programs','team_members','gallery_items','events','achievement_entries',
    'branches','testimonials','faq_items','timeline_items','core_values',
    'why_choose_us_reasons'
  ])
  loop
    execute format(
      'create trigger set_updated_at before update on %I for each row execute function set_updated_at()',
      t
    );
  end loop;
end $$;

-- ── Row Level Security ───────────────────────────────────────────────────
-- Public (anon + authenticated) can read everything. Only an authenticated
-- session (the one admin account) can write. contact_submissions is the one
-- exception: the public contact form needs to insert into it directly.

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'site_settings','hero','about_hero','instructor','achievements_meta',
    'programs','team_members','gallery_items','events','achievement_entries',
    'branches','testimonials','faq_items','timeline_items','core_values',
    'why_choose_us_reasons','contact_submissions'
  ])
  loop
    execute format('alter table %I enable row level security', t);
  end loop;

  for t in select unnest(array[
    'site_settings','hero','about_hero','instructor','achievements_meta',
    'programs','team_members','gallery_items','events','achievement_entries',
    'branches','testimonials','faq_items','timeline_items','core_values',
    'why_choose_us_reasons'
  ])
  loop
    execute format('create policy "Public read access" on %I for select using (true)', t);
    execute format(
      'create policy "Authenticated write access" on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')',
      t
    );
  end loop;
end $$;

-- contact_submissions: anyone can submit, only the admin can read/manage.
create policy "Public can submit" on contact_submissions for insert with check (true);
create policy "Authenticated can manage submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');
create policy "Authenticated can update submissions" on contact_submissions
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated can delete submissions" on contact_submissions
  for delete using (auth.role() = 'authenticated');

-- ── Indexes for the columns admin list views will sort/filter by ─────────

create index on programs (order_index);
create index on team_members (category, order_index);
create index on gallery_items (category, order_index);
create index on events (status, order_index);
create index on achievement_entries (order_index);
create index on branches (order_index);
create index on testimonials (order_index);
create index on faq_items (order_index);
create index on timeline_items (order_index);
create index on core_values (order_index);
create index on why_choose_us_reasons (order_index);
create index on contact_submissions (status, created_at desc);
