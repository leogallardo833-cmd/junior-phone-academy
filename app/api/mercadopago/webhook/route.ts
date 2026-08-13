import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentId = body?.data?.id;

    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    const payment = new Payment(mpClient);
    const paymentInfo = await payment.get({ id: paymentId });

    const externalReference = paymentInfo.external_reference;
    if (!externalReference || !externalReference.includes(":")) {
      return NextResponse.json({ received: true });
    }

    const [userId, courseId] = externalReference.split(":");
    const status = paymentInfo.status === "approved" ? "approved" : paymentInfo.status;

    const supabase = createAdminClient();

    await supabase.from("purchases").upsert(
      {
        user_id: userId,
        course_id: courseId,
        status,
        mp_payment_id: String(paymentId),
      },
      { onConflict: "user_id,course_id" }
    );

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error en webhook de Mercado Pago:", err);
    return NextResponse.json({ received: true });
  }
}