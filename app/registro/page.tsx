"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const supabase = createClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <span className="pin-label text-trace">Cuenta creada</span>
        <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">
          Revisá tu email
        </h1>
        <p className="mt-3 text-muted">
          Te enviamos un link de confirmación. Confirmá tu cuenta y después
          ingresá desde la página de login.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <span className="pin-label text-copperLight">Crear cuenta</span>
      <h1 className="mt-2 font-mono text-2xl font-semibold text-ink">
        Sumate a la plataforma
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="pin-label text-muted">Nombre</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
            />
          </div>
          <div>
            <label className="pin-label text-muted">Apellido</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
            />
          </div>
        </div>
        <div>
          <label className="pin-label text-muted">Celular</label>
          <input
            type="tel"
            required
            placeholder="Ej: 351 1234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded border border-panelBorder bg-board px-3 py-2 text-ink outline-none focus:border-copper"
          />
        </div>
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
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-copperLight hover:underline">
          Ingresá acá
        </Link>
      </p>
    </div>
  );
}