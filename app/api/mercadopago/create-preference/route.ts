import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/lib/supabase/server";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { courseId } = await request.json();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, price_ars")
    .eq("id", courseId)
    .single();

  if (!course || !course.price_ars) {
    return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const preference = new Preference(mpClient);

  const result = await preference.create({
    body: {
      items: [
        {
          id: course.id,
          title: course.title,
          quantity: 1,
          unit_price: Number(course.price_ars),
          currency_id: "ARS",
        },
      ],
      external_reference: `${user.id}:${course.id}`,
      back_urls: {
        success: `${siteUrl}/dashboard`,
        failure: `${siteUrl}/cursos/${courseId}`,
        pending: `${siteUrl}/cursos/${courseId}`,
      },
      auto_return: "approved",
      notification_url: `${siteUrl}/api/mercadopago/webhook`,
    },
  });

  return NextResponse.json({ init_point: result.init_point });
}