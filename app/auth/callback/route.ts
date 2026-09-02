import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ALLOWED_NEXT = ["/dashboard", "/", "/admin"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/dashboard";

  const next =
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//") &&
    ALLOWED_NEXT.some((p) => rawNext === p || rawNext.startsWith(p + "/"))
      ? rawNext
      : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}