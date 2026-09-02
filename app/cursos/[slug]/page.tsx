import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BuyButton from "@/components/BuyButton";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase.from("courses").select("*").eq("slug", slug).eq("published", true).single();

  if (!course) return notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, position")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="pin-label text-copperLight">Curso</span>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-ink sm:text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{course.description}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          {course.long_description && (
            <section>
              <h2 className="pin-label mb-3 text-muted">Sobre el curso</h2>
              <p className="leading-relaxed text-ink">{course.long_description}</p>
            </section>
          )}

          {course.learning_outcomes && course.learning_outcomes.length > 0 && (
            <section>
              <h2 className="pin-label mb-3 text-muted">Que vas a aprender</h2>
              <ul className="flex flex-col gap-3">
                {course.learning_outcomes.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-trace text-xs text-trace">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {course.target_audience && (
            <section>
              <h2 className="pin-label mb-3 text-muted">Para quien es este curso</h2>
              <p className="leading-relaxed text-ink">{course.target_audience}</p>
            </section>
          )}

          {course.requirements && (
            <section>
              <h2 className="pin-label mb-3 text-muted">Requisitos</h2>
              <p className="leading-relaxed text-ink">{course.requirements}</p>
            </section>
          )}

          {lessons && lessons.length > 0 && (
            <section>
              <h2 className="pin-label mb-3 text-muted">Contenido del curso</h2>
              <ol className="flex flex-col gap-2">
                {lessons.map((lesson, i) => (
                  <li key={lesson.id} className="flex items-center gap-3 rounded border border-panelBorder bg-panel px-4 py-3">
                    <span className="font-mono text-sm text-copperLight">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{lesson.title}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-md border border-panelBorder bg-panel p-6">
            <span className="font-mono text-3xl text-trace">USD {course.price_usd}</span>
            {course.price_ars && (
              <p className="mt-1 text-sm text-muted">o ARS {Number(course.price_ars).toLocaleString("es-AR")}</p>
            )}
            <div className="mt-5">
              <BuyButton courseId={course.id} isLoggedIn={!!user} />
            </div>
            {lessons && <p className="mt-4 text-xs text-muted">{lessons.length} clases · Acceso de por vida</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}