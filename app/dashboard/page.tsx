import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: purchases } = await supabase
    .from("purchases")
    .select("course_id, courses (slug, title, description)")
    .eq("user_id", user.id)
    .eq("status", "approved");

  const items: {
    course: { slug: string; title: string; description: string | null };
    total: number;
    completed: number;
  }[] = [];

  for (const purchase of purchases ?? []) {
    const course = Array.isArray(purchase.courses)
      ? purchase.courses[0]
      : purchase.courses;
    if (!course) continue;

    const { data: lessons } = await supabase
      .from("lessons")
      .select("id")
      .eq("course_id", purchase.course_id);

    const lessonIds = (lessons ?? []).map((l) => l.id);
    let completedCount = 0;

    if (lessonIds.length > 0) {
      const { count } = await supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true)
        .in("lesson_id", lessonIds);
      completedCount = count ?? 0;
    }

    items.push({ course, total: lessonIds.length, completed: completedCount });
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="pin-label text-copperLight">Mi cuenta</span>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">
        Mis cursos
      </h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-md border border-panelBorder bg-panel p-8 text-center">
          <p className="text-muted">Todavía no compraste ningún curso.</p>
          <Link href="/" className="mt-4 inline-block text-copperLight hover:underline">
            Ver catálogo →
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {items.map(({ course, total, completed }) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <Link
                key={course.slug}
                href={`/dashboard/${course.slug}`}
                className="block rounded-md border border-panelBorder bg-panel p-6 transition hover:border-copper"
              >
                <h3 className="font-mono text-lg text-ink">{course.title}</h3>
                <p className="mt-1 text-sm text-muted">{course.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted">
                    <span>
                      {completed} de {total} clases completadas
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-board">
                    <div
                      className="h-2 rounded bg-trace"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}