-- ============================================================
-- SCHEMA - Casamento Eckson & Palmira
-- Execute este ficheiro no SQL Editor do Supabase:
-- https://app.supabase.com → SQL Editor → New Query
-- ============================================================

-- Tabela de confirmações de presença
create table if not exists rsvps (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  email         text,
  telefone      text,
  acompanhantes text default '1 pessoa',
  status        text default 'pendente' check (status in ('confirmado','recusado','pendente')),
  mensagem      text,
  created_at    timestamptz default now()
);

-- Tabela de fotos da galeria
create table if not exists photos (
  id           uuid primary key default gen_random_uuid(),
  url          text not null,
  storage_path text not null,
  caption      text default '',
  ordem        bigint default 0,
  created_at   timestamptz default now()
);

-- Tabela de configurações do site
create table if not exists settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- Dados iniciais das configurações
insert into settings (key, value) values
  ('data_casamento',   '2026-10-03T16:00:00'),
  ('data_display',     '03 de Outubro, 2026'),
  ('ano_casamento',    '2026'),
  ('hora_cerimonia',   '16:00h'),
  ('hora_recepcao',    '18:00h'),
  ('local_cerimonia',  'A confirmar'),
  ('morada_cerimonia', ''),
  ('local_recepcao',   'A confirmar'),
  ('morada_recepcao',  ''),
  ('mpesa',            'A confirmar'),
  ('prazo_rsvp',       '15 de Setembro de 2026'),
  ('foto_hero',        '')
on conflict (key) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- rsvps: qualquer pessoa pode inserir (formulário público)
--        só o admin lê/edita/apaga
alter table rsvps enable row level security;
create policy "Qualquer um pode confirmar presença"
  on rsvps for insert with check (true);
create policy "Leitura pública dos rsvps"
  on rsvps for select using (true);
create policy "Update dos rsvps"
  on rsvps for update using (true);
create policy "Delete dos rsvps"
  on rsvps for delete using (true);

-- photos: leitura pública, escrita autenticada (ou anon para simplificar)
alter table photos enable row level security;
create policy "Fotos visíveis a todos"
  on photos for select using (true);
create policy "Admin insere fotos"
  on photos for insert with check (true);
create policy "Admin actualiza fotos"
  on photos for update using (true);
create policy "Admin apaga fotos"
  on photos for delete using (true);

-- settings: leitura pública
alter table settings enable row level security;
create policy "Settings visíveis a todos"
  on settings for select using (true);
create policy "Admin actualiza settings"
  on settings for insert with check (true);
create policy "Admin update settings"
  on settings for update using (true);

-- ============================================================
-- STORAGE - Bucket para fotos
-- Execute separadamente em: Storage → New Bucket
-- Nome: wedding-photos
-- Public: SIM (activar)
-- ============================================================
