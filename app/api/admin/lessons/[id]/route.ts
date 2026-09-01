import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { UUID_REGEX } from "@/lib/admin/validate";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  if (!UUID_REGEX.test(params.id)) return NextResponse.json({ error: "ID invalido" }, { status: 400 });

  const { error } = await supabase!.from("lessons").delete().eq("id", params.id);
  if (error) {
    console.error("Error borrando clase:", error);
    return NextResponse.json({ error: "No se pudo borrar la clase" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}