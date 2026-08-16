import { getPublishedProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getPublishedProjectBySlug(params.slug);
  if (!project) return { title: "المشروع غير موجود" };

  return {
    title: `${project.title} | عبدالرحمن الشويحي`,
    description: project.description?.slice(0, 160) || undefined,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover_url ? [project.cover_url] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getPublishedProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="bg-bg dark:bg-bg-dark text-ink dark:text-ink-dark min-h-screen">
      <Nav />

      <article className="max-w-[900px] mx-auto px-6 py-16">
        {project.cover_url && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-surface dark:bg-surface-dark">
            <Image src={project.cover_url} alt={project.title} fill sizes="900px" className="object-cover" priority />
          </div>
        )}

        <div className="font-mono text-accent text-[13px] mb-3" dir="ltr">{project.category}</div>
        <h1 className="font-display font-bold text-[clamp(28px,5vw,44px)] mb-6">{project.title}</h1>
        <p className="text-muted dark:text-muted-dark leading-[1.9] text-[16px] whitespace-pre-line">{project.description}</p>

        {project.video_url && (
          <div className="mt-10 rounded-2xl overflow-hidden">
            <video controls preload="none" poster={project.cover_url} className="w-full">
              <source src={project.video_url} />
            </video>
          </div>
        )}

        {Array.isArray(project.gallery) && project.gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-10">
            {project.gallery.map((img: string, i: number) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-surface dark:bg-surface-dark">
                <Image src={img} alt={`${project.title} ${i + 1}`} fill sizes="450px" loading="lazy" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {project.external_url && (
          <a
            href={project.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-accent underline underline-offset-4"
          >
            زيارة المشروع مباشرة ↗
          </a>
        )}
      </article>
    </div>
  );
}
