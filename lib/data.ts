import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function getPublishedProjects() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, category, thumbnail_url, featured, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedProjects error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublishedProjectBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPublishedProjectBySlug error:", error.message);
    return null;
  }
  return data;
}

export async function getAllProjectsForAdmin() {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`فشل تحميل المشاريع: ${error.message}`);
  return data ?? [];
}
