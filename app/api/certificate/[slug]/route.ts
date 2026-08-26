import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: course } = await supabase.from("courses").select("*").eq("slug", params.slug).single();
  if (!course) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!purchase) return NextResponse.json({ error: "No compraste este curso" }, { status: 403 });

  const { data: lessons } = await supabase.from("lessons").select("id").eq("course_id", course.id);
  const lessonIds = (lessons ?? []).map((l) => l.id);

  let completedCount = 0;
  if (lessonIds.length > 0) {
    const { count } = await supabase
      .from("lesson_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("completed", true)
      .in("lesson_id", lessonIds);
    completedCount = count ?? 0;
  }

  if (lessonIds.length === 0 || completedCount < lessonIds.length) {
    return NextResponse.json({ error: "Todavia no completaste el curso" }, { status: 403 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() || user.email || "Alumno";

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const logoPath = path.join(process.cwd(), "public", "logo-certificado.png");
  const logoBytes = fs.readFileSync(logoPath);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.22);

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.06, 0.1, 0.08) });
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: rgb(0.79, 0.48, 0.29),
    borderWidth: 2,
  });

  page.drawImage(logoImage, {
    x: width / 2 - logoDims.width / 2,
    y: height - 170,
    width: logoDims.width,
    height: logoDims.height,
  });

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = "CERTIFICADO DE FINALIZACION";
  page.drawText(title, {
    x: width / 2 - fontBold.widthOfTextAtSize(title, 24) / 2,
    y: height - 220,
    size: 24,
    font: fontBold,
    color: rgb(0.5, 0.91, 0.69),
  });

  const line1 = "Se otorga el presente certificado a";
  page.drawText(line1, {
    x: width / 2 - font.widthOfTextAtSize(line1, 14) / 2,
    y: height - 270,
    size: 14,
    font,
    color: rgb(0.93, 0.92, 0.88),
  });

  page.drawText(fullName, {
    x: width / 2 - fontBold.widthOfTextAtSize(fullName, 28) / 2,
    y: height - 320,
    size: 28,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const courseLine = `por haber completado el curso "${course.title}"`;
  page.drawText(courseLine, {
    x: width / 2 - font.widthOfTextAtSize(courseLine, 14) / 2,
    y: height - 360,
    size: 14,
    font,
    color: rgb(0.93, 0.92, 0.88),
  });

  const dateStr = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
  page.drawText(dateStr, {
    x: width / 2 - font.widthOfTextAtSize(dateStr, 12) / 2,
    y: 60,
    size: 12,
    font,
    color: rgb(0.56, 0.64, 0.6),
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="certificado-${course.slug}.pdf"`,
    },
  });
}