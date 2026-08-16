create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text default '',
  category text default '',
  thumbnail_url text not null,
  cover_url text,
  gallery jsonb default '[]'::jsonb,
  video_url text,
  external_url text,
  featured boolean default false,
  published boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists projects_published_idx on projects (published, sort_order);
create index if not exists projects_slug_idx on projects (slug);

alter table projects enable row level security;

create policy "المشاريع المنشورة تُقرأ للجميع"
  on projects for select
  using (published = true);
