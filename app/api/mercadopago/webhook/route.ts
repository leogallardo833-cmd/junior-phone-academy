import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function verifySignature(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;

  const signatureHeader = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  if (!signatureHeader || !requestId) return false;

  const parts: Record<string, string> = {};
  signatureHeader.split(",").forEach((p) => {
    const [k, v] = p.trim().split("=");
    if (k && v) parts[k.trim()] = v.trim();
  });

  const ts = parts["ts"];
  const v1 = parts["v1"];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(v1, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    let body: any = {};
    try {
      body = JSON.parse(bodyText);
    } catch {}

    const url = new URL(request.url);
    const dataId = body?.data?.id || url.searchParams.get("data.id");

    if (!dataId) return NextResponse.json({ received: true });

    if (!verifySignature(request, String(dataId))) {
      console.warn("Webhook de Mercado Pago con firma invalida, descartado.");
      return NextResponse.json({ error: "Firma invalida" }, { status: 401 });
    }

    const payment = new Payment(mpClient);
    const paymentInfo = await payment.get({ id: String(dataId) });

    if (paymentInfo.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const externalReference = paymentInfo.external_reference;
    if (!externalReference || !externalReference.includes(":")) {
      console.warn("Webhook sin external_reference valido");
      return NextResponse.json({ received: true });
    }

    const [userId, courseId] = externalReference.split(":");
    if (!UUID_REGEX.test(userId) || !UUID_REGEX.test(courseId)) {
      console.warn("external_reference con formato invalido");
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    const { data: course } = await supabase.from("courses").select("id, price_ars").eq("id", courseId).single();
    if (!course) {
      console.warn("Webhook referencia un curso inexistente:", courseId);
      return NextResponse.json({ received: true });
    }

    const paidAmount = Number(paymentInfo.transaction_amount);
    const expectedAmount = Number(course.price_ars);
    const currency = paymentInfo.currency_id;

    if (currency !== "ARS" || Math.abs(paidAmount - expectedAmount) > 1) {
      console.error(
        `Monto/moneda no coincide. Pagado: ${paidAmount} ${currency}, esperado: ${expectedAmount} ARS. Payment ID: ${dataId}`
      );
      return NextResponse.json({ received: true });
    }

    const { data: existingByPayment } = await supabase
      .from("purchases")
      .select("user_id, course_id")
      .eq("mp_payment_id", String(dataId))
      .maybeSingle();

    if (existingByPayment && (existingByPayment.user_id !== userId || existingByPayment.course_id !== courseId)) {
      console.error("Intento de reutilizar mp_payment_id para otra compra:", dataId);
      return NextResponse.json({ received: true });
    }

    const { error } = await supabase.from("purchases").upsert(
      { user_id: userId, course_id: courseId, status: "approved", mp_payment_id: String(dataId) },
      { onConflict: "user_id,course_id" }
    );

    if (error) console.error("Error guardando compra desde webhook:", error);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error en webhook de Mercado Pago:", err);
    return NextResponse.json({ received: true });
  }
}