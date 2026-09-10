import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  verifySessionToken,
} from "@/lib/admin/session";

export {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminPasswordConfigured,
  passwordsMatch,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/admin/session";

export async function getAdminSessionToken() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value ?? "";
}

export async function isAdminAuthenticated() {
  return verifySessionToken(await getAdminSessionToken());
}

export async function requireAdminApi() {
  if (await isAdminAuthenticated()) return null;
  return Response.json({ error: "Please sign in to continue." }, { status: 401 });
}
