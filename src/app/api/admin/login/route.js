import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminPasswordConfigured,
  passwordsMatch,
  sessionCookieOptions,
} from "@/lib/admin/auth";

export async function POST(request) {
  if (!isAdminPasswordConfigured()) {
    return Response.json(
      {
        error:
          "Set ADMIN_PASSWORD in .env.local before signing in.",
      },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const password = String(body.password ?? "");
  if (!passwordsMatch(password, process.env.ADMIN_PASSWORD)) {
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
  return response;
}
