import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import LessonList from "@/components/LessonList";

export default async function DashboardCoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!course) return notFound();

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!purchase) redirect(`/cursos/${params.slug}`);

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const completedIds = (progress ?? [])
    .filter((p) => p.completed)
    .map((p) => p.lesson_id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="pin-label text-copperLight">Curso</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">
        {course.title}
      </h1>

      <LessonList
        lessons={lessons ?? []}
        completedIds={completedIds}
        userId={user.id}
      />
    </div>
  );
}