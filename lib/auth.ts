import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL غير معرّف في Environment Variables");
  }

  if (!user || user.email !== adminEmail) {
    throw new Error("UNAUTHORIZED: هذا الحساب لا يملك صلاحية الإدارة");
  }

  return user;
}

export async function isCurrentUserAdmin() {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}
