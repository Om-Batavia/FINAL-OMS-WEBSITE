create table if not exists public.portfolio_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60 and name = btrim(name)),
  role text check (char_length(role) <= 80 and role = btrim(role)),
  rating integer not null check (rating between 1 and 5),
  review_text text not null check (char_length(review_text) between 10 and 420 and review_text = btrim(review_text)),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.portfolio_reviews alter column approved set default false;
alter table public.portfolio_reviews drop constraint if exists portfolio_reviews_name_check;
alter table public.portfolio_reviews add constraint portfolio_reviews_name_check
  check (char_length(name) between 2 and 60 and name = btrim(name)) not valid;
alter table public.portfolio_reviews drop constraint if exists portfolio_reviews_role_check;
alter table public.portfolio_reviews add constraint portfolio_reviews_role_check
  check (char_length(role) <= 80 and role = btrim(role)) not valid;
alter table public.portfolio_reviews drop constraint if exists portfolio_reviews_review_text_check;
alter table public.portfolio_reviews add constraint portfolio_reviews_review_text_check
  check (char_length(review_text) between 10 and 420 and review_text = btrim(review_text)) not valid;
alter table public.portfolio_reviews enable row level security;

drop policy if exists "Anyone can read approved portfolio reviews" on public.portfolio_reviews;
create policy "Anyone can read approved portfolio reviews"
on public.portfolio_reviews
for select
to anon, authenticated
using (approved = true);

drop policy if exists "Anyone can submit portfolio reviews" on public.portfolio_reviews;

revoke all on public.portfolio_reviews from anon, authenticated;
grant select on public.portfolio_reviews to anon, authenticated;
grant all on public.portfolio_reviews to service_role;

create index if not exists portfolio_reviews_approved_created_at_idx
on public.portfolio_reviews (created_at desc)
where approved = true;

create table if not exists public.portfolio_review_rate_limits (
  ip_hash text not null check (ip_hash ~ '^[a-f0-9]{64}$'),
  window_start timestamptz not null,
  submission_count integer not null default 1 check (submission_count between 1 and 3),
  primary key (ip_hash, window_start)
);

alter table public.portfolio_review_rate_limits enable row level security;
revoke all on public.portfolio_review_rate_limits from anon, authenticated;
grant all on public.portfolio_review_rate_limits to service_role;

drop policy if exists "No public access to review rate limits" on public.portfolio_review_rate_limits;
create policy "No public access to review rate limits"
on public.portfolio_review_rate_limits
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

create or replace function public.reserve_portfolio_review_submission(p_ip_hash text)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  reserved_count integer;
begin
  if p_ip_hash !~ '^[a-f0-9]{64}$' then
    return false;
  end if;

  delete from public.portfolio_review_rate_limits
  where window_start < date_trunc('hour', now()) - interval '24 hours';

  insert into public.portfolio_review_rate_limits (ip_hash, window_start, submission_count)
  values (p_ip_hash, date_trunc('hour', now()), 1)
  on conflict (ip_hash, window_start) do update
    set submission_count = public.portfolio_review_rate_limits.submission_count + 1
    where public.portfolio_review_rate_limits.submission_count < 3
  returning submission_count into reserved_count;

  return reserved_count is not null;
end;
$$;

revoke all on function public.reserve_portfolio_review_submission(text) from public, anon, authenticated;
grant execute on function public.reserve_portfolio_review_submission(text) to service_role;

comment on table public.portfolio_reviews is 'Moderated reviews submitted through the portfolio-reviews Edge Function.';
comment on table public.portfolio_review_rate_limits is 'Privacy-preserving hourly submission counters keyed by a one-way IP hash.';
