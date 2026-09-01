import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { sanitizeLesson } from "@/lib/admin/validate";

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const { data, error: validationError } = sanitizeLesson(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { data: lesson, error } = await supabase!.from("lessons").insert(data).select().single();
  if (error) {
    console.error("Error creando clase:", error);
    return NextResponse.json({ error: "No se pudo crear la clase" }, { status: 400 });
  }

  return NextResponse.json({ lesson });
}