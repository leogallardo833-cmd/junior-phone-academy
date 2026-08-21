import CourseForm from "@/components/admin/CourseForm";

export default function NuevoCursoPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="pin-label text-copperLight">Panel</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Nuevo curso</h1>
      <div className="mt-8">
        <CourseForm />
      </div>
    </div>
  );
}