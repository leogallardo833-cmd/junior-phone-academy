import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!course) return notFound();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, position")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="pin-label text-copperLight">Curso</span>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">
        {course.title}
      </h1>
      <p className="mt-4 leading-relaxed text-muted">{course.description}</p>

      <div className="mt-8 rounded-md border border-panelBorder bg-panel p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl text-trace">
            USD {course.price_usd}
          </span>
          {/*
            Fase 2: este botón va a llamar a /api/mercadopago/create-preference
            y redirigir al checkout de Mercado Pago.
          */}
          <button
            disabled
            className="rounded bg-copper px-5 py-2 font-semibold text-board opacity-60"
            title="Se habilita en la Fase 2 (checkout con Mercado Pago)"
          >
            Comprar curso
          </button>
        </div>
      </div>

      {lessons && lessons.length > 0 && (
        <div className="mt-10">
          <h2 className="pin-label mb-4 text-muted">Contenido del curso</h2>
          <ol className="flex flex-col gap-2">
            {lessons.map((lesson, i) => (
              <li
                key={lesson.id}
                className="flex items-center gap-3 rounded border border-panelBorder bg-panel px-4 py-3"
              >
                <span className="font-mono text-sm text-copperLight">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink">{lesson.title}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
