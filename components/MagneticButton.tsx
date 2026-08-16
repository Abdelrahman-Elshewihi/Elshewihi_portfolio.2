"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * 0.28, y: relY * 0.28 });
  }, []);

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const base =
    "inline-flex items-center gap-2 font-medium whitespace-nowrap transition-[transform,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  const styles =
    variant === "solid"
      ? "bg-accent hover:bg-accent-hover text-white rounded-full px-6 py-3.5 text-[15px]"
      : "bg-transparent border border-border dark:border-border-dark hover:border-accent hover:text-accent text-ink dark:text-ink-dark rounded-full px-5 py-3 text-sm";

  const style = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={style}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
