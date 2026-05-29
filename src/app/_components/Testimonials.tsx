import Image from "next/image";
import { testimonials } from "./data";

export default function Testimonials() {
  return (
    <section className="bg-white py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4">Testimonials</p>
          <h2 className="text-5xl font-black text-black tracking-tight leading-none">
            Loved by<br />engineering teams
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-black/10">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-8 flex flex-col">
              <div className="flex gap-0.5 mb-5">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-black">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-black/60 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-6 border-t border-black/10">
                <Image src={t.avatar} alt={t.name} width={36} height={36} className="rounded-sm grayscale" />
                <div>
                  <div className="font-bold text-black text-sm">{t.name}</div>
                  <div className="text-xs text-black/40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
