"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Lesson = {
  id: string;
  title: string;
  position: number;
  video_url: string | null;
  pdf_url: string | null;
};

export default function LessonList({
  lessons,
  completedIds,
  userId,
}: {
  lessons: Lesson[];
  completedIds: string[];
  userId: string;
}) {
  const supabase = createClient();
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(completedIds)
  );
  const [saving, setSaving] = useState<string | null>(null);

  async function toggle(lessonId: string) {
    setSaving(lessonId);
    const isCompleted = completed.has(lessonId);

    await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: !isCompleted,
        completed_at: !isCompleted ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,lesson_id" }
    );

    setCompleted((prev) => {
      const next = new Set(prev);
      if (isCompleted) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
    setSaving(null);
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      {lessons.length === 0 && (
        <p className="text-muted">Todavia no hay clases cargadas para este curso.</p>
      )}
      {lessons.map((lesson, i) => {
        const isDone = completed.has(lesson.id);
        return (
          <div key={lesson.id} className="flex items-center gap-4 rounded border border-panelBorder bg-panel px-4 py-4">
            <button
              onClick={() => toggle(lesson.id)}
              disabled={saving === lesson.id}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs ${isDone ? "border-trace bg-trace text-board" : "border-panelBorder text-transparent"}`}
              title={isDone ? "Marcar como no vista" : "Marcar como completada"}
            >
              OK
            </button>
            <div className="flex-1">
              <span className="font-mono text-xs text-copperLight">{String(i + 1).padStart(2, "0")}</span>
              <p className={`text-ink ${isDone ? "line-through text-muted" : ""}`}>{lesson.title}</p>
              <div className="mt-1 flex gap-3 text-xs">
                {lesson.video_url && (<a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="text-copperLight hover:underline">Ver video</a>)}
                {lesson.pdf_url && (<a href={lesson.pdf_url} target="_blank" rel="noopener noreferrer" className="text-copperLight hover:underline">Descargar PDF</a>)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}