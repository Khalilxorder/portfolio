-- Portfolio /map schema. Run once against a fresh Supabase project.

create table if not exists projects (
  id text primary key,
  title text not null,
  description text not null default '',
  image_url text,
  year text not null default '',
  url text not null default '',
  category text not null default 'commercial'
    check (category in ('scientific', 'commercial')),
  published boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_category_position_idx
  on projects (category, position);

alter table projects enable row level security;

-- Public anon clients can only read published projects.
-- The /map editor goes through Vercel functions using the service-role key,
-- which bypasses RLS, so no write policy is needed here.
drop policy if exists "anon read published" on projects;
create policy "anon read published" on projects
  for select using (published = true);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- Storage bucket for project images. Public read so the static site can use the URLs directly.
insert into storage.buckets (id, name, public)
  values ('project-images', 'project-images', true)
  on conflict (id) do nothing;

drop policy if exists "public read project images" on storage.objects;
create policy "public read project images" on storage.objects
  for select using (bucket_id = 'project-images');

-- Seed: copy the current portfolio list. Safe to run repeatedly.
insert into projects (id, title, description, year, url, category, published, position) values
  ('big-five-prediction', 'Big Five Prediction',
   'The thesis project: predicting Big Five trait signals from written text with interpretable NLP.',
   '2026', 'https://github.com/Khalilxorder/bigfive', 'scientific', true, 0),
  ('self', 'SELF',
   'A self-discovery platform with Big Five, cognitive, and narrative assessments - moving toward psyche mapping and life-event reorganization against ideal capacity.',
   '2024', 'https://my-bigfive-app.vercel.app/', 'scientific', true, 1),
  ('working-memory-test', 'Neural Memory Test',
   'A working-memory test with direct controls, scoring, and repeatable trials.',
   '2024', 'https://w-mtest.vercel.app/', 'scientific', true, 2),
  ('binary-deconstructor', 'Binary Deconstructor',
   'Audio deconstruction: stems, MIDI, tempo, chords. Live demo preview; full processing runs against a local backend.',
   '2024', 'https://frontend-psi-three-13.vercel.app/', 'scientific', true, 3),
  ('explore', 'eXplore',
   'Priority alerts and a focused feed for important AI releases and Iran/Qatar developments.',
   '2026', '/explore.html', 'commercial', true, 0),
  ('csai-voice-agent', 'CSAI Voice Agent',
   'A multilingual customer service voice agent with model-fit routing and monthly cost planning.',
   '2026', '/csai.html', 'commercial', true, 1),
  ('scholarship-search', 'Scholarship Search Engine',
   'A focused search workspace for discovering scholarships and comparing fit quickly.',
   '2024', 'https://scholarship-search.vercel.app/', 'commercial', true, 2),
  ('student-apartment', 'Student Apartment',
   'AI-assisted owner uploads and student matching from video, photos, categories, and natural language.',
   '2024', '/student-apartment.html', 'commercial', true, 3)
on conflict (id) do nothing;
