-- Fix: contact_submissions is missing its public-insert policy (the contact
-- form needs anonymous visitors to be able to insert). Safe to re-run.

drop policy if exists "Public can submit" on contact_submissions;
drop policy if exists "Authenticated can manage submissions" on contact_submissions;
drop policy if exists "Authenticated can update submissions" on contact_submissions;
drop policy if exists "Authenticated can delete submissions" on contact_submissions;

create policy "Public can submit" on contact_submissions for insert with check (true);
create policy "Authenticated can manage submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');
create policy "Authenticated can update submissions" on contact_submissions
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated can delete submissions" on contact_submissions
  for delete using (auth.role() = 'authenticated');
