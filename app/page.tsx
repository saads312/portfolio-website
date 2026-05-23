"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Particles from "./components/particles";
import { Card } from "./components/card";
import { Navigation } from "./components/nav";
import { animate, stagger, createTimeline, scrambleText } from "animejs";

const skills: Record<string, string[]> = {
  Languages: ["SystemVerilog", "Verilog", "C/C++", "Python", "Assembly (ARMv7, RISC-V)"],
  Protocols: ["AXI4 / AXI4-Lite", "AXI-Stream", "PCIe / QDMA", "SPI", "UART"],
  Tools: ["Vivado", "Quartus Prime Pro", "CocoTB", "GTKWave", "TimeQuest", "Git", "Linux"],
  Concepts: ["RTL Design", "Timing Closure", "CDC", "Pipelining & Retiming", "FSMs", "UVM", "Formal Verification"],
};

const experience = [
  {
    logo: "/uw-logo.png",
    period: "Jan 2026 – Present",
    location: "Waterloo, ON",
    role: "FPGA Research Assistant",
    company: "University of Waterloo — Prof. Mina Arashloo",
    bullets: [
      "Contributing to a protocol-agnostic FPGA transport-layer acceleration architecture on AMD Alveo U250, enabling hardware offload of multiple network protocols (TCP, RoCEv2).",
      "Implementing PCIe/QDMA-based host ↔ FPGA communication using AXI-Stream within the OpenNIC 250 MHz user logic, allowing applications to drive FPGA transport logic.",
      "Building buffering, backpressure, and request-framing logic to reliably inject host application requests into a high-throughput FPGA networking pipeline.",
    ],
  },
  {
    logo: "/uwasic_logo.jpeg",
    period: "Aug 2025 – Present",
    location: "Waterloo, ON",
    role: "Digital Design Team Lead — Ethernet Packet Parser",
    company: "UW ASIC Design Team",
    bullets: [
      "Leading a team of 15 to architect a high-throughput Ethernet packet parser from scratch, owning system architecture, RTL implementation, and block-level verification across the full design lifecycle.",
      "Designed multi-layer packet parsing pipeline in SystemVerilog supporting Ethernet/IP/TCP header extraction with configurable match-action rules and line-rate throughput targeting.",
      "Led RTL implementation and floorplanning of a cryptography accelerator, achieving 200 MHz operation at 65% FPGA resource utilization.",
      "Architected an ACK-based bus arbitration protocol using open-drain signaling, reducing average arbitration latency by 4 cycles under multi-client contention.",
    ],
  },
  {
    logo: "/vcast.png",
    period: "Jan 2025 – May 2025",
    location: "Dubai, UAE",
    role: "Software Engineer (Co-op)",
    company: "VCast Online",
    bullets: [
      "Led full-stack development of a collaborative mind-map platform, enabling real-time feedback and map sharing, driving community engagement up by 25%.",
      "Built and deployed a SvelteKit + Node.js web app integrating Cytoscape.js graph editing, Google OAuth, JWT authentication, and access control.",
      "Architected a Mongoose-based feedback system enabling structured insights on nodes, edges, and graphs — improving data access times by 18%.",
    ],
  },
  {
    logo: "/dematic.jpg",
    period: "May 2024 – Aug 2024",
    location: "Waterloo, ON",
    role: "Technical Writer (Co-op)",
    company: "Dematic",
    bullets: [
      "Developed comprehensive technical documentation for Dematic's mechanical and control systems.",
      "Authored detailed user manuals for Dematic's InSights logistics software, facilitating efficient deployment across multiple industries.",
      "Simplified complex engineering concepts for diverse audiences, enhancing usability and efficiency.",
    ],
  },
  {
    logo: "/matrox.jpg",
    period: "Jan 2023 – Apr 2023",
    location: "Dorval, QC (Remote)",
    role: "Technical Writer (Co-op)",
    company: "Matrox Imaging | Zebra Technologies",
    bullets: [
      "Documented and tested new features for Matrox Design Assistant, a flowchart-based imaging application platform.",
      "Collaborated with software engineers to document the Matrox Imaging Library (C API).",
      "Used oXygen XML to update the official company user manual and user reference distributed to clients.",
    ],
  },
];

