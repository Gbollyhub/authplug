import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export default function CTABanner() {
  return (
    <section className="bg-black py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-6">Get started</p>
        <h2 className="text-6xl sm:text-7xl font-black text-white tracking-tight leading-none mb-6">
          Start securing<br />your app today.
        </h2>
        <p className="text-base text-white/40 mb-10 max-w-lg mx-auto leading-relaxed">
          Get your auth layer running in under an hour. No credit card required, no vendor lock-in, no compromises.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/admin/register" className="inline-flex items-center gap-2 bg-white text-black font-black text-sm px-8 py-4 rounded-sm hover:bg-white/90 transition-colors">
            Get started free <ArrowRightIcon />
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-8 py-4 rounded-sm hover:border-white/50 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
