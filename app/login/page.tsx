"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <span className="pin-label text-copperLight">Ingresar</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">
        Entrá a tu cuenta
      </h1>

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
        <div>
          <label className="pin-label text-muted">Contraseña</label>
          <input
            type="password"
            required
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
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        ¿No tenés cuenta?{" "}
        <Link href="/registro" className="text-copperLight hover:underline">
          Creá una acá
        </Link>
      </p>
    </div>
  );
}
