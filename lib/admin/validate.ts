const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const URL_REGEX = /^https?:\/\/.+/i;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function sanitizeCourse(body: any): { data?: any; error?: string } {
  if (typeof body !== "object" || body === null) return { error: "Payload invalido" };

  const slug = String(body.slug ?? "").trim();
  const title = String(body.title ?? "").trim();

  if (!SLUG_REGEX.test(slug) || slug.length > 80) {
    return { error: "Slug invalido: usa minusculas, numeros y guiones" };
  }
  if (title.length < 3 || title.length > 150) {
    return { error: "Titulo invalido" };
  }

  const price_usd = Number(body.price_usd);
  const price_ars = Number(body.price_ars);
  if (!Number.isFinite(price_usd) || price_usd < 0) return { error: "Precio USD invalido" };
  if (!Number.isFinite(price_ars) || price_ars < 0) return { error: "Precio ARS invalido" };

  let learning_outcomes: string[] = [];
  if (Array.isArray(body.learning_outcomes)) {
    learning_outcomes = body.learning_outcomes
      .filter((x: unknown) => typeof x === "string")
      .map((x: string) => x.trim())
      .filter(Boolean)
      .slice(0, 30);
  }

  return {
    data: {
      slug,
      title,
      description: String(body.description ?? "").slice(0, 500),
      long_description: String(body.long_description ?? "").slice(0, 4000),
      target_audience: String(body.target_audience ?? "").slice(0, 1000),
      requirements: String(body.requirements ?? "").slice(0, 1000),
      learning_outcomes,
      price_usd,
      price_ars,
      published: Boolean(body.published),
    },
  };
}

export function sanitizeLesson(body: any): { data?: any; error?: string } {
  if (typeof body !== "object" || body === null) return { error: "Payload invalido" };

  const course_id = String(body.course_id ?? "");
  if (!UUID_REGEX.test(course_id)) return { error: "course_id invalido" };

  const title = String(body.title ?? "").trim();
  if (title.length < 2 || title.length > 150) return { error: "Titulo invalido" };

  const position = Number(body.position);
  if (!Number.isFinite(position) || position < 0) return { error: "Posicion invalida" };

  const video_url = body.video_url ? String(body.video_url).trim() : null;
  const pdf_url = body.pdf_url ? String(body.pdf_url).trim() : null;

  if (video_url && !URL_REGEX.test(video_url)) return { error: "Link de video invalido" };
  if (pdf_url && !URL_REGEX.test(pdf_url)) return { error: "Link de PDF invalido" };

  return { data: { course_id, title, position, video_url, pdf_url } };
}

export { UUID_REGEX };
