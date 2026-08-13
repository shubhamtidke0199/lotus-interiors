const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? body["contact-number"] ?? "").trim();
  const message = String(
    body.message ?? body["requirement-brief"] ?? body.brief ?? "",
  ).trim();
  const source = String(body.source ?? "contact").trim();

  if (!email) {
    return Response.json({ error: "Please enter your email." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!phone) {
    return Response.json({ error: "Please enter your phone number." }, { status: 400 });
  }

  if (!message && source !== "consultation") {
    return Response.json(
      { error: "Please share your requirement or query." },
      { status: 400 },
    );
  }

  console.info("[lotus-contact]", {
    source,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    message: "Thank you. Our studio will reach out shortly.",
  });
}
