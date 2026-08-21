"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Course = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string | null;
  long_description?: string | null;
  target_audience?: string | null;
  requirements?: string | null;
  learning_outcomes?: string[] | null;
  price_usd?: number | null;
  price_ars?: number | null;
  published?: boolean;
};

export default function CourseForm({ course }: { course?: Course }) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: course?.slug ?? "",
    title: course?.title ?? "",
    description: course?.description ?? "",
    long_description: course?.long_description ?? "",
    target_audience: course?.target_audience ?? "",
    requirements: course?.requirements ?? "",
    learning_outcomes: (course?.learning_outcomes ?? []).join("\n"),
    price_usd: course?.price_usd ?? 0,
    price_ars: course?.price_ars ?? 0,
    published: course?.published ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      learning_outcomes: form.learning_outcomes
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = course?.id ? `/api/admin/courses/${course.id}` : "/api/admin/courses";
    const method = course?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Hubo un problema al guardar. Revisa los datos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="pin-label text-muted">Slug (url, minuscula, sin espacios)</label>
        <input
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          required
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Titulo</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Descripcion corta</label>
        <input
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Descripcion larga (sobre el curso)</label>
        <textarea
          value={form.long_description}
          onChange={(e) => update("long_description", e.target.value)}
          rows={4}
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Para quien es este curso</label>
        <textarea
          value={form.target_audience}
          onChange={(e) => update("target_audience", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Requisitos</label>
        <textarea
          value={form.requirements}
          onChange={(e) => update("requirements", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="pin-label text-muted">Que vas a aprender (una linea por punto)</label>
        <textarea
          value={form.learning_outcomes}
          onChange={(e) => update("learning_outcomes", e.target.value)}
          rows={5}
          className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="pin-label text-muted">Precio USD</label>
          <input
            type="number"
            value={form.price_usd}
            onChange={(e) => update("price_usd", Number(e.target.value))}
            className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="pin-label text-muted">Precio ARS</label>
          <input
            type="number"
            value={form.price_ars}
            onChange={(e) => update("price_ars", Number(e.target.value))}
            className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
        />
        Publicado (visible en el catalogo)
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded bg-copper py-2 font-semibold text-board transition hover:bg-copperLight disabled:opacity-60"
      >
        {loading ? "Guardando..." : "Guardar curso"}
      </button>
    </form>
  );
}