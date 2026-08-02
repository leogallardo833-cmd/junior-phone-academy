"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-panelBorder bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          Usamos cookies para que la plataforma funcione correctamente (por
          ejemplo, para mantener tu sesión iniciada).
        </p>
        <button
          onClick={handleAccept}
          className="whitespace-nowrap rounded bg-copper px-4 py-2 text-sm font-semibold text-board transition hover:bg-copperLight"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}