import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { sanitizeCourse } from "@/lib/admin/validate";

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const { data, error: validationError } = sanitizeCourse(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { error } = await supabase!.from("courses").insert(data);
  if (error) {
    console.error("Error creando curso:", error);
    return NextResponse.json({ error: "No se pudo crear el curso" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}