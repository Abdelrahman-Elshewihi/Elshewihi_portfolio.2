"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`,
      },
    });

    if (error) {
      setError("حصل خطأ أثناء تسجيل الدخول، حاول تاني");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-6" dir="rtl">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-dark mb-2">
          لوحة التحكم
        </h1>
        <p className="text-muted-dark text-sm mb-8">
          سجّل الدخول بحساب Google المصرّح له فقط
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-ink font-medium rounded-full py-3 px-6 hover:bg-gray-100 transition-colors disabled:opacity-60"
        >
          {loading ? "جارٍ التحويل..." : "تسجيل الدخول عبر Google"}
        </button>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <p className="text-muted-dark text-xs mt-8">
          تسجيل الدخول بحساب جوجل عادي لن يمنحك صلاحية الإدارة —
          الوصول محصور بحساب واحد فقط يتم التحقق منه على السيرفر.
        </p>
      </div>
    </div>
  );
}
