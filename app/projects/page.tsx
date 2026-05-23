import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { ProjectsAnimator } from "./ProjectsAnimator";

export const revalidate = 60;

export default async function ProjectsPage() {
  const validProjects = allProjects.filter(
    (p) => p?.slug && p?.published !== false
  );

  const featured = validProjects.find((p) => p.slug === "bert");
  const top2 = validProjects.find((p) => p.slug === "adders");
  const top3 = validProjects.find((p) => p.slug === "uvm");

  const sorted = validProjects
    .filter(
      (p) =>
        p.slug !== featured?.slug &&
        p.slug !== top2?.slug &&
        p.slug !== top3?.slug
    )
    .sort((a, b) => {
      if (a.status === "wip" && b.status !== "wip") return -1;
      if (b.status === "wip" && a.status !== "wip") return 1;
      return (
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
      );
    });

  return (
    <div className="relative pb-16 bg-black min-h-screen">
      <Navigation />
      <ProjectsAnimator />

      {/* Subtle glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-950/15 rounded-full blur-3xl" />
      </div>

      <div className="px-6 pt-20 mx-auto space-y-12 max-w-5xl lg:px-8 md:pt-24 lg:pt-32">
        {/* Heading */}
        <div
          className="projects-heading max-w-2xl mx-auto lg:mx-0"
          style={{ opacity: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Projects
          </h2>
          <p className="mt-3 text-zinc-500 font-mono text-sm">
            Hardware &amp; software builds — FPGA, RTL design, and beyond.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-900" />

        {/* Featured + top2/top3 */}
        {featured && (
          <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
            <div className="project-featured" style={{ opacity: 0 }}>
              <Card>
                <Link href={`/projects/${featured.slug}`}>
                  <article className="relative w-full h-full p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-xs font-mono bg-red-950/40 text-red-400 border border-red-900/40 rounded">
                        Featured
                      </span>
                      {featured.date && (
                        <time
                          dateTime={new Date(featured.date).toISOString()}
                          className="text-xs text-zinc-600 font-mono"
                        >
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      )}
                    </div>
                    <h2
                      id="featured-post"
                      className="text-2xl font-bold text-zinc-100 group-hover:text-white sm:text-3xl font-display"
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-3 leading-7 text-zinc-500 group-hover:text-zinc-400 text-sm">
                      {featured.description}
                    </p>
                    <p className="mt-6 text-sm text-zinc-400 group-hover:text-zinc-200 flex items-center gap-1">
                      Read more →
                    </p>
                  </article>
                </Link>
              </Card>
            </div>

            <div className="flex flex-col w-full gap-6">
              {[top2, top3].filter(Boolean).map((project, i) => (
                <div
                  key={project!.slug}
                  className="project-side"
                  style={{ opacity: 0 }}
                >
                  <Card>
                    <Article project={project!} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full h-px bg-zinc-900" />

        {/* Remaining projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {sorted.map((project) => (
            <div
              key={project.slug}
              className="project-grid-card"
              style={{ opacity: 0 }}
            >
              <Card>
                <Link href={`/projects/${project.slug}`}>
                  <article className="relative w-full h-full p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      {project.date ? (
                        <time
                          dateTime={new Date(project.date).toISOString()}
                          className="text-xs text-zinc-600 font-mono"
                        >
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
                        </time>
                      ) : (
                        <span className="text-xs text-zinc-600 font-mono">
                          Soon
                        </span>
                      )}
                      {project.status === "wip" && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-yellow-900/30 text-yellow-500 border border-yellow-900/40 rounded">
                          WIP
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-white font-display">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-500 group-hover:text-zinc-400">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1">
                      Read more →
                    </p>
                  </article>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
