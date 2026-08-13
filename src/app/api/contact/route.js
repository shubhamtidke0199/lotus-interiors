const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? body["contact-number"] ?? "").trim();
  const location = String(
    body.location ?? body["project-location"] ?? "",
  ).trim();
  const message = String(
    body.message ?? body["requirement-brief"] ?? body.brief ?? "",
  ).trim();
  const source = String(body.source ?? "contact").trim();

  if (!email && !phone) {
    return Response.json(
      { error: "Please provide an email or phone number." },
      { status: 400 },
    );
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!message && source !== "consultation") {
    return Response.json(
      { error: "Please share a short project brief." },
      { status: 400 },
    );
  }

  // Hook up Resend / Formspree / CRM here in production.
  console.info("[lotus-contact]", {
    source,
    name,
    email,
    phone,
    location,
    message,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    message: "Thank you. Our studio will reach out shortly.",
  });
}
