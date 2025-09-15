"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { Card } from "./components/card";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Resume", href: "/resume" }, // new
];

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowNavbar(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-red-950/30 to-black">
      {/* Sticky Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
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
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      {/* Hero Section */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-24 w-screen h-screen px-12">
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
            href="/resume"
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
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/opal-logo.png"
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
                            • Designed and executed test plans to validate
                            backend systems built in Python and C++, ensuring
                            reliable communication with connected devices
                          </li>
                          <li>
                            • Performed cloud-based testing across AWS and GCP
                            deployments, validating scalability, availability,
                            and fault tolerance of backend services
                          </li>
                          <li>
                            • Contributed to Python automation scripts to
                            streamline regression testing of backend APIs and
                            device communication workflows
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
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
                          <p className="text-zinc-500 text-sm">Sep - Dec 2023</p>
                          <p className="text-zinc-500 text-sm">Kitchener, ON</p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Software Engineer Intern
                        </h3>
                        <p className="text-zinc-400 mt-1">Monogram</p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>
                            • Developed features for the Monogram Creative
                            Console desktop app using TypeScript, C++, Qt, and
                            QML across Mac and Windows platforms
                          </li>
                          <li>
                            • Implemented a copy/paste module assignment system
                            that improved user workflows and satisfaction
                          </li>
                          <li>
                            • Leveraged Git for version control and contributed
                            to agile sprint cycles, participating in issue
                            tracking and prioritization
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