import Link from "next/link";

type Course = {
  slug: string;
  title: string;
  description: string | null;
  price_usd: number;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="group relative block overflow-hidden rounded-md border border-panelBorder bg-panel p-6 transition hover:border-copper"
    >
      {/* "pines" del chip, arriba y abajo */}
      <div className="absolute -top-1 left-6 h-1.5 w-6 bg-panelBorder group-hover:bg-copper" />
      <div className="absolute -bottom-1 right-6 h-1.5 w-6 bg-panelBorder group-hover:bg-copper" />

      <span className="pin-label text-muted">Curso</span>
      <h3 className="mt-2 font-mono text-lg font-semibold text-ink">
        {course.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
        {course.description}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-trace">USD {course.price_usd}</span>
        <span className="text-sm text-copperLight group-hover:underline">
          Ver detalle →
        </span>
      </div>
    </Link>
  );
}
