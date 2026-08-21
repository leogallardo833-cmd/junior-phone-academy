"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Lesson = {
  id: string;
  title: string;
  position: number;
  video_url: string | null;
  pdf_url: string | null;
};

export default function LessonManager({
  courseId,
  initialLessons,
}: {
  courseId: string;
  initialLessons: Lesson[];
}) {
  const router = useRouter();
  const [lessons, setLessons] = useState(initialLessons);
  const [newLesson, setNewLesson] = useState({ title: "", video_url: "", pdf_url: "" });
  const [loading, setLoading] = useState(false);

  async function addLesson(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        title: newLesson.title,
        video_url: newLesson.video_url || null,
        pdf_url: newLesson.pdf_url || null,
        position: lessons.length + 1,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setNewLesson({ title: "", video_url: "", pdf_url: "" });
      router.refresh();
      const data = await res.json();
      setLessons((prev) => [...prev, data.lesson]);
    }
  }

  async function deleteLesson(id: string) {
    if (!confirm("Seguro que queres borrar esta clase?")) return;

    const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });

    if (res.ok) {
      setLessons((prev) => prev.filter((l) => l.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          className="flex items-center justify-between rounded border border-panelBorder bg-panel px-4 py-3"
        >
          <div>
            <span className="font-mono text-xs text-copperLight">{String(i + 1).padStart(2, "0")}</span>
            <span className="ml-2 text-ink">{lesson.title}</span>
          </div>
          <button
            onClick={() => deleteLesson(lesson.id)}
            className="text-xs text-red-400 hover:underline"
          >
            Borrar
          </button>
        </div>
      ))}

      <form onSubmit={addLesson} className="mt-4 flex flex-col gap-3 rounded border border-panelBorder bg-panel p-4">
        <span className="pin-label text-muted">Agregar clase nueva</span>
        <input
          placeholder="Titulo de la clase"
          value={newLesson.title}
          onChange={(e) => setNewLesson((p) => ({ ...p, title: e.target.value }))}
          required
          className="rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
        <input
          placeholder="Link del video (YouTube no listado, etc.)"
          value={newLesson.video_url}
          onChange={(e) => setNewLesson((p) => ({ ...p, video_url: e.target.value }))}
          className="rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
        <input
          placeholder="Link del PDF"
          value={newLesson.pdf_url}
          onChange={(e) => setNewLesson((p) => ({ ...p, pdf_url: e.target.value }))}
          className="rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-copper py-2 font-semibold text-board hover:bg-copperLight disabled:opacity-60"
        >
          {loading ? "Agregando..." : "+ Agregar clase"}
        </button>
      </form>
    </div>
  );
}