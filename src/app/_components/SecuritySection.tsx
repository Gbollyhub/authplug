import Image from "next/image";
import { securityList } from "./data";
import { ShieldCheckIcon, CheckIcon } from "./icons";

export default function SecuritySection() {
  return (
    <section id="security" className="bg-white py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
            alt="Security infrastructure"
            width={800} height={560}
            className="w-full h-[440px] object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-4 flex items-center gap-4">
              <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
                <ShieldCheckIcon className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Security score</div>
                <div className="text-white/60 text-xs">All checks passed — zero critical vulnerabilities</div>
              </div>
              <div className="ml-auto text-3xl font-black text-white">A+</div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4">Security</p>
          <h2 className="text-5xl font-black text-black tracking-tight leading-none mb-6">
            Security isn&apos;t a feature.<br />It&apos;s the foundation.
          </h2>
          <p className="text-base text-black/50 mb-8 leading-relaxed">
            Every design decision in AuthPlug starts with security. From hashed tokens and HTTP-only cookies to automatic session expiry and replay protection.
          </p>
          <ul className="space-y-3">
            {securityList.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 bg-black rounded-sm flex items-center justify-center mt-0.5">
                  <CheckIcon className="w-3 h-3 text-white" />
                </span>
                <span className="text-sm text-black/60">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
