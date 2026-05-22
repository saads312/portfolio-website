import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const isWIP = project.status === "wip";

  return (
    <div className="bg-black min-h-screen">
      <Header project={project} views={0} />

      {isWIP ? (
        <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl">
            <span className="px-3 py-1 text-sm font-mono bg-yellow-900/30 text-yellow-500 border border-yellow-900/40 rounded-full">
              Work in Progress
            </span>
            <h1 className="mt-6 text-4xl font-bold text-zinc-100 font-display">
              Under Construction
            </h1>
            <p className="mt-4 text-zinc-500 leading-relaxed">
              This project is currently in development. Check back soon, or follow the progress on GitHub.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {project.repository && (
                <a
                  href={`https://github.com/${project.repository}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200 text-sm font-mono"
                >
                  View on GitHub →
                </a>
              )}
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-lg transition-all duration-200 text-sm font-mono"
              >
                ← Back to Projects
              </a>
            </div>
          </div>
        </div>
      ) : (
        <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless prose-invert max-w-3xl">
          <Mdx code={project.body.code} />
        </article>
      )}
    </div>
  );
}
