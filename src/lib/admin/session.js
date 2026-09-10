import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "lotus_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordsMatch(provided, expected) {
  const left = createHash("sha256").update(String(provided ?? "")).digest();
  const right = createHash("sha256").update(String(expected ?? "")).digest();
  return timingSafeEqual(left, right);
}

export function createSessionToken() {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error("Admin session secret is not configured.");
  }

  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return false;
  const secret = sessionSecret();
  if (!secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
