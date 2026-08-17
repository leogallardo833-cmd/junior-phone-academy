"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyButton({
  courseId,
  isLoggedIn,
}: {
  courseId: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/mercadopago/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Hubo un problema al iniciar el pago. Intentá de nuevo.");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
     className="w-full rounded bg-copper px-5 py-3 font-semibold text-board transition hover:bg-copperLight disabled:opacity-60"
    >
      {loading ? "Redirigiendo..." : "Comprar curso"}
    </button>
  );
}