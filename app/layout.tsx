import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "عبدالرحمن وليد الشويحي | Abdelrahman Elshewihi",
  description:
    "مهندس حاسبات ونظم، مونتير فيديو، ومصمم جرافيك — Portfolio لأعمالي في الهندسة والمونتاج والتصميم.",
  openGraph: {
    title: "عبدالرحمن وليد الشويحي",
    description: "Computer Engineer · Video Editor · Graphic Designer",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
