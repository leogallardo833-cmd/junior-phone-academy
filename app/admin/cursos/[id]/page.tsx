import { createClient } from "@/lib/supabase/server";
import CourseForm from "@/components/admin/CourseForm";
import LessonManager from "@/components/admin/LessonManager";

export default async function EditarCursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", id)
    .order("position", { ascending: true });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="pin-label text-copperLight">Panel</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Editar curso</h1>
      <div className="mt-8">
        <CourseForm course={course ?? undefined} />
      </div>

      <div className="mt-12">
        <h2 className="pin-label mb-4 text-muted">Clases del curso</h2>
        <LessonManager courseId={id} initialLessons={lessons ?? []} />
      </div>
    </div>
  );
}