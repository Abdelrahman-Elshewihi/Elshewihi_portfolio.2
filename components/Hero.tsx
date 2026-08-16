"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";

const ROLES = ["Computer Engineer", "Video Editor", "Graphic Designer", "Creative Technologist"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <section id="top" className="min-h-[88vh] flex flex-col justify-center px-6 max-w-[1180px] mx-auto">
      <h1 className="font-display font-bold leading-[1.08] text-[clamp(38px,7vw,84px)] max-w-[900px]">
        عبدالرحمن وليد الشويحي
      </h1>

      <div
        key={roleIndex}
        className="text-muted dark:text-muted-dark font-medium mt-5 text-[clamp(18px,2.6vw,26px)] animate-[fadeRole_0.5s_ease]"
      >
        {ROLES[roleIndex]}
      </div>

      <p className="mt-7 max-w-[560px] text-muted dark:text-muted-dark leading-[1.8] text-[16px]">
        مهندس حاسبات ونظم بيحول الأفكار لأنظمة حقيقية، وبيصنع محتوى بصري بعين مصمم ومونتير.
        كل مشروع هنا اتبنى بمنطق هندسي، مش مجرد شكل جميل.
      </p>

      <div className="flex gap-3.5 mt-10 flex-wrap">
        <MagneticButton href="#work" variant="solid">
          شوف الأعمال <ArrowUpRight size={16} />
        </MagneticButton>
        <MagneticButton href="#contact" variant="outline">
          تواصل معايا
        </MagneticButton>
      </div>
    </section>
  );
}
