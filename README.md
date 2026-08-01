# Banco de Trabajo — Plataforma de cursos (Fase 1)

Esta es la Fase 1: catálogo de cursos + registro/login de usuarios. Todavía
no tiene cobro (eso es la Fase 2) ni descarga de contenido protegido (Fase 3).

## Qué incluye esta fase

- Catálogo de cursos (`/`) que lee de Supabase.
- Registro (`/registro`) y login (`/login`) de usuarios reales.
- Página de detalle de curso (`/cursos/[slug]`) con listado de clases.
- Base de datos con seguridad a nivel de fila (RLS) ya configurada para
  que cada usuario solo vea lo que le corresponde.

## Paso 1 — Crear cuenta en Supabase (gratis)

1. Andá a https://supabase.com y creá una cuenta.
2. Creá un proyecto nuevo (elegí una región cercana, ej. São Paulo).
3. Andá a **SQL Editor** → pegá el contenido de `supabase/schema.sql` →
   ejecutalo. Esto crea todas las tablas y reglas de seguridad.
4. Andá a **Project Settings → API** y copiá:
   - `Project URL`
   - `anon public key`

## Paso 2 — Configurar el proyecto en tu computadora

Necesitás tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

```bash
# Dentro de la carpeta del proyecto
npm install
cp .env.local.example .env.local
```

Abrí `.env.local` y pegá el `Project URL` y el `anon key` que copiaste de Supabase.

```bash
npm run dev
```

Abrí http://localhost:3000 — ya deberías ver el catálogo (vacío hasta que
cargues un curso, ver Paso 3).

## Paso 3 — Cargar tu primer curso de prueba

En Supabase, andá a **Table Editor → courses** y agregá una fila manualmente:

| campo | valor de ejemplo |
|---|---|
| slug | electronica-microsoldadura |
| title | Reparación de Celulares: Electrónica y Microsoldadura |
| description | Aprendé diagnóstico, microsoldadura y reparación de placas desde cero. |
| price_usd | 90 |
| published | true |

Recargá la página — ya debería aparecer la tarjeta del curso.

## Paso 4 — Subir esto a GitHub (para tener respaldo)

```bash
git init
git add .
git commit -m "Fase 1: catálogo y login"
```

Creá un repositorio nuevo en https://github.com/new y seguí las
instrucciones que te da GitHub para subir el código (`git remote add origin ...`).

## Paso 5 — Publicarlo en internet (Vercel, gratis)

1. Andá a https://vercel.com y entrá con tu cuenta de GitHub.
2. "Add New Project" → elegí el repositorio que acabás de subir.
3. En "Environment Variables" cargá las mismas dos variables de tu `.env.local`.
4. Deploy. En un par de minutos tenés una URL pública tipo `tu-proyecto.vercel.app`.

## Paso 6 — Comprar y conectar tu dominio

1. Comprá el dominio donde prefieras (NIC Argentina para `.com.ar`, o
   Namecheap/GoDaddy para `.com`). Rondan entre USD 12-15/año.
2. En Vercel: **Project Settings → Domains** → agregá tu dominio.
3. Vercel te va a mostrar qué registros DNS configurar. Los cargás en el
   panel de donde compraste el dominio. Puede tardar unas horas en
   propagarse.

## Qué sigue (próximas fases)

- **Fase 2:** checkout con Mercado Pago (el botón "Comprar curso" ya está
  listo para conectarse ahí).
- **Fase 3:** área de alumno con descarga de PDFs/videos protegidos según
  lo que compró.
- **Fase 4:** tracking de progreso por clase.

Si en algún paso te tira un error, copiá el mensaje completo y lo vemos juntos.
