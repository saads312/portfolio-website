"use client";
import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Card } from "./components/card";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Resume", href: "/resume3bnew.pdf" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-red-950/30 to-black">
      {/* Always-Visible Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-lg font-semibold text-zinc-100 hover:text-white transition-colors"
              >
                Saad Syed
              </Link>
              <ul className="flex items-center gap-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Particles Background */}
      {/* <ElectronFlow
        className="absolute inset-0 -z-10 animate-fade-in"
        pathCount={6}
        electronSpeed={1.5}
        trailLength={50}
      /> */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={60}
        speed={0.8}
        fontSize={12}
        opacity={0.4}
      />
      {/* Hero Section - Add top padding to account for fixed navbar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-24 w-screen h-screen px-12 pt-20">
        {/* Left side */}
        <div className="flex flex-col space-y-6 max-w-xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white">
            Saad Syed
          </h1>

          <p className="text-lg text-zinc-400">
            Passionate about all things Digital Hardware! Looking to innovate in
            the field of ML Hardware, FPGA, or ASIC Design.
          </p>

          {/* Quick Links */}
          <div className="flex space-x-4 mt-4">
            <Link
              href="/resume3bnew.pdf"
              className="px-5 py-2.5 text-sm font-medium text-white rounded-full 
              bg-white/5 backdrop-blur-sm border border-white/10 
              hover:bg-red-600/80 hover:border-red-500 
              transition-colors duration-300"
            >
              Resume
            </Link>
            <Link
              href="https://linkedin.com/in/saad-syed-uw"
              target="_blank"
              className="px-5 py-2.5 text-sm font-medium text-white rounded-full 
              bg-white/5 backdrop-blur-sm border border-white/10 
              hover:bg-blue-600/80 hover:border-blue-500 
              transition-colors duration-300"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/saads312"
              target="_blank"
              className="px-5 py-2.5 text-sm font-medium text-white rounded-full 
              bg-white/5 backdrop-blur-sm border border-white/10 
              hover:bg-green-600/80 hover:border-green-500 
              transition-colors duration-300"
            >
              GitHub
            </Link>
          </div>
        </div>

        {/* Right side: placeholder for image */}
        <div className="hidden md:block w-80 h-80 bg-zinc-900/40 rounded-xl shadow-lg border border-zinc-800">
          {/* Replace with <img src="/me.png" className="w-full h-full object-cover rounded-xl" /> */}
        </div>
      </div>

      {/* Experience Section */}
      <div className="relative py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Experience
            </h2>
            <div className="w-24 h-px bg-zinc-500 mx-auto mt-4"></div>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-8 bg-zinc-900/80">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/vcast.png"
                      alt="VCast Online"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-zinc-500 text-sm">
                            Jan 2025 - May 2025
                          </p>
                          <p className="text-zinc-500 text-sm">
                            Dubai, UAE
                          </p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                           Software Engineer (Co-op)
                        </h3>
                        <p className="text-zinc-400 mt-1">VCast Online</p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>
                            • Led the full-stack development of a collaborative mind-map platform, enabling real-time feedback and map sharing, driving community engagement up by 25%.
                          </li>
                          <li>
                            • Built and deployed a scalable SvelteKit + Node.js web app from scratch, integrating dynamic graph editing (Cytoscape.js), Google OAuth, JWT authentication, and enforced access control logic (owner vs viewer privileges)
                          </li>
                          <li>
                            • Architected and integrated a Mongoose-based feedback system, enabling structured insights collection on nodes, edges, and the graph as a whole — improving data access times by 18%.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8 bg-zinc-900/80">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/dematic.png"
                      alt="Dematic"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-zinc-500 text-sm">May 2024 - Aug 2024</p>
                          <p className="text-zinc-500 text-sm">Waterloo, ON</p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Technical Writer
                        </h3>
                        <p className="text-zinc-400 mt-1">Dematic</p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>
                            • Developed comprehensive technical documentation for Dematic’s mechanical and control systems, enhancing user understanding and supporting the seamless integration of advanced automation technologies.
                          </li>
                          <li>
                            • Authored detailed user manuals and technical guides for Dematic’s InSights logistics software, ensuring clarity in functionality and facilitating efficient software deployment across multiple industries.
                          </li>
                          <li>
                            • Simplified complex engineering concepts for diverse audiences, enhancing usability and efficiency.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8 bg-zinc-900/80">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/monogram-logo.png"
                      alt="Monogram"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-zinc-500 text-sm">Jan 2023 - Apr 2023</p>
                          <p className="text-zinc-500 text-sm">Dorval, QC (Remote)</p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Technical Writer
                        </h3>
                        <p className="text-zinc-400 mt-1">Matrox Imaging | Zebra Technologies</p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>
                            • Documented and tested new features added to the company's proprietary software, Matrox Design Assistant, which is a flowchart-based software allowing users to design their own imaging apps.
                          </li>
                          <li>
                            • Collaborated with software engineers to document new functions and capabilities in the company's C Library (Matrox Imaging Library).

                          </li>
                          <li>
                            • Worked with oXygen XML editor to make changes to the official company user manual and user reference which is sold to clients.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}