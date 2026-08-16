import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  slug,
  category,
  thumbnail_url,
}: {
  title: string;
  slug: string;
  category: string;
  thumbnail_url: string;
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-2xl overflow-hidden border border-border dark:border-border-dark hover:border-accent transition-colors"
    >
      <div className="relative aspect-[4/3] bg-surface dark:bg-surface-dark">
        <Image
          src={thumbnail_url}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-muted dark:text-muted-dark text-xs mt-1">{category}</p>
      </div>
    </Link>
  );
}
