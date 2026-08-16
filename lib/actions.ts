"use server";

import { requireAdmin } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export type ProjectInput = {
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail_url: string;
  cover_url?: string;
  gallery?: string[];
  video_url?: string;
  external_url?: string;
  featured?: boolean;
};

function validateProjectInput(input: ProjectInput) {
  if (!input.title?.trim()) throw new Error("العنوان مطلوب");
  if (!input.slug?.trim() || !/^[a-z0-9-]+$/.test(input.slug)) {
    throw new Error("الـ slug لازم يكون حروف إنجليزية صغيرة وأرقام وشرطات فقط");
  }
  if (!input.thumbnail_url?.trim()) throw new Error("الـ Thumbnail مطلوب");
}

export async function createProject(input: ProjectInput) {
  await requireAdmin();
  validateProjectInput(input);

  const supabase = createAdminSupabaseClient();
  const { data: maxOrder } = await supabase
    .from("projects")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...input,
      published: false,
      sort_order: (maxOrder?.sort_order ?? 0) + 1,
    })
    .select()
    .single();

  if (error) throw new Error(`فشل إنشاء المشروع: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  return data;
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  await requireAdmin();

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`فشل تعديل المشروع: ${error.message}`);

  revalidatePath("/");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/dashboard");
  return data;
}

export async function deleteProject(id: string) {
  await requireAdmin();

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw new Error(`فشل حذف المشروع: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("projects")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`فشل تغيير حالة النشر: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function reorderProject(id: string, newOrder: number) {
  await requireAdmin();

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("projects")
    .update({ sort_order: newOrder })
    .eq("id", id);

  if (error) throw new Error(`فشل تغيير الترتيب: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
