-- Migration: create_drug_incompatibilities
-- Stores known IV/Y-site/admixture drug incompatibility pairs for clinical reference.

create extension if not exists "pgcrypto";

create table if not exists public.drug_incompatibilities (
  id uuid primary key default gen_random_uuid(),

  -- The pair. Stored both ways via a generated lookup key so either order matches.
  drug_a text not null,
  drug_b text not null,
  drug_a_normalized text generated always as (lower(trim(drug_a))) stored,
  drug_b_normalized text generated always as (lower(trim(drug_b))) stored,

  -- Type of incompatibility this record describes.
  incompatibility_type text not null default 'y-site'
    check (incompatibility_type in ('y-site', 'admixture', 'syringe', 'solution')),

  -- How serious / well-established the interaction is.
  severity text not null default 'incompatible'
    check (severity in ('incompatible', 'contraindicated', 'variable', 'caution')),

  mechanism text,           -- e.g. "Forms insoluble calcium ceftriaxone precipitate"
  clinical_note text,       -- practical guidance, e.g. flushing/spacing instructions
  source text,              -- reference used, e.g. "Trissel's IV Compatibility, 20th ed."
  source_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Fast lookups regardless of which drug is "A" and which is "B"
create index if not exists idx_drug_incompat_a on public.drug_incompatibilities (drug_a_normalized);
create index if not exists idx_drug_incompat_b on public.drug_incompatibilities (drug_b_normalized);

-- Prevent exact duplicate pairs in the same direction
create unique index if not exists idx_drug_incompat_unique_pair
  on public.drug_incompatibilities (drug_a_normalized, drug_b_normalized, incompatibility_type);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_drug_incompat_updated_at on public.drug_incompatibilities;
create trigger trg_drug_incompat_updated_at
  before update on public.drug_incompatibilities
  for each row execute function public.set_updated_at();

-- RLS: readable by anyone with the anon/authenticated key, writes restricted.
alter table public.drug_incompatibilities enable row level security;

create policy "Drug incompatibilities are readable by all"
  on public.drug_incompatibilities
  for select
  using (true);

create policy "Only service role can modify drug incompatibilities"
  on public.drug_incompatibilities
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
