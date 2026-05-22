"use client";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };
  views: number;
};

export const Header: React.FC<Props> = ({ project }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  const links: { label: string; href: string }[] = [];
  if (project.repository) {
    links.push({
      label: "GitHub",
      href: `https://github.com/${project.repository}`,
    });
  }
  if (project.url) {
    links.push({
      label: "Website",
      href: project.url,
    });
  }

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-black/80 border-zinc-800"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex items-center gap-6">
            {project.repository && (
              <Link
                target="_blank"
                href={`https://github.com/${project.repository}`}
                className={`duration-200 ${
                  isIntersecting ? "text-zinc-400 hover:text-zinc-100" : "text-zinc-500 hover:text-zinc-100"
                }`}
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
          </div>

          <Link
            href="/projects"
            className={`duration-200 flex items-center gap-2 text-sm font-mono ${
              isIntersecting
                ? "text-zinc-400 hover:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Projects
          </Link>
        </div>
      </div>

      <div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl">
            {project.description}
          </p>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {links.map((link) => (
                <Link
                  target="_blank"
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2.5 text-sm font-mono text-zinc-300 hover:text-white
                  bg-white/5 border border-white/10 hover:border-white/20
                  rounded-lg transition-all duration-200"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
