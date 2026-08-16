import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";
import { getPublishedProjects } from "@/lib/data";
import { MessageCircle } from "lucide-react";

const CAPABILITIES = [
  { code: "01", title: "Engineering", desc: "بناء أنظمة وبرمجيات من الأساس، بتفكير هندسي في كل قرار تقني." },
  { code: "02", title: "Video Editing", desc: "تحويل اللقطات الخام إلى سرد بصري له إيقاع ومعنى." },
  { code: "03", title: "Graphic Design", desc: "هوية بصرية وشعارات وتصميمات تحمل رسالة واضحة." },
  { code: "04", title: "Creative Technology", desc: "الدمج بين الهندسة والإبداع لصناعة تجارب رقمية مختلفة." },
];

const WHATSAPP_NUMBER = "201025857442"; // بصيغة دولية بدون + أو أصفار

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <div className="bg-bg dark:bg-bg-dark text-ink dark:text-ink-dark min-h-screen">
      <Nav />
      <Hero />

      <section id="capabilities" className="max-w-[1180px] mx-auto px-6 py-16 md:py-24">
        <div className="font-mono text-accent text-[13px] mb-3" dir="ltr">CAPABILITIES</div>
        <h2 className="font-display text-[clamp(26px,4vw,38px)] mb-10">إيه اللي بقدر أعمله</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {CAPABILITIES.map((c) => (
            <div key={c.code} className="border border-border dark:border-border-dark hover:border-accent hover:-translate-y-1 transition-all rounded-2xl p-7 bg-surface dark:bg-surface-dark">
              <div className="font-mono text-muted dark:text-muted-dark text-[13px] mb-4" dir="ltr">{c.code}</div>
              <h3 className="font-display font-semibold text-lg mb-2.5">{c.title}</h3>
              <p className="text-muted dark:text-muted-dark text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="max-w-[1180px] mx-auto px-6 pb-24">
        <div className="font-mono text-accent text-[13px] mb-3" dir="ltr">SELECTED WORK</div>

        {projects.length === 0 ? (
          <div className="border border-dashed border-border dark:border-border-dark rounded-2xl py-16 px-6 text-center text-muted dark:text-muted-dark">
            <p className="text-sm">المشاريع بتتحط هنا أول ما تتنشر من لوحة التحكم.</p>
            <p className="text-xs mt-2 opacity-70">لسه معملتش نشر لأي مشروع.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} title={p.title} slug={p.slug} category={p.category} thumbnail_url={p.thumbnail_url} />
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="max-w-[1180px] mx-auto px-6 pb-28 text-center">
        <h2 className="font-display text-[clamp(28px,5vw,46px)] mb-4">نتكلم عن مشروعك؟</h2>
        <p className="text-muted dark:text-muted-dark mb-8">متاح للتواصل عبر واتساب في أي وقت.</p>
        <MagneticButton href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="solid">
          <MessageCircle size={17} /> تواصل عبر واتساب
        </MagneticButton>
      </section>

      <footer className="border-t border-border dark:border-border-dark px-6 py-7 text-center text-muted dark:text-muted-dark text-[13px]">
        <span className="font-mono" dir="ltr">© {new Date().getFullYear()}</span> — Abdelrahman Elshewihi
      </footer>
    </div>
  );
}
