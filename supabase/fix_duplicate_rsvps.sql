-- ============================================================
-- CORRIGE RSVPs DUPLICADOS (mesmo nome + telefone)
-- Execute este ficheiro no SQL Editor do Supabase:
-- https://app.supabase.com → SQL Editor → New Query
-- ============================================================

-- 1) Remove duplicados existentes, mantendo apenas o registo mais antigo
--    de cada par (nome, telefone) normalizado.
with duplicados as (
  select
    id,
    row_number() over (
      partition by lower(trim(nome)), regexp_replace(coalesce(telefone, ''), '\D', '', 'g')
      order by created_at asc
    ) as posicao
  from rsvps
)
delete from rsvps
where id in (select id from duplicados where posicao > 1);

-- 2) Impede novos duplicados a nível de base de dados
--    (mesmo que dois pedidos cheguem ao mesmo tempo).
create unique index if not exists rsvps_nome_telefone_unique
  on rsvps (lower(trim(nome)), regexp_replace(coalesce(telefone, ''), '\D', '', 'g'));
