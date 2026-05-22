"use client";
import Link from "next/link";
import React from "react";
import ResumeModal from "./ResumeModal";

export const Navigation: React.FC = () => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="container flex items-center justify-between p-5 mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm font-mono text-zinc-400 hover:text-white transition-colors duration-200"
          >
            saad syed
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/projects"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
            <ResumeModal />
          </nav>
        </div>
      </div>
    </header>
  );
};