const skillColors: Record<string, string> = {
  Languages: "bg-red-950/40 text-red-300 border border-red-900/40 hover:bg-red-900/50",
  Protocols: "bg-blue-950/40 text-blue-300 border border-blue-900/40 hover:bg-blue-900/50",
  Tools: "bg-zinc-800/60 text-zinc-300 border border-zinc-700/40 hover:bg-zinc-700/60",
  Concepts: "bg-violet-950/40 text-violet-300 border border-violet-900/40 hover:bg-violet-900/50",
};

export default function Home() {
  /* ── Entrance animations ─────────────────────────── */
  useEffect(() => {
    // Hero timeline
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add("#hero-badge",  { opacity: [0, 1], y: [-10, 0], duration: 500 }, 80)
      .add("#hero-desc",   { opacity: [0, 1], y: [18, 0],  duration: 650 }, 900)
      .add(".hero-link",   { opacity: [0, 1], y: [14, 0],  duration: 480,
                             delay: stagger(70) }, 1050)
      .add("#hero-photo",  { opacity: [0, 1], scale: [0.92, 1], duration: 750 }, 150);

    // Name scramble — each word decoded separately
    animate("#hero-name-1", {
      // @ts-ignore – scrambleText is a v4 plugin property
      scrambleText: scrambleText({ chars: "uppercase", speed: 0.4 }),
      opacity: [0, 1],
      duration: 1100,
      ease: "outExpo",
      delay: 250,
    });
    animate("#hero-name-2", {
      // @ts-ignore
      scrambleText: scrambleText({ chars: "uppercase", speed: 0.4 }),
      opacity: [0, 1],
      duration: 1100,
      ease: "outExpo",
      delay: 550,
    });

    /* ── Scroll-triggered animations ─────────────────── */
    const observers: IntersectionObserver[] = [];

    const onEnter = (
      selector: string,
      animFn: (el: Element) => void,
      threshold = 0.15
    ) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animFn(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );
      document.querySelectorAll(selector).forEach((el) => obs.observe(el));
      observers.push(obs);
    };

    // Section headings slide up
    onEnter(".section-heading", (el) => {
      animate(el, { opacity: [0, 1], y: [22, 0], duration: 600, ease: "outExpo" });
    }, 0.2);

    // Skills groups — chips bounce in per group
    onEnter(".skills-group", (el) => {
      animate(el.querySelectorAll(".skill-chip"), {
        opacity: [0, 1],
        y: [10, 0],
        scale: [0.78, 1],
        delay: stagger(28, { from: "center" }),
        duration: 380,
        ease: "outBack(1.7)",
      });
    }, 0.1);

    // Experience cards slide up with stagger
    onEnter(".exp-card", (el) => {
      animate(el, { opacity: [0, 1], y: [28, 0], duration: 520, ease: "outCubic" });
    }, 0.08);

    // Education card
    onEnter(".edu-card", (el) => {
      animate(el, { opacity: [0, 1], y: [20, 0], duration: 500, ease: "outCubic" });
    }, 0.1);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <Navigation />

      {/* Particles */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={50}
        speed={0.6}
        fontSize={12}
        opacity={0.3}
      />

      {/* Ambient red glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-red-950/20 rounded-full blur-3xl" />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24 w-screen min-h-screen px-8 md:px-16 pt-24 pb-16">
        <div className="flex flex-col space-y-6 max-w-xl">
          {/* Status badge */}
          <div
            id="hero-badge"
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs text-red-300 font-mono tracking-wide">
              FPGA Research · UWaterloo
            </span>
          </div>

          {/* Name — two separate spans for per-word scramble */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-white leading-none tracking-tight">
            <span id="hero-name-1" style={{ opacity: 0 }} className="block">Saad</span>
            <span id="hero-name-2" style={{ opacity: 0 }} className="block">Syed</span>
          </h1>

          {/* Description */}
          <p
            id="hero-desc"
            style={{ opacity: 0 }}
            className="text-base text-zinc-400 leading-relaxed max-w-md"
          >
            Computer Engineering @ UWaterloo. Building high-performance digital
            hardware — FPGA transport-layer acceleration, RTL design, and ASIC
            verification.
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { href: "/saadsyed_4A_FPGAgen.pdf", label: "Resume", hover: "hover:bg-red-600/20 hover:border-red-500/50", target: "_blank" },
              { href: "https://linkedin.com/in/saad-syed-uw", label: "LinkedIn", hover: "hover:bg-blue-600/20 hover:border-blue-500/50", target: "_blank" },
              { href: "https://github.com/saads312", label: "GitHub", hover: "hover:bg-zinc-600/30 hover:border-zinc-500/50", target: "_blank" },
              { href: "mailto:noorulsaad@gmail.com", label: "Email", hover: "hover:bg-zinc-600/30 hover:border-zinc-500/50", target: undefined },
            ].map(({ href, label, hover, target }) => (
              <Link
                key={label}
                href={href}
                target={target}
                className={`hero-link px-5 py-2.5 text-sm font-medium text-white rounded-lg
                  bg-white/5 border border-white/10 ${hover}
                  transition-all duration-200`}
                style={{ opacity: 0 }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div id="hero-photo" style={{ opacity: 0 }} className="hidden md:block relative">
          <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden ring-1 ring-zinc-700/50 shadow-2xl shadow-black/50">
            <img
              src="/headshot.jpeg"
              className="w-full h-full object-cover"
              alt="Saad Syed"
            />
          </div>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="relative py-20 border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="section-heading mb-12" style={{ opacity: 0 }}>
            <h2 className="text-2xl font-bold text-zinc-100 font-display">Technical Skills</h2>
            <div className="w-12 h-px bg-red-700 mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skills-group">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-chip px-3 py-1 text-xs rounded-md font-mono transition-colors duration-150 ${skillColors[category]}`}
                      style={{ opacity: 0 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────── */}
      <section className="relative py-20 border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="section-heading mb-12" style={{ opacity: 0 }}>
            <h2 className="text-2xl font-bold text-zinc-100 font-display">Experience</h2>
            <div className="w-12 h-px bg-red-700 mt-3" />
          </div>

          <div className="space-y-4">
            {experience.map((job, i) => (
              <div key={i} className="exp-card" style={{ opacity: 0 }}>
                <Card>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-[60px] h-[60px] bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center ring-1 ring-zinc-800">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                          <span className="text-xs font-mono text-zinc-500 tracking-wide">
                            {job.period}
                          </span>
                          <span className="text-xs font-mono text-zinc-600">{job.location}</span>
                        </div>
                        <h3 className="text-base font-semibold text-zinc-100 leading-snug">
                          {job.role}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-0.5 mb-3">{job.company}</p>
                        <ul className="space-y-1.5">
                          {job.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-zinc-500">
                              <span className="text-red-700 mt-0.5 flex-shrink-0">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────── */}
      <section className="relative py-20 border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="section-heading mb-12" style={{ opacity: 0 }}>
            <h2 className="text-2xl font-bold text-zinc-100 font-display">Education</h2>
            <div className="w-12 h-px bg-red-700 mt-3" />
          </div>

          <div className="edu-card" style={{ opacity: 0 }}>
            <Card>
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-[60px] h-[60px] bg-zinc-900 rounded-xl overflow-hidden ring-1 ring-zinc-800 flex items-center justify-center">
                    <img
                      src="/uw-logo.png"
                      alt="UWaterloo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                      <span className="text-xs font-mono text-zinc-500">Sep 2022 – May 2027</span>
                      <span className="text-xs font-mono text-zinc-600">Waterloo, ON</span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-100">
                      B.A.Sc. Computer Engineering
                    </h3>
                    <p className="text-sm text-zinc-500 mt-0.5 mb-3">University of Waterloo</p>
                    <p className="text-sm text-zinc-500">
                      <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mr-2">
                        Courses
                      </span>
                      Reconfigurable Computing (Master's Level), Real-Time Operating Systems,
                      Digital Hardware Systems, Computer Architecture, Compilers, Embedded
                      Microprocessor Systems
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-mono">
          <span>saadpiece.com</span>
          <div className="flex gap-6">
            <Link
              href="https://github.com/saads312"
              target="_blank"
              className="hover:text-zinc-400 transition-colors"
            >
              github
            </Link>
            <Link
              href="https://linkedin.com/in/saad-syed-uw"
              target="_blank"
              className="hover:text-zinc-400 transition-colors"
            >
              linkedin
            </Link>
            <Link
              href="mailto:noorulsaad@gmail.com"
              className="hover:text-zinc-400 transition-colors"
            >
              email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
