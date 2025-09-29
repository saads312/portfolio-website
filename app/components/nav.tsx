"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import ResumeModal from "./ResumeModal";

export const Navigation: React.FC = () => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 bg-zinc-900 border-b border-zinc-800 shadow-md">
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link
              href="/projects"
              className="duration-200 text-zinc-300 hover:text-white font-medium"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="duration-200 text-zinc-300 hover:text-white font-medium"
            >
              Contact
            </Link>
            {/* <Link
              href="/resume3bnew.pdf"
              className="duration-200 text-zinc-300 hover:text-white font-medium"
            >
              Resume
            </Link> */}

            <ResumeModal />

          </div>

          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-white"
          >
            Saad Syed
          </Link>
        </div>
      </div>
    </header>
  );
};
