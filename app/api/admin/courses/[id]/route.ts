import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { sanitizeCourse, UUID_REGEX } from "@/lib/admin/validate";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  if (!UUID_REGEX.test(params.id)) return NextResponse.json({ error: "ID invalido" }, { status: 400 });

  const body = await request.json();
  const { data, error: validationError } = sanitizeCourse(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { error } = await supabase!.from("courses").update(data).eq("id", params.id);
  if (error) {
    console.error("Error editando curso:", error);
    return NextResponse.json({ error: "No se pudo editar el curso" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}