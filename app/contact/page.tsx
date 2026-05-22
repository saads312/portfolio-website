"use client";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/saad-syed-uw/",
    label: "LinkedIn",
    handle: "saad-syed-uw",
    description: "Connect professionally",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:noorulsaad@gmail.com",
    label: "Email",
    handle: "noorulsaad@gmail.com",
    description: "Shoot me a message",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/saads312",
    label: "GitHub",
    handle: "saads312",
    description: "See what I'm building",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />

      {/* Subtle glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-950/10 rounded-full blur-3xl" />
      </div>

      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-zinc-100 font-display">Get in Touch</h1>
            <p className="mt-3 text-zinc-500 text-sm font-mono">Always open to chat about hardware, opportunities, or interesting projects.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socials.map((s) => (
              <Card key={s.label}>
                <Link
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  className="p-8 flex flex-col items-center gap-4 group"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all duration-200">
                    {s.icon}
                  </span>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors break-all">
                      {s.handle}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600 group-hover:text-zinc-500 transition-colors">
                      {s.description}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
