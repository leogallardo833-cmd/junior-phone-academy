import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="pin-label text-copperLight">Panel</span>
          <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">Cursos</h1>
        </div>
        <Link
          href="/admin/cursos/nuevo"
          className="rounded bg-copper px-4 py-2 font-semibold text-board hover:bg-copperLight"
        >
          + Nuevo curso
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {(courses ?? []).map((course) => (
          <Link
            key={course.id}
            href={`/admin/cursos/${course.id}`}
            className="flex items-center justify-between rounded border border-panelBorder bg-panel px-5 py-4 hover:border-copper"
          >
            <div>
              <span className="font-mono text-ink">{course.title}</span>
              <span className="ml-3 text-xs text-muted">/{course.slug}</span>
            </div>
            <span className={`text-xs ${course.published ? "text-trace" : "text-muted"}`}>
              {course.published ? "Publicado" : "Borrador"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}