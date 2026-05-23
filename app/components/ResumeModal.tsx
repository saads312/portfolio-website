"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import { animate } from "animejs";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Needed so createPortal doesn't run during SSR
  useEffect(() => setMounted(true), []);

  // Animate modal in when it opens
  useEffect(() => {
    if (!open) return;
    animate("#resume-modal-box", {
      opacity: [0, 1],
      scale: [0.93, 1],
      y: [-12, 0],
      duration: 280,
      ease: "outExpo",
    });
  }, [open]);

  const modal = open && (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        id="resume-modal-box"
        className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Choose Resume
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/saadsyed_4A_FPGAgen.pdf"
            target="_blank"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg bg-zinc-900 text-sm text-zinc-100 border border-zinc-800
                       hover:border-red-700/60 hover:bg-red-950/20 transition-all duration-200"
          >
            <span className="font-medium">FPGA / Digital Hardware</span>
            <p className="text-xs text-zinc-500 mt-0.5">Current — 4A focus</p>
          </Link>
          <Link
            href="/DV_saadsyed3Bresume.pdf"
            target="_blank"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg bg-zinc-900 text-sm text-zinc-100 border border-zinc-800
                       hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-200"
          >
            <span className="font-medium">Digital Verification</span>
            <p className="text-xs text-zinc-500 mt-0.5">3B — DV focus</p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="duration-200 text-zinc-400 hover:text-white text-sm transition-colors"
      >
        Resume
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
