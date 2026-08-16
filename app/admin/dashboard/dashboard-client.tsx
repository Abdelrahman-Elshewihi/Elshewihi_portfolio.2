"use client";

import { useState, useTransition } from "react";
import { createProject, deleteProject, togglePublish, type ProjectInput } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Eye, EyeOff, Plus, LogOut } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail_url: string;
  published: boolean;
  featured: boolean;
};

const emptyForm: ProjectInput = {
  title: "",
  slug: "",
  description: "",
  category: "",
  thumbnail_url: "",
};

export default function DashboardClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    startTransition(async () => {
      try {
        const newProject = await createProject(form);
        setProjects((prev) => [...prev, newProject as Project]);
        setForm(emptyForm);
        setShowForm(false);
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "حصل خطأ غير متوقع");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("متأكد إنك عايز تحذف المشروع ده؟ الإجراء ده مينفعش يتراجع.")) return;

    startTransition(async () => {
      try {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        alert(err instanceof Error ? err.message : "فشل الحذف");
      }
    });
  }

  function handleTogglePublish(id: string, current: boolean) {
    startTransition(async () => {
      try {
        await togglePublish(id, !current);
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
        );
      } catch (err) {
        alert(err instanceof Error ? err.message : "فشل تغيير حالة النشر");
      }
    });
  }

  return (
    <div className="min-h-screen bg-bg-dark text-ink-dark px-6 py-10" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl font-semibold">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-dark hover:text-ink-dark transition-colors"
          >
            <LogOut size={16} /> تسجيل خروج
          </button>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white rounded-full px-5 py-2.5 text-sm font-medium mb-8 transition-colors"
        >
          <Plus size={16} /> مشروع جديد
        </button>

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-10 flex flex-col gap-4"
          >
            <input
              required
              placeholder="عنوان المشروع"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-transparent border border-border-dark rounded-lg px-4 py-2.5 text-sm"
            />
            <input
              required
              placeholder="slug (مثال: my-project)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="bg-transparent border border-border-dark rounded-lg px-4 py-2.5 text-sm"
              dir="ltr"
            />
            <input
              placeholder="التصنيف (مثال: Video / Design / Dev)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-transparent border border-border-dark rounded-lg px-4 py-2.5 text-sm"
            />
            <input
              required
              placeholder="رابط صورة الـ Thumbnail"
              value={form.thumbnail_url}
              onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
              className="bg-transparent border border-border-dark rounded-lg px-4 py-2.5 text-sm"
              dir="ltr"
            />
            <textarea
              placeholder="الوصف"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-transparent border border-border-dark rounded-lg px-4 py-2.5 text-sm min-h-[100px]"
            />

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="bg-accent hover:bg-accent-hover text-white rounded-full py-2.5 text-sm font-medium disabled:opacity-60"
            >
              {isPending ? "جارٍ الحفظ..." : "حفظ المشروع (كمسودة)"}
            </button>
          </form>
        )}

        <div className="flex flex-col gap-3">
          {projects.length === 0 && (
            <p className="text-muted-dark text-sm text-center py-10">
              لسه معملتش أي مشروع. اضغط "مشروع جديد" للبدء.
            </p>
          )}

          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border border-border-dark rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-medium text-sm">{p.title}</p>
                <p className="text-muted-dark text-xs mt-0.5">
                  {p.published ? "منشور" : "مسودة"} · {p.category || "بدون تصنيف"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTogglePublish(p.id, p.published)}
                  title={p.published ? "إلغاء النشر" : "نشر"}
                  className="text-muted-dark hover:text-accent transition-colors"
                >
                  {p.published ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  title="حذف"
                  className="text-muted-dark hover:text-red-400 transition-colors"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
