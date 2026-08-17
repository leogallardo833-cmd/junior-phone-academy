"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ActualizarContrasenaPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError("No se pudo actualizar la contraseña. Intenta pedir el link de nuevo.");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <span className="pin-label text-trace">Listo</span>
        <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Contraseña actualizada</h1>
        <p className="mt-3 text-muted">Te estamos redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <span className="pin-label text-copperLight">Nueva contraseña</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">Elegi tu nueva contraseña</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="pin-label text-muted">Contraseña nueva</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded bg-copper py-2 font-semibold text-board transition hover:bg-copperLight disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar nueva contraseña"}
        </button>
      </form>
    </div>
  );
}