create table listings (
  id serial primary key,
  user_id uuid references profiles(id) on delete cascade,
  sticker_number text not null,
  note text,
  photo_url text,
  wants text,
  created_at timestamp default now()
);

alter table listings enable row level security;
create policy "Listings visibles par tous" on listings for select using (true);
create policy "Créer sa propre annonce" on listings for insert with check (auth.uid() = user_id);
create policy "Supprimer sa propre annonce" on listings for delete using (auth.uid() = user_id);
