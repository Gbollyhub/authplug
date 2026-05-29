"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MenuIcon, XIcon } from "./icons";

const NAV_LINKS = [
  ["#features", "Features"],
  ["#how-it-works", "How it works"],
  ["#security", "Security"],
  ["#pricing", "Pricing"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/"><Logo size={24} inverted /></Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-white transition-colors">{label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin/login" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5">Sign in</Link>
            <Link href="/admin/register" className="text-sm font-semibold bg-white text-black px-4 py-1.5 rounded-sm hover:bg-white/90 transition-colors">Get started</Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-sm">{label}</a>
          ))}
          <hr className="border-white/10" />
          <Link href="/admin/login" className="text-white/60 text-sm">Sign in</Link>
          <Link href="/admin/register" className="bg-white text-black text-center py-2 rounded-sm text-sm font-semibold">Get started</Link>
        </div>
      )}
    </header>
  );
}
