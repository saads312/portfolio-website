"use client";
import { useState } from "react";
import Link from "next/link";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button (this replaces your navbar Resume link) */}
      <button
        onClick={() => setOpen(true)}
        className="duration-200 text-zinc-300 hover:text-white font-medium"
      >
        Resume
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {/* Modal box */}
          <div className="bg-gradient-to-br from-zinc-900/95 via-red-950/40 to-black/95 
                          p-6 rounded-xl shadow-2xl max-w-sm w-full text-center 
                          border border-red-900/30">
            <h2 className="text-xl font-bold text-white mb-4">Choose a Resume</h2>

            <div className="flex flex-col space-y-3">
              <Link
                href="/saadsyed3Bresumegen.pdf"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 
                           hover:bg-red-600/30 hover:border-red-500 transition-colors duration-300"
              >
                General Resume
              </Link>
              <Link
                href="/DV_saadsyed3Bresume.pdf"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 
                           hover:bg-red-600/30 hover:border-red-500 transition-colors duration-300"
              >
                Digital Hardware & Verification
              </Link>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-4 py-2 text-sm rounded-lg bg-red-600/80 text-white 
                         hover:bg-red-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}