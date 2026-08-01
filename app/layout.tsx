import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  title: "Banco de Trabajo | Cursos de Electrónica y Microsoldadura",
  description:
    "Aprendé electrónica aplicada y microsoldadura de celulares con clases grabadas y certificación.",
};

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
            <Link href="/" className="flex items-center gap-2">
              <span className="font-mono text-lg font-semibold text-trace">
                &lt;/&gt;
              </span>
              <span className="font-mono text-sm font-semibold tracking-tight text-ink">
                BANCO DE TRABAJO
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
        <footer className="border-t border-panelBorder py-8 text-center text-xs text-muted">
          <span className="pin-label">Banco de Trabajo © {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}
