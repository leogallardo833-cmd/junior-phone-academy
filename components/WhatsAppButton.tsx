export default function WhatsAppButton() {
  const phone = "5493516166120";
  const message = "Hola! Tengo una consulta sobre los cursos de Junior Phone Academy.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105" aria-label="Contactar por WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.95 7.95 0 0 0 5.6-13.58zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 0 1 10.24-8.2 6.55 6.55 0 0 1 1.94 4.67 6.62 6.62 0 0 1-6.58 6.63zm3.62-4.95c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.51.64-.63.77-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.09-.1.2-.23.3-.35.1-.11.13-.19.2-.32.06-.13.03-.24-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.39-.33-.33-.45-.34h-.38a.73.73 0 0 0-.53.25 2.2 2.2 0 0 0-.7 1.64c0 .96.7 1.9.8 2.03.1.13 1.4 2.14 3.4 3 .47.2.85.33 1.14.42.48.15.91.13 1.25.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.12-.94-.05-.09-.18-.14-.38-.24z" />
      </svg>
    </a>
  );
}