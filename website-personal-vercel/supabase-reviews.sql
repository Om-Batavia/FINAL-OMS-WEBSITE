create table if not exists public.portfolio_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  role text check (char_length(role) <= 80),
  rating integer not null check (rating between 1 and 5),
  review_text text not null check (char_length(review_text) between 1 and 420),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.portfolio_reviews enable row level security;

drop policy if exists "Anyone can read approved portfolio reviews" on public.portfolio_reviews;
create policy "Anyone can read approved portfolio reviews"
on public.portfolio_reviews
for select
using (approved = true);

drop policy if exists "Anyone can submit portfolio reviews" on public.portfolio_reviews;
create policy "Anyone can submit portfolio reviews"
on public.portfolio_reviews
for insert
with check (
  approved = true
  and char_length(name) between 1 and 60
  and char_length(review_text) between 1 and 420
  and rating between 1 and 5
);

create index if not exists portfolio_reviews_approved_created_at_idx
on public.portfolio_reviews (approved, created_at desc);

-- To require manual approval before reviews appear publicly, change the default:
-- alter table public.portfolio_reviews alter column approved set default false;
-- Then update src/lib/reviews.ts to insert approved: false.
