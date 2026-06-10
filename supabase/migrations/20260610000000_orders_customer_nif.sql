-- Guarda o NIF (opcional) do cliente nas encomendas do checkout do site.
-- A faturação é emitida noutro software; o NIF segue também para o CRM (Kommo).
alter table public.orders
  add column if not exists customer_nif text not null default '';
