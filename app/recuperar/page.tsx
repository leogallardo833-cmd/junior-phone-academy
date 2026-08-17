"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-contrasena`,
    });

    setLoading(false);

    if (error) {
      setError("Hubo un problema. Verifica el email e intenta de nuevo.");
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <span className="pin-label text-trace">Listo</span>
        <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Revisa tu email</h1>
        <p className="mt-3 text-muted">
          Si ese email esta registrado, te enviamos un link para restablecer tu contraseña.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <span className="pin-label text-copperLight">Recuperar acceso</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Restablecer contraseña</h1>
      <p className="mt-2 text-sm text-muted">
        Te enviamos un link a tu email para que puedas crear una contraseña nueva.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="pin-label text-muted">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded bg-copper py-2 font-semibold text-board transition hover:bg-copperLight disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar link de recuperacion"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        <Link href="/login" className="text-copperLight hover:underline">
          Volver a Ingresar
        </Link>
      </p>
    </div>
  );
}