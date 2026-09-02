import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    isAdmin = !!profile?.is_admin;
  }

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
                  {isAdmin && (
                    <Link href="/admin" className="hover:text-ink">Panel</Link>
                  )}
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
        <WhatsAppButton />
                <footer className="border-t border-panelBorder py-8 text-center text-xs text-muted">
          <div className="mb-4 flex items-center justify-center gap-4">
            <a href="https://instagram.com/juniorphone.ok" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-copperLight" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://tiktok.com/@juniorphone.ok" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-copperLight" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
              </svg>
            </a>
          </div>
          <span className="pin-label">Junior Phone Academy (c) {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}