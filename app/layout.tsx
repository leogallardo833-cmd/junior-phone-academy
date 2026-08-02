import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CookieConsent from "@/components/CookieConsent";

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
  title: "Junior Phone Academy | Electrónica y Microsoldadura",
  description:
    "Aprendé electrónica aplicada y microsoldadura de celulares con clases grabadas y certificación.",
};

function ResistorIcon() {
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9H5L7 3L11 15L15 3L19 15L21 9H25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${mono.variable} ${sans.variable} font-sans`}>
        <header className="border-b border-panelBorder bg-panel/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-trace">
              <ResistorIcon />
              <span className="font-mono text-sm font-semibold tracking-tight text-ink">
                JUNIOR PHONE ACADEMY
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted">
              <Link href="/" className="hover:text-ink">
                Cursos
              </Link>
              <Link href="/login" className="hover:text-ink">
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="rounded border border-copper px-3 py-1.5 text-copperLight hover:bg-copper hover:text-board"
              >
                Crear cuenta
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
<CookieConsent />
        <footer className="border-t border-panelBorder py-8 text-center text-xs text-muted">
          <span className="pin-label">Junior Phone Academy © {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}