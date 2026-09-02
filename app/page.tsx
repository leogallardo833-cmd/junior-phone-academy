import { createClient } from "@/lib/supabase/server";
import CourseCard from "@/components/CourseCard";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("slug, title, description, price_usd")
    .eq("published", true)
    .order("created_at", { ascending: true });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-panelBorder bg-grid bg-grid">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <span className="pin-label text-copperLight">
            Electrónica · Microsoldadura · Reparación
          </span>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Aprendé a diagnosticar y reparar placas como en el banco de
            trabajo real.
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            Clases grabadas, material descargable y casos reales de
            reparación, dictadas por un técnico certificado por la UTN.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="pin-label mb-6 text-muted">Cursos disponibles</h2>
        {!courses || courses.length === 0 ? (
          <p className="text-muted">
            Todavía no hay cursos publicados. Cargalos desde la tabla{" "}
            <code className="text-copperLight">courses</code> en Supabase.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
