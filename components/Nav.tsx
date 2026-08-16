"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(y / docHeight, 1) : 0);
        setHidden(y > lastY.current && y > 120);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md bg-bg dark:bg-bg-dark/75 border-b border-border dark:border-border-dark transition-transform duration-300"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 py-[18px] flex items-center justify-between">
        <a href="#top" className="font-display text-lg font-bold text-ink dark:text-ink-dark">
          عبدالرحمن الشويحي
        </a>

        <nav className="flex items-center gap-5">
          <div className="hidden md:flex gap-7">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="تبديل الوضع الليلي"
            className="w-[38px] h-[38px] rounded-full border border-border dark:border-border-dark flex items-center justify-center text-ink dark:text-ink-dark"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
            className="md:hidden text-ink dark:text-ink-dark"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <div
        className="overflow-hidden border-b border-border dark:border-border-dark md:hidden transition-[max-height] duration-300"
        style={{ maxHeight: menuOpen ? 220 : 0 }}
      >
        <div className="flex flex-col gap-4 px-6 pb-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-muted dark:text-muted-dark">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="h-[2px] bg-border-dark">
        <div className="h-full bg-accent transition-[width] duration-100 linear" style={{ width: `${progress * 100}%` }} />
      </div>
    </header>
  );
}
