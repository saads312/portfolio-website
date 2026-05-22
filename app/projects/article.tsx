import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";

type Props = {
  project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-6 md:p-8">
        <div className="mb-3">
          {project.date ? (
            <time
              dateTime={new Date(project.date).toISOString()}
              className="text-xs font-mono text-zinc-600"
            >
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                new Date(project.date)
              )}
            </time>
          ) : (
            <span className="text-xs font-mono text-zinc-600">Soon</span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-zinc-200 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-500 group-hover:text-zinc-400">
          {project.description}
        </p>
        <p className="mt-4 text-xs text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1">
          Read more →
        </p>
      </article>
    </Link>
  );
};
