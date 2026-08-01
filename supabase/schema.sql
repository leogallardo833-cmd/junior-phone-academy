-- Ejecutar esto en el SQL Editor de tu proyecto de Supabase (una sola vez)

-- Perfiles de usuario (se crea automático al registrarse)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  created_at timestamp with time zone default now()
);

-- Cursos disponibles
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  cover_image_url text,
  price_usd numeric not null default 0,
  published boolean default false,
  created_at timestamp with time zone default now()
);

-- Clases dentro de cada curso
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses on delete cascade not null,
  title text not null,
  position int not null default 0,
  video_url text,
  pdf_url text,
  created_at timestamp with time zone default now()
);

-- Compras confirmadas (se completa vía webhook de Mercado Pago en Fase 2)
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  course_id uuid references courses on delete cascade not null,
  status text not null default 'pending', -- pending | approved | rejected
  mp_payment_id text,
  created_at timestamp with time zone default now(),
  unique (user_id, course_id)
);

-- Progreso por clase
create table if not exists lesson_progress (
  user_id uuid references auth.users on delete cascade not null,
  lesson_id uuid references lessons on delete cascade not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  primary key (user_id, lesson_id)
);

-- Seguridad a nivel de fila (RLS)
alter table profiles enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table purchases enable row level security;
alter table lesson_progress enable row level security;

-- Cualquiera puede ver los cursos publicados (catálogo público)
create policy "Cursos publicados son públicos"
  on courses for select
  using (published = true);

-- Un usuario solo ve su propio perfil
create policy "Ver mi perfil"
  on profiles for select
  using (auth.uid() = id);

-- Un usuario solo ve sus propias compras
create policy "Ver mis compras"
  on purchases for select
  using (auth.uid() = user_id);

-- Un usuario solo ve/edita su propio progreso
create policy "Ver mi progreso"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Actualizar mi progreso"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Modificar mi progreso"
  on lesson_progress for update
  using (auth.uid() = user_id);

-- Las clases (video/pdf) solo se ven si el curso fue comprado y aprobado
create policy "Ver clases de cursos comprados"
  on lessons for select
  using (
    exists (
      select 1 from purchases
      where purchases.course_id = lessons.course_id
        and purchases.user_id = auth.uid()
        and purchases.status = 'approved'
    )
  );

-- Trigger: crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
