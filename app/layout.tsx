import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import CookieConsent from "@/components/CookieConsent";
import { createClient } from "@/lib/supabase/server";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Junior Phone Academy | Electronica y Microsoldadura",
  description: "Aprende electronica aplicada y microsoldadura de celulares con clases grabadas y certificacion.",
};

function ResistorIcon() {
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9H5L7 3L11 15L15 3L19 15L21 9H25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="es">
      <body className={`${mono.variable} ${sans.variable} font-sans`}>
        <header className="border-b border-panelBorder bg-panel/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-trace">
              <ResistorIcon />
              <span className="font-mono text-sm font-semibold tracking-tight text-ink">JUNIOR PHONE ACADEMY</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Cursos</Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="hover:text-ink">Mis cursos</Link>
                  <SignOutButton />
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Foto de perfil"
                      className="h-8 w-8 rounded-full border border-panelBorder"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-panelBorder bg-board text-xs text-copperLight">
                      {(user.user_metadata?.first_name?.[0] ?? user.email?.[0] ?? "U").toUpperCase()}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-ink">Ingresar</Link>
                  <Link href="/registro" className="rounded border border-copper px-3 py-1.5 text-copperLight hover:bg-copper hover:text-board">Crear cuenta</Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <CookieConsent />
        <footer className="border-t border-panelBorder py-8 text-center text-xs text-muted">
          <span className="pin-label">Junior Phone Academy (c) {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}